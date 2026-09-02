# API 总览

所有公开 API 都通过 `nuke:` ES Module 导入。建议先阅读[快速开始](/getting-started)，再根据脚本能力选择对应模块。

## 按场景选择

| 场景 | 推荐模块 | 入口文档 |
| --- | --- | --- |
| 读取版本、权限和资源限制 | `nuke:runtime` | [Runtime](/reference/runtime) |
| 读取脚本配置 | `nuke:config` | [Config](/reference/configuration) |
| 记录诊断信息 | `nuke:log` | [Logging](/reference/logging) |
| 延迟任务和周期任务 | `nuke:timers` | [Timers](/reference/timers) |
| 文本与二进制转换 | `nuke:encoding` | [Encoding](/reference/encoding) |
| 摘要、随机数和加密 | `nuke:crypto` | [Crypto](/reference/crypto) |
| 文件读写和下载 | `nuke:fs`、`nuke:http` | [文件系统](/reference/filesystem)、[HTTP](/reference/http) |
| 消息监听和发送 | `nuke:messaging` | [Messaging](/reference/messaging) |
| 提示、确认和交互 | `nuke:ui` | [UI](/reference/ui) |
| Java/Android 类型访问 | `nuke:java` | [Java Bridge](/reference/java) |

| 模块 | 能力 | 权限 |
| --- | --- | --- |
| `nuke:runtime` | 版本、限制、权限、错误 | 无 |
| `nuke:config` | 设置快照 | 无 |
| `nuke:log` | 日志 | 无 |
| `nuke:timers` | 延迟与计时器 | 无 |
| `nuke:encoding` | UTF-8、Base64、Hex | 无 |
| `nuke:crypto` | 随机数、摘要、加密 | 无 |
| `nuke:ui` | Toast、提示和确认 | 无 |
| `nuke:fs` | 包和脚本私有文件 | external 需声明 |
| `nuke:http` | HTTP/HTTPS | `network` |
| `nuke:messaging` | 消息事件和发送 | 无 |
| `nuke:java` | Java/Android 反射和 Hook | `java` / `hook` |

异步函数返回 Promise；Java Bridge 的字段、方法、构造和 Hook 调用同步执行。

## 通用约定

- 模块名区分大小写，必须使用完整的 `nuke:` 前缀；
- 二进制参数统一使用 `Uint8Array` 或 `ArrayBuffer`；
- 异步 API 的失败通过 `NukeError` reject，使用 `error.code` 做分支判断；
- 资源型对象（文件引用、Java 对象、监听器）应在不再使用时显式释放或取消。

错误码详情见[错误参考](/reference/errors)，运行时限制见[Runtime](/reference/runtime)。
