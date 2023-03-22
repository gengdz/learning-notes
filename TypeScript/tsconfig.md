# tsconfig

## 前置知识

### TypeScript 编译器

Q：什么是 TypeScript 编译器？

TypeScript 编译器是**一款将 TypeScript 代码编译成 JavaScript 代码的工具，并在转换的过程中，进行类型检查、语法转换、代码优化等操作**。具体作用如下：
* 将 TypeScript 代码转换成 JavaScript 代码，使代码可以在浏览器或 Node.js 环境中运行
* 进行类型检查，检查代码中的类型错误和错误使用，减少代码中的 Bug
* 进行语法转换，将 TypeScript 语法转换成 JavaScript 语法，使得 JavaScript 引擎可以识别
* 进行代码优化，优化代码的执行效率和性能，提高代码的可读性和可维护性。
* 支持最新的 ECMAScript 标准，编译器可以将最新的语言特性转换成目标环境中支持的语法。



Q：常用的 TypeScript 编译器，以及用法？

* tsc
  * 官方的 TypeScript 编译器，可以通过命令行或集成到构建工具中来使用
  * `tsc fileName` 会输入同名的 .js 文件
* Babel
  * 在根目录下创建 `.babelrc` 文件，可以通过 Babel 插件：`@babel/preset-typescript` 。

* Webpack 
  * 可以通过 webpack-loader 来支持 TypeScript 语法。
  * 使用 `ts-loader` 来编译 `/.tsx?$/`

* vite
  安装下面的依赖
  `@vitejs/plugin-react-refresh`：用于支持热更新。
  `@vitejs/plugin-typescript`：用于编译 TypeScript 代码。




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
    "baseUrl": "./",
    "outDir": "build",      
    "module": "esnext",     // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "target": "esnext",        // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "jsx": "react",        //  jsx用于的开发环境，preserve/react/RN
    "moduleResolution": "node", // 选择模块解析策略
    "allowSyntheticDefaultImports": true,
    "lib": ["es6", "dom"], // // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array"。
    "sourceMap": true,     // 是否生成 '.map' 文件
    "allowJs": true,       // 允许编译 .js .jsx 文件
    "checkJs": false, // 允许在 .js 中报错
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "paths": { // 相对于 baseUrl
      "@/*": ["src/*"]
    },
    "noEmit": true, // 不输出文件，即编译后不会生成任何js文件
    "isolatedModules": true, // 是否在编译时将每个文件视为单独的模块，而不是与其他文件进行交互。默认情况下，编译器会把所有文件编译成一个大的 .js 文件。如果设置成 true，要保证每个文件都可以单独编译并运行，而不需要依赖其他文件或全局命名空间。
    "useDefineForClassFields": true // 是否使用 ECMAScript 类字段定义来编译类字段。可以使代码规范，清晰。如果目标环境支持 defineProperty，那么建议开启。
  },
  "files": [], // 指定编译文件的列表。只有编译的文件少的时候会用到
  "include": ["src/**/*", "@types/*"],  // 需要编译的文件或目录 ** 表示任意目录；* 表示任意文件
  "exclude": ["node_modules", "build", "public", "mock"], // 排除编译的文件或目录
  "extends": [],
}

```


## 场景化学习

Q: tsconfig 和 Webpack 的 sourceMap 的区别和联系
A: 
不同点：
* tsconfig 的 sourceMap 它将**源代码(TypeScript)**和**编译后**的 JavaScript 文件联系起来。
* Webpack 的 sourceMap 是将**源代码(.css .html .ts .js,)**和**打包后**的文件(主要是：JavaScript)联系起来。


Q: Webpack 打包 CSS 后存在形式是 .js 还是 .css
A：默认是生成 .js 文件，然后通过动态创建 style 标签来显示 CSS 样式。但是可以配置将 CSS 直接打包成 CSS 文件。
