# 脚本包

Nuke 脚本包由 Manifest、入口模块和可选资源组成。脚本可以直接以目录安装，也可以打包为 `.nsz` 分发。

## 推荐结构

```text
example-script/
├── manifest.json          # 必需
├── main.js                # 默认入口
├── README.md              # 用户可见介绍，可选
├── config.schema.json     # 设置定义，可选
├── src/                   # 相对导入的 JS 模块
└── assets/                # package 区域读取的资源
```

只有从入口可达的 `.js` 文件会执行。导入路径区分大小写；循环依赖和无法在准备阶段识别的动态模块名会被拒绝。

## Manifest

```json
{
  "manifestVersion": 1,
  "apiVersion": 2,
  "id": "dev.example.image-tool",
  "name": "Image Tool",
  "version": "1.2.0",
  "versionCode": 12,
  "entry": "main.js",
  "configSchema": "config.schema.json",
  "description": "处理远程图片资源",
  "author": "Example",
  "permissions": {
    "network": true
  }
}
```

| 字段 | 类型 | 规则 |
| --- | --- | --- |
| `manifestVersion` | integer | 当前为 `1` |
| `apiVersion` | integer | 当前为 `2` |
| `id` | string | 至少两个小写点分段，稳定且唯一 |
| `name` | string | 非空，最多 128 字符 |
| `version` | string | 非空，最多 64 字符 |
| `versionCode` | integer | 正整数，用于更新比较 |
| `entry` | string | 包内 `.js`，默认 `main.js` |
| `configSchema` | string | 包内 `.json`，可选 |
| `description` | string | 最多 2048 字符 |
| `author` | string | 可选作者信息 |
| `permissions` | object | 能力声明 |

解析器会拒绝未知字段、非法路径、重复 ID 和不匹配的 API 版本。

## NSZ 分发

`.nsz` 是 ZIP 容器，Manifest 必须位于归档根目录：

```text
example.nsz
├── manifest.json
├── main.js
└── README.md
```

不要额外套一层同名目录。导入流程会先预检 ZIP、Manifest、模块和大小限制，再整体替换同 ID 的旧脚本。更新不会合并旧包文件；需要保留的数据写入 `data` 区域。
