# 权限与能力

权限声明是脚本包的一部分。它告诉用户脚本会使用哪些宿主能力；引擎在准备阶段验证声明，运行时再检查有效授权。

## 权限表

| 能力 | Manifest | 用户确认 | 公开模块 |
| --- | --- | --- | --- |
| 基础运行时、日志、配置、计时器、编码、密码学、UI | 无 | 无 | `nuke:runtime` 等 |
| 脚本自身文件 | 无 | 无 | `nuke:fs` 的 `package`、`data`、`cache` |
| 消息 | 无 | 无 | `nuke:messaging` |
| 网络 | `"network": true` | 无 | `nuke:http` |
| 外部存储 | `filesystem.external: true` | 无 | `nuke:fs` |
| Java/Android 反射 | `"java": true` | 有 | `nuke:java` |
| 方法 Hook | `"hook": true` | 有 | `nuke:java` |

```json
{
  "permissions": {
    "network": true,
    "filesystem": { "external": true },
    "java": true,
    "hook": true
  }
}
```

## 声明与授权

- 导入 `nuke:http` 却未声明 `network`，脚本在准备阶段失败；
- `java` 和 `hook` 需要用户确认，`hook` 不会自动包含 `java`；
- 用户撤销危险授权后，后续调用返回 `PERMISSION_DENIED`；
- 版本号或危险声明变化后需要重新确认；
- 脚本停止时已安装的 Hook 和 Java 引用会被清理。

## 运行时检查

```javascript
import { hasPermission } from "nuke:runtime";

if (hasPermission("java")) {
    // 可选 Java 功能
}
```

支持 `network`、`network.private`、`filesystem.external`、`filesystem.host`、`java`、`hook`。查询只返回当前会话结果，不会显示授权界面。

## README 中的权限说明

危险权限应在 README 中说明用途、访问的类或方法范围、失败时的降级行为。权限不是密钥存储机制，也不保证宿主 API 永远存在；脚本仍应处理 `HOST_ACCESS_UNAVAILABLE`、`HOST_HOOK_UNAVAILABLE` 和 `NOT_FOUND`。

## 发布前检查清单

- [ ] Manifest 中的权限与实际导入模块一致；
- [ ] README 说明每项危险能力的用途和失败时行为；
- [ ] 网络、文件和 Java 调用都处理了对应的 `NukeError`；
- [ ] 停止脚本后监听器、计时器、Hook 和 Java 引用都能释放；
- [ ] 修改危险权限或版本后已递增 `versionCode` 并重新确认。
