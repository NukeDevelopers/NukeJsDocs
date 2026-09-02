# Crypto

```javascript
import {
    randomBytes, randomUUID, digest, hmac,
    timingSafeEqual, aesGcmEncrypt, aesGcmDecrypt,
    pbkdf2, hkdf,
} from "nuke:crypto";
```

| API | 返回值 | 说明 |
| --- | --- | --- |
| `randomBytes(length)` | `Uint8Array` | 安全随机字节 |
| `randomUUID()` | `string` | UUID v4 |
| `digest(algorithm, data)` | `Promise<Uint8Array>` | 摘要 |
| `hmac(algorithm, key, data)` | `Promise<Uint8Array>` | HMAC |
| `timingSafeEqual(left, right)` | `boolean` | 常量时间比较 |
| `aesGcmEncrypt(options)` | `Promise<Uint8Array>` | AES-GCM 加密 |
| `aesGcmDecrypt(options)` | `Promise<Uint8Array>` | AES-GCM 解密 |
| `pbkdf2(options)` | `Promise<Uint8Array>` | PBKDF2 |
| `hkdf(options)` | `Promise<Uint8Array>` | HKDF |

摘要算法包括 `MD5`、`SHA-1`、`SHA-256`、`SHA-384`、`SHA-512`。AES-GCM 使用 16/24/32 字节密钥和 12 字节 IV；每次加密都生成新的 IV。字符串需先用 `encodeUtf8()` 转换。
