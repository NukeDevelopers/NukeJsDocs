# 错误参考

引擎错误统一为 `NukeError`。错误对象不会自动显示给用户；脚本应记录必要上下文并决定是否重试。

## 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 固定为 `NukeError` |
| `code` | `string` | 稳定错误分类 |
| `message` | `string` | 面向诊断的描述 |
| `retryable` | `boolean` | 是否适合稍后重试 |
| `details` | `object?` | 错误特定详情 |

## 错误码

| code | retryable | 典型原因 |
| --- | --- | --- |
| `INVALID_ARGUMENT` | 否 | 参数类型、格式或范围错误 |
| `PERMISSION_DENIED` | 否 | 未声明、未确认或权限被撤销 |
| `NOT_FOUND` | 否 | 文件、类、字段、方法或资源不存在 |
| `ALREADY_EXISTS` | 否 | 目标已存在且未允许覆盖 |
| `NOT_SUPPORTED` | 否 | 当前 Adapter 尚未实现能力 |
| `HOST_ACCESS_UNAVAILABLE` | 是 | Java Provider 当前不可用 |
| `HOST_HOOK_UNAVAILABLE` | 是 | Hook Provider 当前不可用 |
| `JAVA_EXCEPTION` | 取决于异常 | Java 成员抛出异常 |
| `TIMEOUT` | 是 | 网络或外部操作超时 |
| `QUOTA_EXCEEDED` | 否 | 超出大小、数量、并发或存储限制 |
| `IO_ERROR` | 可能 | 文件系统读写失败 |
| `NETWORK_ERROR` | 可能 | DNS、TLS、连接或传输失败 |
| `UI_UNAVAILABLE` | 是 | 没有可用前台界面 |
| `UI_DISMISSED` | 否 | 用户提前关闭 UI |
| `MESSAGING_UNAVAILABLE` | 是 | 当前宿主没有消息 Provider |
| `SEND_REJECTED` | 可能 | 宿主拒绝发送任务 |
| `SEND_FAILED` | 可能 | 宿主发送任务执行失败 |
| `INTERNAL_ERROR` | 视上下文 | 未分类引擎错误 |

## Java 异常详情

```javascript
try {
    Target.run();
} catch (error) {
    if (error.code === "JAVA_EXCEPTION") {
        const cause = error.details.javaException;
        console.error(cause.className, cause.message, cause.stack);
    }
}
```
