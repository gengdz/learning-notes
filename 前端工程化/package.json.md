# package.json

## 配置如下

```json
{
  "main": "./src/index.ts",
  "module": "./src/index.ts",
  "browser": "./src/index.ts",
  "exports": {
    ".": {
      "import": "./dist/axios.mjs",
      "require": "./dist/axios.umd.js",
      "node": "./dist/axios.node.js"
    }
  },
  "types": "dist/index.d.ts",
  "dependencies": {
    "test": "^1.2,3"
  },
  "resolutions": {
    "test/aa": "^1.1.0"
  },
  "files": ["index.js", "dist"]
}
```

## 配置项说明

### main & module & browser

- 当使用 require 引入模块时，会默认加载 main 文件
- 当使用 import 引入模块时，会默认加载 module 文件
- 当在浏览器中使用改模块时，会默认加载 browser 文件

什么是在浏览器中使用?
我有一个项目 A，还有一个项目 B，B 中通过 import 的方式引入了 A，B 项目会经过 webpack 打包最终在浏览器中执行，如果 A，B 都配置了上面 3 个字段，A，B 项目中最终使用的是那个配置?
B 使用的是 A 的 module 文件
浏览器使用的是 B 的 browser 文件。

### exports

package.json 中的 exports 字段是 Node.js 12.16.0 及以上版本新增的，用于指定模块的导出方式，以替代旧的方式（例如 main 和 module 字段）。

`.` 代表当前模块的根目录。

- 当使用 ES6 的 import 语句加载该模块时，默认导出的是 "./dist/axios.mjs"。
- 当在 CommonJS 模块中和 Node.js 环境中使用 require() 函数加载该模块时，默认导出的是 "./dist/axios.umd.js"。
- 当在 Node.js 环境中加载模块时，默认导出的时："./dist/axios.node.js",
- 如果在 node.js 的环境，并且使用 require 的方式加载模块，那么最终使用的是 node 属性指定的文件。
- require 属性指定的文件会在 CommonJS 模块中和 Node.js 环境中使用，而 node 属性指定的文件仅在 Node.js 环境中使用。

> 如果在 A 项目中我定义了 main & module & browser & exports，我在 B 项目中通过 import 的方式使用 A，那么最终我使用的是那个属性定义的文件?
> 是 exports 的 import 定义的文件被使用。
> exports 的优先级高，又通过 import 的方式使用

### types

用来指定 TypeScript 项目的类型声明文件路径，告诉 TypeScript 编译器在编译该模块时需要包含哪些类型声明文件。

这样其他 TypeScript 项目使用这个模块时，在编译的时会自动获取类型提示。

可以用字符串也可以用数组。

### resolutions

锁定你依赖的包的依赖。

如果你项目依赖的包 test，依赖了 test/aa,test/aa 发布了一个有问题的版本，这时候会导致 test 出问题，我们可以使用 resolutions 的方式锁定包的版本。


### files

指定哪些文件推送到 npm 服务器。
```
