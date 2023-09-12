# vite 的插件

## rollup-plugin-node-externals

一个 Rollup 插件，自动将 NodeJS 内置模块声明为外部模块，也用来处理 npm dependencies, devDependencies, peerDependencies , optionalDependencies.

### 为什么需要这个插件？

Rollup 不能识别 NodeJS，如果写了 `import path from 'node:path'` 就会报错无法解析的依赖。

解决方法是：告诉 Rollup 这是一个外部依赖，这样 Rollup 就不会打包这部分代码了，而是保留 import 语句。

因为模块比较多，手工做比较繁琐，所以这个插件 自动将一些模块识别为外部模块

### 工作原理：

在 Rollup 的打包过程中，当一个模块被标记为外部模块时，Rollup 不会将该模块打包进最终的输出文件中。相反，它会假设该模块已经在运行环境中可用，并通过其他方式引入。


