# WebAssembly

WebAssembly（wasm），是一种可移植、高性能的二进制指令格式，可以让各种语言编写的代码以接近原生的速度在 Web 浏览器中执行。

它可以在 Web 浏览器中运行，并与 JavaScript 以及其他 Web 技术（如 HTML 和 CSS）集成。

## 优势

- 性能：WebAssembly 的二进制代码可以在 Web 浏览器中以接近原生速度执行。这是由于 WebAssembly 采用了一种紧凑且高效的指令格式，以及优化的执行引擎。
- 安全性：WebAssembly 的设计目标之一是提供更安全的执行环境。它使用了严格的内存隔离和沙箱技术，可以防止恶意代码对系统造成损害。
- 多语言支持：WebAssembly 不仅适用于 JavaScript，还支持多种编程语言，如 C/C++、Rust、Go 等。这使得开发人员可以使用他们熟悉的语言来编写高性能的 Web 应用程序。

## 基本使用

1. 先写源码

```typescript
const add = (a, b) => a + b;
```

2. 使用 Emscripten 将源码变异成 WebAssembly 模块

```bash
emcc add.c -s WASM=1 -o add.js
```

这将生成 2 个文件

- add.js
- add.wasm

3. 在项目中引入 add.js，这个文件会调用 add.wasm 文件

## 参考资料

- [官网](https://webassembly.org/)
- [WebAssembly](https://juejin.cn/post/7260140790546104375?searchId=202309142224227BC3936ACA80956003EE)
- [WebAssembly](https://juejin.cn/post/7156250334082367496)
