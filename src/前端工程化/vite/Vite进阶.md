# Vite 进阶

## 浏览器请求文件到返回的过程，Vite 做了什么

1. 请求拦截。开发服务器会对请求进行拦截
2. 代码转换。把文件转换成浏览器可运行的 JavaScript
3. HMR 注入：在代码转换过程中，Vite 会检查当前模块是否需要支持 HMR。如果需要，Vite 会向该模块的代码中注入特定的 HMR 运行时代码。Vite 处理代码注入通常会在其他转换之后，以确保它不会干扰其他代码的正常运行
4. 发送响应。

HMR 注入

```typescript
// 假设处理 JavaScript 文件
if (needsHmr) {
  const hmrCode = `
    if (import.meta.hot) {
      import.meta.hot.accept((newModule) => {
        // HMR 更新逻辑...
      });
    }
  `;
  transformedCode += hmrCode;
}

// 然后将转换后的代码加上 HMR 逻辑作为响应发送
```

## Vite 热更新的原理

1. Vite 在启动的时候会启动一个本地服务器，并创建一个 Websocket。
2. 本地服务器会监听文件的变化，当文件变化的时候，Vite 会重新构建变化的模块，生成一个新的 URL，
3. Vite 会通过 WebSocket 向浏览器发送消息，通知浏览器进行更新。
4. 浏览器在接收到通知到，会以动态加载的方式，请求新的模块，替换掉旧的模块，无需刷新浏览器

监听文件变化

```typescript
const chokidar = require('chokidar');

// 初始化监控器，它可以是文件或目录的路径。
const watcher = chokidar.watch('path/to/dir', { ignored: /^\./, persistent: true });

// 添加事件监听（文件添加、更改以及删除）
watcher
  .on('add', (path) => console.log(`File ${path} has been added`))
  .on('change', (path) => console.log(`File ${path} has been changed`))
  .on('unlink', (path) => console.log(`File ${path} has been removed`));
```

客户端处理变化

```typescript
const socket = new WebSocket('ws://localhost:3000'); // 假设 Vite 服务运行在 3000 端口

// 当 WebSocket 连接打开时
socket.onopen = function () {
  console.log('Connected to the HMR WebSocket');
};

// 处理从服务器发送过来的消息
socket.onmessage = function (message) {
  const { data } = message;
  const parsedData = JSON.parse(data);

  // 检查消息类型
  if (parsedData.type === 'update') {
    // 获取所有已更改的模块的 URL
    const updatedModules = parsedData.data.updates.map((update) => update.url);

    // 创建一个链式的 Promise 队列逐一重新加载模块
    updatedModules.reduce((promiseChain, url) => {
      return promiseChain.then(() => {
        // 使用动态导入来重新加载模块
        return import(/* @vite-ignore */ url + '?t=' + new Date().getTime())
          .then((module) => {
            console.log(`Module ${url} updated`);
            // 如果模块导出了 hot-accept 相关的方法，可以在这里调用
            if (module.hot && module.hot.accept) {
              module.hot.accept();
            }
          })
          .catch((error) => {
            console.error(`Failed to update module: ${url}`, error);
          });
      });
    }, Promise.resolve());
  }
};
```

为什么能保持状态还在。

```typescript
// 如果支持 HMR
if (import.meta.hot) {
  // 如果这个模块即将被替换，保存它的状态
  import.meta.hot.dispose((data) => {
    data.state = state;
  });

  // 当这个模块被替换后，恢复保存的状态
  import.meta.hot.accept((newModule) => {
    state = newModule.state;
  });
```
