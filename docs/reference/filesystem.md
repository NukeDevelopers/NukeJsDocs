# 文件系统

```javascript
import {
    exists, stat, list, readBytes, readText,
    writeBytes, writeText, createDirectory,
    remove, copy, move,
} from "nuke:fs";
```

## FileRef

```javascript
const ref = { area: "data", path: "state/settings.json" };
```

`area` 为 `package`、`data`、`cache` 或 `external`。`package` 只读；`external` 需要 Manifest 声明。`path` 必须是规范化相对路径，禁止绝对路径、`..`、反斜杠和符号链接逃逸。

## 函数

| 函数 | 返回值 | 说明 |
| --- | --- | --- |
| `exists(ref)` | `Promise<boolean>` | 判断文件或目录是否存在 |
| `stat(ref)` | `Promise<FileInfo>` | 读取类型、大小和修改时间 |
| `list(ref)` | `Promise<FileInfo[]>` | 列出目录直接子项 |
| `readBytes(ref)` | `Promise<Uint8Array>` | 读取二进制 |
| `readText(ref)` | `Promise<string>` | 按 UTF-8 读取文本 |
| `writeBytes(ref, data, options?)` | `Promise<FileInfo>` | 写入二进制 |
| `writeText(ref, text, options?)` | `Promise<FileInfo>` | 写入文本 |
| `createDirectory(ref, recursive?)` | `Promise<void>` | 创建目录 |
| `remove(ref, options?)` | `Promise<void>` | 删除文件或目录 |
| `copy(source, target, options?)` | `Promise<FileInfo>` | 复制文件 |
| `move(source, target, options?)` | `Promise<FileInfo>` | 移动文件 |

写入选项：`overwrite`、`atomic`、`createParents`。删除选项：`recursive`、`missingOk`。

```javascript
const state = { version: 1, enabled: true };
await writeText(
    { area: "data", path: "state.json" },
    JSON.stringify(state),
    { overwrite: true, atomic: true, createParents: true },
);
```

读取和写入受 `limits.maxFileReadBytes` 与存储配额限制。文件操作失败时检查 `IO_ERROR`、`NOT_FOUND`、`ALREADY_EXISTS` 和 `QUOTA_EXCEEDED`。
