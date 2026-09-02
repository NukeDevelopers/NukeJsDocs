# Encoding

```javascript
import {
    encodeUtf8, decodeUtf8,
    encodeBase64, decodeBase64,
    encodeHex, decodeHex,
} from "nuke:encoding";
```

| API | 说明 |
| --- | --- |
| `encodeUtf8(text)` / `decodeUtf8(bytes, options?)` | UTF-8 编解码 |
| `encodeBase64(bytes, options?)` / `decodeBase64(text, options?)` | 标准或 URL-safe Base64 |
| `encodeHex(bytes, uppercase?)` / `decodeHex(text)` | Hex 编解码 |

二进制使用 `Uint8Array` 或 `ArrayBuffer`。Base64 选项为 `variant: "standard" | "url"`、`padding` 和 `allowWhitespace`；解码错误返回 `INVALID_ARGUMENT`。
