# UI

```javascript
import { toast, alert, confirm } from "nuke:ui";
```

| API | 返回值 | 说明 |
| --- | --- | --- |
| `toast(message, options?)` | `Promise<void>` | 短暂提示，duration 为 `short` 或 `long` |
| `alert(options)` | `Promise<void>` | 单按钮提示 |
| `confirm(options)` | `Promise<boolean>` | 确认框 |

```javascript
await toast("同步完成", { duration: "short" });
const accepted = await confirm({
    title: "继续？",
    message: "将覆盖现有数据。",
    confirmText: "继续",
    cancelText: "取消",
});
```

前台界面不可用或用户提前关闭时分别检查 `UI_UNAVAILABLE`、`UI_DISMISSED`。

## 错误处理

UI 调用依赖当前前台页面，建议将交互失败转换为日志或默认行为：

```javascript
import { confirm } from "nuke:ui";
import { warn } from "nuke:log";

let accepted = false;
try {
    accepted = await confirm({ title: "确认操作", message: "继续执行吗？" });
} catch (error) {
    warn("confirm.unavailable", { code: error?.code });
}
if (accepted) {
    // 执行需要用户确认的操作
}
```
