# taze

[taze](https://npm.im/taze) 🥦 A modern cli tool that keeps your deps fresh

- https://github.com/antfu/contribute#update-dependencies

- `cli.ts` 中使用 [yargs](https://npm.im/yargs) 来构建命令行, 主要包含 `usage` 和 `* [mode]` 命令 #
- `config.ts` 中使用 [unconfig](https://npm.im/unconfig) 来加载 `taze` 配置文件

## `commands/usage`

- 先通过 [fast-glob](https://npm.im/fast-glob) 加载所有的 `package.json` 文件
- 通过 [cli-progress](https://npm.im/cli-progress) 创建命令行进度条
- 通过 [pacote](https://npm.im/pacote) 获取 npm 包信息, 并缓存
- 
