# ni

[@antfu/ni](http://npm.im/@antfu/ni)💡 Use the right package manager

## How it Works

- `commands/*.ts` 定义相关命令文件
  - `commands/nr.ts` 会存储 `lastCommand` 和加载 `scripts-info`
- `runner.ts` 运行 CLI 入口
  - 定义 `DEBUG_SIGN(?)` 标识
  - 更具 `-g` 获取全局 `agent`, 或者根据 `lock` 文件探测 `agent`, 或者获取默认 `agent`
  - 如果 `agent` 是默认值 `prompt` 提示选择 `agent`
  - 将 `agent`, `args` 和 `ctx` 传给 `Runner` 返回 `command`
  - 通过 `execa` 执行返回的 `command`
  - `debug` 模式只输出命令
- `parse.ts` 解析不同的命令
  - 定义 `parseNi`, `parseNr`, `parseNu`, `parseNun`, `parseNx`, `parseNa` 通过 `agent`, `args` 和 `ctx` 返回不同的 `command`
- `agents` 定义不同的命令的映射
- ``
