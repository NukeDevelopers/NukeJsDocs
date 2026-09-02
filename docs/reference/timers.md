# Timers

```javascript
import {
    sleep, setTimeout, clearTimeout,
    setInterval, clearInterval,
} from "nuke:timers";
```

| API | 返回值 | 说明 |
| --- | --- | --- |
| `sleep(delayMs)` | `Promise<void>` | 等待指定毫秒 |
| `setTimeout(callback, delayMs, ...args)` | `number` | 执行一次 |
| `clearTimeout(id)` | `void` | 取消 timeout |
| `setInterval(callback, intervalMs, ...args)` | `number` | 周期执行 |
| `clearInterval(id)` | `void` | 取消 interval |

`intervalMs` 不能低于 `limits.minIntervalMs`。同一 interval 的回调不会重叠；脚本停止时所有计时器自动清理。

## 示例

```javascript
import { sleep, setInterval, clearInterval } from "nuke:timers";

export async function activate() {
    await sleep(500);
    const id = setInterval(() => console.log("heartbeat"), 30_000);
    globalThis.heartbeatTimer = id;
}

export function deactivate() {
    if (globalThis.heartbeatTimer !== undefined) {
        clearInterval(globalThis.heartbeatTimer);
        delete globalThis.heartbeatTimer;
    }
}
```

计时器回调应保持短小；需要异步工作时，在回调中启动任务并自行处理异常，避免未处理的 Promise rejection。
