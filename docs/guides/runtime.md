# 运行模型

Nuke 为每个脚本创建独立的 QuickJS 会话。会话包含 JavaScript 全局对象、配置快照、日志上下文、计时器表、Java 引用表和脚本专属文件根目录。

## 状态机

```text
CREATED -> STARTING -> RUNNING -> STOPPING -> STOPPED
                      \-> FAILED
```

脚本只有在模块注册和 `activate()` 成功后才进入 `RUNNING`。启动失败会保留错误记录；脚本需要修复后重新启动。

## 启动阶段

1. 读取并严格验证 `manifest.json`；
2. 解析入口模块及其相对导入；
3. 创建 QuickJS 并安装已声明的公开模块；
4. 执行模块顶层代码；
5. 调用可选的 `activate()`；
6. 开始接收消息和处理计时器。

未被入口导入的 JavaScript 文件不会执行。动态导入只支持可以在准备阶段识别的字符串字面量路径。

## 停止与隔离

停止时 Nuke 会调用 `deactivate()`，取消异步任务，解除全部 Java Hook，释放 Java 对象并关闭 QuickJS。脚本的 `data`、`cache`、配置和日志按脚本 ID 隔离；一个脚本的异常不会直接终止其他会话。

## 资源配额

从 `nuke:runtime` 读取 `limits`。计时器、HTTP 并发、文件大小、消息 segment、Java 引用和嵌套转换均有上限。配额错误是可预期的业务错误，脚本应在执行前检查输入规模。

## 日志

`nuke:log` 和 `console` 写入运行时日志流。每个脚本还会在其目录生成独立日志文件，包含脚本日志、启动失败和系统异常，便于从应用脚本页面诊断。
