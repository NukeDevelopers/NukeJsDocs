# HTTP

```javascript
import { fetch, download } from "nuke:http";
```

需要在 Manifest 中声明 `permissions.network`。所有函数返回 Promise，并受 `limits` 中的并发、超时和大小限制约束。

## `fetch(url, options?)`

```javascript
const response = await fetch("https://api.example.com/items", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "nuke" }),
    timeoutMs: 10_000,
    redirect: "follow",
});
```

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | 必填 | 绝对 `http` 或 `https` URL |
| `method` | `string` | `GET` | `GET`、`HEAD`、`POST`、`PUT`、`PATCH`、`DELETE`、`OPTIONS` |
| `headers` | `object` | `{}` | 字符串键值对 |
| `body` | `string \| Uint8Array \| ArrayBuffer \| FileRef` | 空 | 请求体 |
| `timeoutMs` | `number` | `limits.httpTimeoutMs` | 正整数毫秒 |
| `redirect` | `"follow" \| "error"` | `follow` | 是否跟随重定向 |
| `maxResponseBytes` | `number` | runtime limit | 内存响应上限 |

请求体为空的 `GET`、`HEAD` 等方法不能携带 body。HTTP `4xx` 和 `5xx` 仍会返回 response，不会自动抛错。

## Response

| 属性 / 方法 | 类型 | 说明 |
| --- | --- | --- |
| `status` | `number` | HTTP 状态码 |
| `statusText` | `string` | 状态文本 |
| `ok` | `boolean` | `200 <= status < 300` |
| `url` | `string` | 最终 URL |
| `redirected` | `boolean` | 是否发生重定向 |
| `headers.get(name)` | `string?` | 读取响应头 |
| `headers.has(name)` | `boolean` | 判断响应头是否存在 |
| `headers.entries()` | iterator | 枚举响应头 |
| `bytes()` | `Promise<Uint8Array>` | 读取二进制正文 |
| `text()` | `Promise<string>` | 读取 UTF-8 正文 |
| `json()` | `Promise<unknown>` | 解析 JSON 正文 |

## `download(url, destination, options?)`

下载直接写入 `data`、`cache` 或已声明的 `external` 区域，避免把大文件全部放入内存。额外选项：`maxBytes`、`overwrite`、`createParents`、`requireSuccess`；其余选项与 `fetch` 相同。

```javascript
await download(
    "https://cdn.example.com/update.json",
    { area: "data", path: "update.json" },
    { overwrite: true, createParents: true, requireSuccess: true },
);
```
