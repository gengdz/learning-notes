# webpack 插件

Webpack 插件是一个包含 apply 方法的 JavaScript 对象。该方法会在 Webpack 编译运行时被调用，并且作为参数接受 compiler 对象。

利用 Webpack 钩子函数：在 apply 方法中，可以利用 Webpack 提供的钩子注册回调函数来执行特定阶段的操作。

## 去 console.log 插件

```js
// DropConsoleWebpackPlugin.js
class DropConsoleWebpackPlugin {
  apply(compiler) {
    // 使用'emit'钩子，在生成资源到 output 目录之前执行函数
    compiler.hooks.emit.tapAsync('DropConsoleWebpackPlugin', (compilation, callback) => {
      // 遍历所有编译后的资源，对每一个文件进行处理
      Object.keys(compilation.assets).forEach((assetName) => {
        // 只处理.js 文件
        if (assetName.endsWith('.js')) {
          // 获取原始的文件内容
          const originalSource = compilation.assets[assetName].source();

          // 利用正则表达式去除 console.log
          const modifiedSource = originalSource.replace(/console\.log\(.+?\);?/g, '');

          // 更新 compilation.assets，用去除 console.log 后的内容替代原内容
          compilation.assets[assetName] = {
            source: () => modifiedSource,
            size: () => modifiedSource.length,
          };
        }
      });

      // 操作完成后调用 callback，继续 Webpack 流程
      callback();
    });
  }
}

module.exports = DropConsoleWebpackPlugin;
```
