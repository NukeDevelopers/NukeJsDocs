# 快速开始

本页创建一个只写日志的最小脚本，并说明如何安装、启用和验证它。

## 创建脚本包

```text
hello-script/
├── manifest.json
├── README.md
└── main.js
```

`manifest.json`：

```json
{
  "manifestVersion": 1,
  "apiVersion": 2,
  "id": "dev.example.hello",
  "name": "Hello Script",
  "version": "1.0.0",
  "versionCode": 1,
  "entry": "main.js"
}
```

脚本 ID 使用至少两个小写点分段；入口必须是包内 JavaScript 文件。

## 编写入口

```javascript
import { info } from "nuke:log";

export function activate() {
    info("Hello Script started");
}

export function deactivate() {
    info("Hello Script stopped");
}
```

顶层模块先执行，然后调用 `activate()`。停止脚本时调用 `deactivate()`；两个函数都可以返回 Promise。

## 安装与验证

将目录放入脚本目录，或把目录根内容压缩成 `.nsz` 后使用应用内导入。归档根必须直接包含 `manifest.json`，不能多套一层目录。

1. 在脚本页面启用脚本；
2. 打开脚本日志，确认出现 `Hello Script started`；
3. 关闭脚本，确认出现 `Hello Script stopped`。

::: tip
开发阶段使用目录安装更方便；发布时再生成 `.nsz`，并提高 `versionCode`。
:::

## 引入能力

```javascript
import { info } from "nuke:log";
import { hasPermission } from "nuke:runtime";

info("Java available", hasPermission("java"));
```

所有能力都通过 `nuke:` 模块显式导入。网络、文件、消息和 UI 通常是异步 API；Java 反射和 Hook 是同步 API，需要在 Manifest 中声明权限。

## 下一步

- 需要定时任务或消息监听时，阅读[生命周期](/guides/lifecycle)了解注册与清理；
- 需要网络、文件或 Java 能力时，先查看[权限与能力](/concepts/permissions)；
- 需要完整函数签名时，直接进入[API 总览](/reference/)。
