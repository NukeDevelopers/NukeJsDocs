# Java Bridge

`nuke:java` 将宿主 ClassLoader 中的 Java/Android 类型映射为 JavaScript 代理。它是同步 API，需要 Manifest 同时声明 `java`；方法 Hook 另需 `hook`。

```javascript
import { Java } from "nuke:java";

const File = Java.use("java.io.File");
const file = File.$new("/data/local/tmp/example");
console.log(file.exists());
console.log(file.absolutePath.value);
file.$dispose();
```

## 类 API

| API | 签名 | 说明 |
| --- | --- | --- |
| `Java.use` | `(className: string) => JavaClass` | 使用默认 ClassLoader 查找类 |
| `Java.classLoader` | `JavaObject` | 当前宿主 ClassLoader |
| `Java.classFactory` | `(loader: JavaObject) => Factory` | 使用指定 ClassLoader |
| `Java.context` | `JavaObject` | 宿主 Application Context |
| `Java.cast` | `(value, className) => JavaObject` | 校验类型兼容性 |
| `Java.array` | `(componentType, values) => JavaObject` | 创建 Java 数组 |
| `Class.$new` | `(...args) => JavaObject` | 调用构造方法 |
| `object.$dispose` | `() => boolean` | 释放对象引用 |

类、对象和数组在脚本会话内保持引用身份。达到 `limits.maxHostObjectReferences` 后，新引用会失败；脚本停止时剩余引用统一释放。

## 字段与方法

代理属性默认为 Java 成员：

```javascript
const Build = Java.use("android.os.Build");
const model = Build.MODEL.value; // 静态字段

const value = file.absolutePath.value; // 实例字段
file.someField.value = "updated";
const exists = file.exists();
```

显式 API 适用于字段/方法同名或需要避免歧义的情况：

```javascript
const field = file.$field("absolutePath");
const method = file.$method("renameTo");
```

重载使用完整参数类型：

```javascript
const Service = Java.use("com.example.Service");
const send = Service.send.overload("java.lang.String", "int");
send("value", 1);
```

支持基本类型、装箱类型、数字转换、数组、可变参数和继承方法。无法唯一匹配时会返回 `NOT_FOUND` 或类型诊断，应改用 `.overload()`。

## ClassLoader

```javascript
const plugin = Java.classFactory(Java.classLoader);
const Entry = plugin.use("com.example.plugin.Entry");
```

不同 ClassLoader 下的同名类互相独立。插件类、动态 dex 或宿主私有类应使用对应 Loader 创建工厂。

## Hook

```javascript
const Target = Java.use("com.example.Target");
const handle = Java.hook(Target, "send", {
    parameterTypes: ["java.lang.String", "int"],
    before(call) {
        call.args[0] = "rewritten";
        return { args: call.args };
    },
    after(call) {
        if (call.throwable) return { throwable: null };
        return { result: call.result };
    },
});

// 也可在 deactivate() 中调用
handle.dispose();
```

`options` 字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `parameterTypes` | `string[]` | 完整参数类型名；空数组仅在名称唯一时可用 |
| `constructor` | `boolean` | `true` 时 Hook 构造方法 |
| `before` | `(call) => object?` | 原方法前执行 |
| `after` | `(call) => object?` | 原方法后执行 |

回调对象包含 `thisObject`、`args`、`result`、`throwable` 和 `callOriginal(...args)`。返回对象中出现的 `args`、`result`、`throwable` 会覆盖对应值；`throwable: null` 清除异常。回调在触发线程同步执行，不要等待 Promise。

## 异常与权限

Java 成员抛出的异常会转换为 `NukeError`，`code` 为 `JAVA_EXCEPTION`，详情在 `error.details.javaException`。Java 和 Hook 调用都可能返回 `PERMISSION_DENIED`、`NOT_FOUND`、`HOST_ACCESS_UNAVAILABLE` 或 `HOST_HOOK_UNAVAILABLE`。
