# bun

## bun 是什么？

> Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun​.
> bun 是一个开发 JavaScript 和 TypeScript 应用的工具包

它是一个 JavaScript 运行时，用来取代 Node.js
它不止是一个运行时，长期目标是成为一个内聚的基础设施工具包，用于使用 JavaScript/TypeScript 构建应用程序。包括包管理器、转译器、捆绑器、脚本运行器、测试运行器等。

### 什么是运行时

JavaScript 运行时（Runtime）是指 JavaScript 代码在浏览器或服务器上执行时所需的环境，包括 JavaScript 引擎和相关的基础库。

- JavaScript 引擎是指**负责解析和执行 JavaScript 代码的程序**，比如 V8 引擎、 JavaScriptCore 引擎等。
- 基础库包括 **ECMAScript 标准库、DOM API、XMLHttpRequest API、Web API** 等。

JavaScript 运行时提供了一种可编程的环境，使得 JavaScript 代码可以与 Web 应用程序交互，实现动态的用户界面和交互式的 Web 应用程序。


### 模板

`bun create 模板名称 位置`

```bash
# React 模板
bun create react app

# 空的模板
bun init
```


## RUNTIME

### bun run
* run a file。`bun run 文件地址`。支持 .js, .ts, .jsx, .tsx
* run a `package.json` scripts  `bun run dev`




## Package Manager

```bash
# 安装所有的包
bun install

# prod dependency
bun add react

# dev dependency
bun add -d bun-types 

# 删除一个依赖
bun remove preact


```


## Bundler

为什么需要打包
* 减少 HTTP 请求。
* 代码转换
* 框架功能依赖打包 