# package.json

## 配置如下

```json
{
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "browser": "./dist/index.umd.js",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "node": "./dist/index.node.js"
      "default": "./dist/index.umd.js",
    }
  },
  "types": "./dist/index.d.ts",
  "files": ["dist", "es"],
  "dependencies": {
    "test": "^1.2,3"
  },
  "scripts": {
    "dev": "vite serve",
    "build": "vite build",
    "preview": "vite preview",
    "eslint": "eslint --fix src/ --ext .js,.jsx,.ts,.tsx",
    "stylelint": "stylelint 'src/**/*.{css,less,scss}'",
    "stylelint:fix": "stylelint --fix 'src/**/*.{css,less,scss}'",
    "prepare": "husky install && npx msw init ./ --save"
  },

  "resolutions": {
    "test/aa": "^1.1.0"
  },
  "publishConfig": {
    "registry": "https://my-private-registry.com",
    "access": "publish",
    "tag": "next", // 默认为 ltest 版本。
  },
  "engines": {
		"node": ">=14"
	},
  "bin": {
    "myCli": './bin/enter'
  }
}
```

## 配置项说明

### main & module & browser

- 当使用 require 引入模块时，会默认加载 main 文件
- 当使用 import 引入模块时，会默认加载 module 文件
- 当在浏览器中使用模块时，会默认加载 browser 文件

什么是在浏览器中使用？

我有一个项目 A，还有一个项目 B，B 中通过 import 的方式引入了 A，B 项目会经过 webpack 打包最终在浏览器中执行，如果 A，B 都配置了上面 3 个字段，A，B 项目中最终使用的是那个配置？B 使用的是 A 的 module 文件浏览器使用的是 B 的 browser 文件。

### exports

package.json 中的 exports 字段是 Node.js 12.7.0 及以上版本新增的，用于指定模块的导出方式，以替代旧的方式（例如 main 和 module 字段）。 **它的优先级是高于任何入口字段的（module、main、browser**

用它可以指定需要暴露的子目录。没暴露出来的子目录不会被访问到。

`.` 代表当前模块的根目录。

- 当使用 ES6 的 import 语句加载该模块时，默认导出的是 "./dist/axios.mjs"。
- 当在 CommonJS 模块中和 Node.js 环境中使用 require() 函数加载该模块时，默认导出的是 "./dist/axios.cjs"。
- 当在 Node.js 环境中加载模块时，默认导出的时："./dist/axios.node.js",
- 如果在 node.js 的环境，并且使用 require 的方式加载模块，那么使用 node 属性指定的文件。
- require 属性指定的文件会在 CommonJS 模块中和 Node.js 环境中使用，而 node 属性指定的文件仅在 Node.js 环境中使用。
- default 配置了默认的导出路径。上面的没匹配到就会走到这里，无论是通过哪种方式加载模块。

**在 "exports" 对象中，键序很重要。在条件匹配过程中，排序靠前的入口具有较高的优先级。通常规则是，这些条件应该从最特殊到最不特殊来排序。**

> 如果在 A 项目中我定义了 main & module & browser & exports，我在 B 项目中通过 import 的方式使用 A，那么最终我使用的是那个属性定义的文件？是 exports 的 import 定义的文件被使用。exports 的优先级高，又通过 import 的方式使用

### `main` & `module` & `browser` & `exports.import` & `export.require` & `export.node` & `export.default`

有一个包 myPkg 既可以在浏览器使用，也可以在 node 使用，在 package.json 配置了以上字段时。

```json
{
  "main": "./dist/index.main.js",
  "module": "./dist/index.module.js",
  "browser": "./dist/index.browser.js",
  "exports": {
    ".": {
      "import": "./dist/index.exports.import.js",
      "require": "./dist/index.exports.require.js"
    }
  }
}
```

在 **浏览器** 中使用

- 通过 `import myPkg from 'myPkg'` 的方式使用：browser > module > main > index.js(myPkg 根目录下的 index.js 和 package.json)
- 通过 `require myPkg from 'myPkg'` 的方式使用：browser > main > module > index.js(myPkg 根目录下的 index.js 和 package.json)

在 **Node** 中使用等需要的时候再补充

构建工具可以指定入口顺序，干预上面的过程：webpack 使用 [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolvemainfields) 的方式干预。 **webpack 在 target: web 的情况下 mainFields 字段默认为 ['browser', 'module', 'main']**。webpack 默认的 target 为 web

Rollup 进行构建你的项目，你也可以通过 `@rollup/plugin-node-resolve` 插件中的 `mainFields` 来实现这个功能。

环境是怎么来的，怎么设置环境上述所谓的 browser、development 等运行环境究竟是如何被设置的呢。或者换一个问题，如果我们在 exports 中希望额外添加一个环境的引入路径，应该如何做呢？

在运行 NodeJs 脚本时可以通过 `--conditions` 标志添加自定义用户条件。

比如此时我们通过

```bash
node --conditions=customMode main.js
```

所谓的 target 仅仅是表示构建环境的区别。比如传入 web 表示 browser 构建环境，传入 node 表示 node 构建环境。

对应过来也就是设置 --conditions 参数。

参考资料

- [package.json 来聊聊如何管理一款优秀的 Npm 包](https://zhuanlan.zhihu.com/p/548202395)

### types

用来指定 TypeScript 项目的类型声明文件路径，告诉 TypeScript 编译器在编译该模块时需要包含哪些类型声明文件。

这样其他 TypeScript 项目使用这个模块时，在编译的时会自动获取类型提示。

可以用字符串也可以用数组。

### files

指定哪些文件推送到 npm 服务器。默认情况下，包含： README、LICENSE 和 package.json 文件，以及 bin、lib 和 man 目录

### scripts

npm 脚本就是 Shell 脚本

- 可以使用 Shell 通配符

#### 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用 & 符号。

```bash
npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```bash
npm run script1.js && npm run script2.js
```

#### 钩子

npm 脚本有 pre 和 post 两个钩子。举例来说，build 脚本命令的钩子就是 prebuild 和 postbuild。

```bash
# npm build 等于下面的命令
npm run prebuild && npm run build && npm run postbuild
```

自定义的命令也有 pre, post 两个钩子

#### prepare

prepare 命令在 `npm install` 之前执行。

```bash
npm install = npm prepare && npm install
```

#### 简写

自定义命令需要 npm run xx 的方式执行。

以下命令可以不用加 run

- npm install
- npm start
- npm

### resolutions

锁定你依赖的包的依赖。

如果你项目依赖的包 test，依赖了 test/aa,test/aa 发布了一个有问题的版本，这时候会导致 test 出问题，我们可以使用 resolutions 的方式锁定包的版本。

### publishConfig

用来配置发布到 npm 上的包的参数。

registry：指定发布时要使用的仓库地址。默认为：`https://registry。npmjs.org`。access: 设置这个包的访问权限。tag: 发布的包被标记的值。有 next。默认为 latest

如果 registry 指定了一个私有地址作为 npm 仓库，那么别人是无法直接看到和下载你的包。

### bin

bin 内容在安装包之后就注册为命令行指令
