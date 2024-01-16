# vite 的插件

vite 会在生命周期的不同阶段调用不同的插件以达到不同的目的。

生命周期：从开始执行到执行结束。

## 插件的格式

```typescript
// 返回部分配置（推荐）
const partialConfigPlugin = () => ({
  name: 'return-partial',
  config(config, { command }) {
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  },
});
```

### 插件 API 说明

插件是一个对象或者一个对象数组。

- name 插件的唯一名称，必须要有
- config 是 vite 特有的钩子。接收原始用户的配置，返回部分配置即可，vite 会做合并的操作。
- transformIndexHtml 转换 HTML。
- configureServer 配置开发服务器的钩子
- configResolved 解析完所有配置之后触发的钩子
- configPreviewServer() 配置预览服务器

还有一些 Rollup 和 vite 都用到的钩子

- options() 这里配置的是 build.rollupOptions

## 插件顺序

一个 Vite 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）来调整它的应用顺序。enforce 的值可以是 pre 或 post。解析后的插件将按照以下顺序排列：

1. Alias
2. 带有 enforce: 'pre' 的用户插件
3. Vite 核心插件
4. 没有 enforce 值的用户插件
5. Vite 构建用的插件
6. 带有 enforce: 'post' 的用户插件
7. Vite 后置构建插件（最小化，manifest，报告）

## 自定义一个插件

EJS，模板引擎。常用于后端，动态修改 HTML

`<%= EJS %>`

## rollup-plugin-node-externals

一个 Rollup 插件，自动将 NodeJS 内置模块声明为外部模块，也用来处理 npm dependencies, devDependencies, peerDependencies , optionalDependencies.

### 为什么需要这个插件？

Rollup 不能识别 NodeJS，如果写了 `import path from 'node:path'` 就会报错无法解析的依赖。

解决方法是：告诉 Rollup 这是一个外部依赖，这样 Rollup 就不会打包这部分代码了，而是保留 import 语句。

因为模块比较多，手工做比较繁琐，所以这个插件 自动将一些模块识别为外部模块

### 工作原理：

在 Rollup 的打包过程中，当一个模块被标记为外部模块时，Rollup 不会将该模块打包进最终的输出文件中。相反，它会假设该模块已经在运行环境中可用，并通过其他方式引入。

## xx

展位
