# 配置 Schema

配置 Schema 是一个声明式 JSON 文件。应用根据它生成设置页面，保存普通 JSON 值；脚本通过 `nuke:config` 获取启动时的只读快照。

## Manifest

```json
{
  "manifestVersion": 1,
  "apiVersion": 2,
  "id": "dev.example.settings",
  "name": "Settings Demo",
  "version": "1.0.0",
  "versionCode": 1,
  "configSchema": "config.schema.json"
}
```

## Schema

```json
{
  "schemaVersion": 1,
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "enabled": {
      "type": "boolean",
      "title": "启用自动处理",
      "description": "关闭后脚本仍运行，但不处理消息。",
      "default": true
    },
    "mode": {
      "type": "string",
      "title": "模式",
      "options": [
        { "value": "safe", "label": "保守" },
        { "value": "fast", "label": "快速" }
      ],
      "default": "safe"
    }
  }
}
```

属性支持 `boolean`、`string`、`number`、`integer` 和 `options`。可用约束包括 `default`、`minimum`、`maximum`、`minLength`、`maxLength`、`format` 和 `ui.widget`。

## 读取设置

```javascript
import { settings, get, has } from "nuke:config";

if (has("enabled") && settings.enabled) {
    const mode = get("mode", "safe");
}
```

`settings` 会深度冻结。配置值在会话启动时确定，脚本不能通过该模块写回设置。Schema 错误会在启动前报告，未知属性由 `additionalProperties: false` 拒绝。
