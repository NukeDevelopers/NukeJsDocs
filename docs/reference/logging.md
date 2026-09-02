# Logging

```javascript
import { debug, info, warn, error } from "nuke:log";
```

四个函数都接受任意数量的值，并按脚本日志格式写入：

```javascript
info("download started", { url, bytes: 0 });
warn("retrying", attempt);
error("request failed", cause);
```

`console.debug/log/info/warn/error` 提供相同能力。日志消息有长度上限；敏感 token、Cookie 和完整消息内容不应写入日志。

## 推荐写法

为每条日志附带稳定的事件名和必要上下文，便于在脚本日志中检索：

```javascript
import { info, error } from "nuke:log";

info("sync.started", { itemCount: items.length });
try {
    await sync(items);
    info("sync.completed");
} catch (cause) {
    error("sync.failed", { code: cause?.code, message: cause?.message });
}
```

不要把完整请求体、认证信息或用户私密消息写入日志。调试信息应在确认不含敏感数据后再使用 `debug()`。
