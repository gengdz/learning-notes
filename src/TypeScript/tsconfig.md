# tsconfig

[toc]

## TypeScript 编译器

Q：什么是 TypeScript 编译器？

TypeScript 编译器是**一款将 TypeScript 代码编译成 JavaScript 代码的工具，并在转换的过程中，进行类型检查、语法转换、代码优化等操作**。具体作用如下：

- 将 TypeScript 代码转换成 JavaScript 代码，使代码可以在浏览器或 Node.js 环境中运行
- 进行类型检查，检查代码中的类型错误和错误使用，减少代码中的 Bug
- 进行语法转换，将 TypeScript 语法转换成 JavaScript 语法，使得 JavaScript 引擎可以识别
- 进行代码优化，优化代码的执行效率和性能，提高代码的可读性和可维护性。
- 支持最新的 ECMAScript 标准，编译器可以将最新的语言特性转换成目标环境中支持的语法。

Q：常用的 TypeScript 编译器，以及用法？

- tsc
  - 官方的 TypeScript 编译器，可以通过命令行或集成到构建工具中来使用
  - `tsc fileName` 会输入同名的 .js 文件
- Babel

  - 在根目录下创建 `.babelrc` 文件，可以通过 Babel 插件：`@babel/preset-typescript` 。

- Webpack

  - 可以通过 webpack-loader 来支持 TypeScript 语法。
  - 使用 `ts-loader` 来编译 `/.tsx?$/`

- vite 安装下面的依赖
  - `@vitejs/plugin-react-refresh`：用于支持热更新。
  - `@vitejs/plugin-typescript`：用于编译 TypeScript 代码。

## tsconfig 作用

**`tsconfig.json` 是 TypeScript 的配置文件，用于告诉编译器如何编译项目中的代码。**

该文件指定了**项目的根目录**，以及**编译选项**。

当目录中出现了 tsconfig.json 文件，则说明该目录是 TypeScript 项目的根目录。

## 编译选项

```json
{
  "compileOnSave": false,
  "buildOnSave": false, // 没找到这个
  "compilerOptions": {
    "baseUrl": "./", // 指定项目的根目录。告诉编译器从哪里开始查找模块和文件。
    "outDir": "build", // 指定编译后的文件的输出目录
    "module": "esnext", // 控制最终生成哪种模块规范的代码。 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "target": "esnext", // 生成哪个版本的代码。指定 ECMAScript 目标版本：'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "jsx": "react", //  jsx 用于的开发环境，preserve/react/RN
    "moduleResolution": "node", // 选择模块解析策略。只有 node 的 commonjs 在遇到 import React from 'react' 时才会去 node_modules 中去找。
    "allowSyntheticDefaultImports": true, // 如果文件没有 export default，你又在使用的时候 使用 import xx from 'xx'，这种如果不处理会报错，设置为 true 之后，编译器会默认导出一个 default
    "lib": ["es6", "dom"], // 编译过程中需要引入的库文件的列表，即声明文件(.d.ts)。TypeScript 编译器自带的。选项主要是：DOM，ESXXX。
    "types": ["vite/client"], // 指定第三方库声明文件。TypeScript 社区创建。
    "sourceMap": true, // 是否生成 '.map' 文件
    "allowJs": true, // 允许编译 .js .jsx 文件
    "checkJs": false, // 允许在 .js 中报错
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "paths": {
      // 相对于 baseUrl
      "@/*": ["src/*"]
    },
    "noEmit": true, // 不输出文件，即编译后不会生成任何 js 文件
    "isolatedModules": true, // 是否在编译时将每个文件视为单独的模块，而不是与其他文件进行交互。默认情况下，编译器会把所有文件编译成一个大的 .js 文件。如果设置成 true，要保证每个文件都可以单独编译并运行，而不需要依赖其他文件或全局命名空间。
    "useDefineForClassFields": true, // 是否使用 ECMAScript 类字段定义来编译类字段。可以使代码规范，清晰。如果目标环境支持 defineProperty，那么建议开启。
    "noImplicitReturns": false, // 不要有隐式的返回。
    "importHelpers": true, // 从帮助函数模块中导出需要的特性函数，减小编译后的包体积。
    "declaration": true, // 是否生成.d.ts 文件。
    "skipLibCheck": true, // 忽略所有的声明文件（ *.d.ts）的类型检查。
    "forceConsistentCasingInFileNames": true, // 指定文件名 大小写 是一样的效果。（不区分文件名大小写）Window 文件名大小写不敏感， TS 大小写是敏感的。设置成 false （不设置）比较合理。
    "resolveJsonModule": true, // 允许在 TypeScript 中导入 JSON 模块。默认情况下是不能直接导入 JSON 模块的，配置了这个选项之后，TypeScript 会将 JSON 文件解析为 JavaScript 对象。
    "esModuleInterop": true //
  },
  "files": [], // 指定编译文件的列表。只有编译的文件少的时候会用到
  "include": ["src/**/*", "@types/*"], // 需要编译的文件或目录 ** 表示任意目录；* 表示任意文件
  "exclude": ["node_modules", "build", "public", "mock"], // 排除编译的文件或目录
  "extends": []
}
```

编译选项解释说明

### baseUrl

定义一个基础目录，TypeScript 会用 baseUrl 指定的基础目录来解析所有非相对路径导入的模块。

默认值：项目的根目录。

用法：

```ts
bashUrl: './';
```

> 什么是相对路径？
>
> 以 `./` 或者 `../` 开头的路径。
>
> 非相对路径导入的模块举例？
>
> - `import React from 'react'`
> - `import {} from '@/utils/utils'`

`./` 表示当前目录的路径标识符。在 Linux 和 macOS 中 根目录是 `/`，当前目录是 `.`

TypeScript 编译器解析模块导入路径时的方式：

- 如果导入路径是以 `./` 或 `../` 开头的相对路径，TypeScript 编译器会按照相对路径解析该模块，不考虑 `node_modules` 目录。
- 如果导入路径是以 `/` 开头的绝对路径，TypeScript 编译器会将其解析为项目根路径下的相对路径，不考虑 `node_modules` 目录。
- 如果导入路径是以非相对路径开头的模块名称，TypeScript 编译器会先查找 baseUrl 指定的目录下是否存在与模块名称相匹配的文件或目录，如果存在，则将其解析为该文件或目录的相对路径。否则，TypeScript 编译器会先查找当前目录下的 `node_modules` 目录是否存在与模块名称相匹配的文件或目录，如果存在，则将其解析为该文件或目录的相对路径。如果当前目录下的 `node_modules` 目录中不存在该模块，则 TypeScript 编译器会向上级目录递归查找，直到找到为止。如果最终在项目根目录的 `node_modules` 目录中都没有找到该模块，TypeScript 编译器就会报错。

### paths

paths 设置路径别名。

相对于 `baseUrl` 确定路径。

用法：

```ts
paths: {
  "@/*": ["./src/*"]
}
```

> paths 设置 `"@/*": ["src/*"]` 和 `"@/": ["./src/*"]` 有没有区别？
>
> 有区别。如果 `tsconfig.json` 文件在 config 目录下，不和 src 同一目录时，且没有设置 baseUrl 时有区别：
>
> - `"@/*": ["src/*"]` 从项目根目录开始解析，被解析成 `project/src`
> - `"@/": ["./src/*"]` 从当前目录开始解析，被解析为：`config/src`

### include

设置需要编译的文件范围。

```ts
include: ['./src/**/*'];
```

- `./src/**/*` 表示所有位于 `./src` 目录下的文件和子目录都需要包含在编译中。
- `./test/*` 表示所有位于 `./test` 目录下的一级文件和文件夹，不包含子目录。

### noImplicitReturns

不要有隐式的返回。每个分支情况都必须要有明确的返回。

```typescript
function parseResponse() {
  // 如果 noImplicitReturns 设置为 true,这里就会报错。
  if (success === false) {
    return 'false';
  }
}
```

### esModuleInterop

兼容只有 umd，cjs 方式且没有暴露 deault 属性的包，添加 default 属性，从而使得 `import a from "a"` 或者 `import * as a from "a"` 引入的包，不会报没有 default 属性。

例如 query-string@7.1.1 这样的包。 保险起见，建议开启这个配置。

### importHelpers

如果代码中使用了装饰器等 JS 没有的特性时，TypeScript 编译器会生成一些帮助函数来支持这些特性的实现。

importHelpers 会帮助我们减小编译后的代码体积。因为它会将这些帮助函数的实现转换成从一个帮助函数模块中导出的形式，以避免在每个模块中重复生成这些帮助函数

## tsc

### --build/-b

Build one or more projects and their dependencies, if out of date

```bash
tsc -b
```

## 场景化学习

Q: tsconfig 和 Webpack 的 sourceMap 的区别和联系 A: 不同点：

- tsconfig 的 sourceMap 它将**源代码(TypeScript)**和**编译后**的 JavaScript 文件联系起来。
- Webpack 的 sourceMap 是将**源代码(.css .html .ts .js,)**和**打包后**的文件（主要是：JavaScript）联系起来。

Q: Webpack 打包 CSS 后存在形式是 .js 还是 .css A：默认是生成 .js 文件，然后通过动态创建 style 标签来显示 CSS 样式。但是可以配置将 CSS 直接打包成 CSS 文件。
