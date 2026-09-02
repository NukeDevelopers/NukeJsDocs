# 生命周期

入口模块可以导出 `activate()` 和 `deactivate()`。它们可以是同步函数或返回 Promise 的异步函数。

```javascript
import { setInterval, clearInterval } from "nuke:timers";
import { onMessage } from "nuke:messaging";

let timerId = null;
let unsubscribe = null;

export async function activate() {
    unsubscribe = onMessage(handleMessage);
    timerId = setInterval(() => console.log("tick"), 60_000);
}

export function deactivate() {
    if (unsubscribe) unsubscribe();
    if (timerId !== null) clearInterval(timerId);
    unsubscribe = null;
    timerId = null;
}

async function handleMessage(event) {
    // 处理 event
}
```

## 规则

- 模块顶层代码在 `activate()` 前执行，不要在顶层注册无法清理的副作用；
- `activate()` 抛错会使启动失败，必要时将可恢复网络错误转换为日志并继续；
- `deactivate()` 应幂等，重复执行不会抛错；
- 不要在 Hook 回调中等待 Promise，Hook 在触发线程同步执行；
- 停止时计时器、监听器、Hook 和 Java 引用都会被运行时清理，但显式释放仍是推荐做法。

## 失败诊断

脚本页面的运行状态和日志会显示启动阶段、脚本异常及系统异常。使用 `NukeError.code` 区分参数、权限、网络和宿主问题。
