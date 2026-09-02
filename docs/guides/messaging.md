# 消息脚本

消息脚本通常由三部分组成：注册监听器、过滤事件、显式发送回复。聊天范围由应用在脚本设置中配置，脚本不会自行扩大范围。

```javascript
import { onMessage, sendText } from "nuke:messaging";
import { info, error } from "nuke:log";

let unsubscribe;

export function activate() {
    unsubscribe = onMessage(async (event) => {
        if (event.message.direction !== "incoming") return;
        if (event.sender.isSelf || event.message.text !== "/ping") return;

        try {
            await sendText(event.conversation, "pong");
            info("reply sent", { conversationId: event.conversation.id });
        } catch (cause) {
            error("reply failed", cause);
        }
    });
}

export function deactivate() {
    unsubscribe?.();
    unsubscribe = null;
}
```

## 事件处理

监听器返回值不会自动发送消息。监听器可以是同步函数或异步函数；每个监听器的异常会写入日志。不要依赖事件的固定跨会话顺序，也不要在监听器中执行无限等待。

## 范围与能力

事件只投递到已开启的聊天。发送目标也必须在同一脚本的已开启范围中，否则返回 `PERMISSION_DENIED`。当前宿主 Adapter 可能只支持文本 segment；不支持的 segment 返回 `NOT_SUPPORTED`。
