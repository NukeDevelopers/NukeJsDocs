# Messaging

```javascript
import {
    onMessage,
    sendText,
    sendMessage,
    downloadMedia,
} from "nuke:messaging";
```

消息能力不需要 Manifest 声明，但取决于当前宿主 Adapter 和应用中为脚本开启的聊天范围。

## `onMessage(listener)`

```javascript
const unsubscribe = onMessage(async (event) => {
    if (event.message.direction !== "incoming") return;
    if (event.message.text === "/ping") {
        await sendText(event.conversation, "pong");
    }
});

export function deactivate() {
    unsubscribe();
}
```

返回值是 `() => boolean`，调用后取消监听。监听器异常会记录到脚本日志；一个监听器失败不会自动终止其他监听器。

## MessageEvent

```javascript
{
  eventId: string,
  receivedAt: number, // Unix epoch milliseconds
  platform: "wechat" | "qq" | "tiktok" | string,
  account: { platform, id, name? },
  conversation: { platform, accountId, id, type, name? },
  sender: { id, name?, displayName?, isSelf },
  message: {
    id, timestamp, direction: "incoming" | "outgoing",
    text?, segments: [{ type, ...fields }]
  },
  rawMessage?: JavaObject
}
```

事件对象的大部分结构是只读快照。`rawMessage` 只在宿主提供时出现，属于当前 Java 会话，使用完可调用 `$dispose()`。

## 发送

`sendText(conversation, text, options?)` 发送文本；`sendMessage({ conversation, segments, replyTo? })` 发送可扩展 segment。当前宿主可能只接受 `text` segment，失败时检查 `NOT_SUPPORTED`、`PERMISSION_DENIED`、`SEND_REJECTED` 和 `SEND_FAILED`。

`downloadMedia(media, destination, options?)` 将媒体写入 `data` 或 `cache`，当前实现是否可用取决于宿主 Adapter。
