# Config

```javascript
import { settings, has, get } from "nuke:config";
```

| API | 签名 | 说明 |
| --- | --- | --- |
| `settings` | `Readonly<object>` | Schema 默认值与用户值合并后的快照 |
| `has` | `(key: string) => boolean` | 判断键是否存在 |
| `get` | `(key: string, fallback?) => unknown` | 读取键，不存在时返回 fallback |

`settings` 在启动时创建并深度冻结。配置由应用根据 `config.schema.json` 生成，脚本不能通过该模块写入设置。

## 读取配置

`get` 按键读取配置；不存在时返回调用方提供的 fallback。嵌套对象可通过 `settings` 快照读取：

```javascript
import { settings, get } from "nuke:config";

const network = get("network", {});
const endpoint = network.endpoint ?? "https://api.example.com";
const retries = network.retries ?? 3;
// settings 仍是只读快照，不要直接修改其属性。
```

配置结构、约束和 UI 小部件见[配置 Schema 指南](/guides/configuration)。
