# Runtime

```javascript
import {
    NukeError,
    apiVersion,
    quickJsVersion,
    script,
    limits,
    hasPermission,
} from "nuke:runtime";
```

## 导出

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `NukeError` | `class` | 所有引擎 API 错误的基类 |
| `apiVersion` | `number` | 当前为 `2` |
| `quickJsVersion` | `string` | 当前 QuickJS 版本，用于诊断 |
| `script` | `object` | 当前脚本的只读身份信息 |
| `limits` | `object` | 当前会话的只读资源限制 |
| `hasPermission(name)` | `(name: string) => boolean` | 查询当前有效权限 |

### `script`

```javascript
script.id;          // "dev.example.demo"
script.name;        // "Demo"
script.version;     // "1.0.0"
script.versionCode; // 1
```

### `limits`

| 字段 | 单位 | 影响 |
| --- | --- | --- |
| `memoryBytes` | bytes | QuickJS 内存上限 |
| `maxActiveTimers` | count | 同时存在的 timer 数量 |
| `minIntervalMs` | ms | `setInterval` 最小周期 |
| `maxHttpConcurrency` | count | 并行 HTTP 请求数 |
| `httpTimeoutMs` | ms | 默认 HTTP 超时 |
| `maxHttpRedirects` | count | 最大重定向次数 |
| `maxHttpRequestBytes` | bytes | 请求体上限 |
| `maxHttpResponseBytes` | bytes | 内存响应上限 |
| `maxHttpDownloadBytes` | bytes | 下载文件上限 |
| `maxFileReadBytes` | bytes | 单次文件读取上限 |
| `maxDataStorageBytes` | bytes | `data` 区域配额 |
| `maxCacheStorageBytes` | bytes | `cache` 区域配额 |
| `maxExternalStorageBytes` | bytes | `external` 区域配额 |
| `maxMessageSegments` | count | 单条消息 segment 上限 |
| `maxHostObjectReferences` | count | Java 对象引用上限 |
| `maxHostCallArguments` | count | 单次 Java 调用参数上限 |
| `maxHostValueDepth` | levels | Java 值转换嵌套深度 |

不要把限制写死在脚本中。超过限制会抛出 `NukeError`，错误码通常为 `QUOTA_EXCEEDED`。

### `hasPermission`

```javascript
if (hasPermission("network")) {
    // 可以调用 nuke:http
}
```

支持：`network`、`network.private`、`filesystem.external`、`filesystem.host`、`java`、`hook`。该函数只读取当前会话快照，不会打开授权 UI。

## `NukeError`

```javascript
try {
    await operation();
} catch (error) {
    if (error instanceof NukeError) {
        console.error(error.code, error.message, error.retryable, error.details);
    }
}
```

`retryable` 为 `true` 时表示稍后重试可能成功；权限、参数和类查找错误通常不应重试。Java 调用失败时，`details.javaException` 提供 `className`、`message`、`cause` 和 `stack`。
