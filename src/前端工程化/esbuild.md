# esbuild

> An extremely fast bundler for the web
> 是一个非常快的 web 打包工具

## 为什么快？

[why-is-esbuild-fast](https://esbuild.github.io/faq/#why-is-esbuild-fast)

1. 使用 Go 语言编写，并编译成了机器码。Go 语言性能好；多线程。
2. 大量使用并行。充分利用 CPU，整个打包过程大概分为：解析、链接和代码生成。解析和代码生成并行。由于所有线程共享内存。
3. 自己从 0 开始实现。统一谋划，所有内容使用一致的数据结构，避免转换。
4. 高效利用内存。a. 尽可能少的读取内存。b. 借助 Go 尽可能省内存。
   - esbuild 一共读取了 3 次：1. 词法分析、解析、作用域设置和声明符号 2.绑定符号、语法缩小、JSX/TS 到 JS 和 ESNext 到 ES2015 3. 缩小标识符、缩小空白、生成代码和生成源映射。《--》别的打包方式可能来很多次：string→TS→JS→string, then string→JS→older JS→string, then string→JS→minified JS→string。
   - Go 本身省字节，比如几个布尔类型每个都只占用一个字节，可以将一个对象嵌入到另一个对象中，并且不占用内存。

## 怎么使用

命令行上用 --outfile=dist.js 的方式配置参数

## 一些概念

esbuild 目前只能将代码转成 es6，转换成 es5 暂不支持
