# clean-pkg-json

[clean-pkg-json](https://github.com/privatenumber/clean-pkg-json) Script to remove unnecessary properties from package.json on prepublish hook

## How it Works

- 访问当前路径下的 `package.json` 文件
- 通过 [default-keep-properties](https://github.com/privatenumber/clean-pkg-json/blob/29065f59072b917a3f0e58fc7f9cd48c680d890a/src/default-keep-properties.ts) 中定义的 properties 和 CLI 传入的 `keep`
- 遍历 `package.json` 的 properties, 特殊处理 `scripts` property 支持 `scripts.${name}` dot 语法访问属性, 删除不存在 keepProperties 集合中的 property
- 将新的 json 写入到 `package.json`

## Others

- 比较有意思的是, 作者 [privatenumber](https://github.com/privatenumber) 使用的都是自己构建工具
- 打包 [pkgroll](https://github.com/privatenumber/pkgroll)
- CLI [cleye](https://github.com/privatenumber/cleye)
- 测试 [manten](https://github.com/privatenumber/manten)
- TS Execute[tsx](https://github.com/esbuild-kit/tsx)
