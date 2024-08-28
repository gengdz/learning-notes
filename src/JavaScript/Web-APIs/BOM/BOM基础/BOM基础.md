# BOM 基础

英文：`Browser Object Model` 中文 浏览器对象模型

BOM 即文档对象模型，是用来对浏览器窗口进行交互的对象，核心对象是 window。

BOM 的顶级对象是 **window**， 提供的 API window 全局对象中，它代表当前浏览器窗口。

DOM 也属于 BOM 的一部分，因为 window 也包括 document 对象。

BOM 的构成

构成如下：![BOM 构成](./BOM构成.jpg)

window 对象的特点：

1. 它是 JS 访问浏览器窗口的一个接口。
2. 它是一个全局对象，定义在全局作用域中变量、函数都会变成 window 对象的属性和方法。

注意：window 下的一个特殊属性 window.name。

## window

### 弹窗

- alert。window.alert();
- prompt。winodw.prompt();

### 窗口属性

- innerWidth
- innerHeigh
- open
- close

### window 对象的常见事件

#### 窗口加载事件

当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发 load 事件。

```typescript
window.addEventListener('load', function () {});

// 或者
window.onload = function () {};
```

窗口加载事件，**当文档内容完全加载完成会触发该事件**（包括图像、脚本文件、CSS 文件等）。

注意：

1. 有了 load 事件，就可以把相关的 JS 代码写到页面元素的上面。因为是页面完全加载完才会执行函数
2. window.onload 传统注册事件方式只能写一次，如果有多个，那么会以最后一个 window.onload 为准
3. addEventListener 无个数限制

#### DOM 加载完成事件

事件名： `DOMContentLoaded` 触发时机：当 DOM 加载完成，不包括 CSS 文件，图片，flash 等。适用范围：如果页面中的图片很多，采用 load 事件监听触发可能需要比较长的时间，此时用 DOMContentLoaded 事件比较合适

#### 调整窗口大小事件

事件名：`resize` 触发时机：调整窗口大小时。适用范围：1. 需要完成响应式布局时，可以使用， window.innerWidth 当前屏幕的宽度

### 定时器

#### setTimeout()

普通函数是直接调用，这个函数需要等待时间，时间到了才会去调用这个函数，因此也被称为回调函数。

```typescript
function setTimeout<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ms?: number,
  ...args: TArgs
): NodeJS.Timeout;

function setTimeout(callback: (args: void) => void, ms?: number): NodeJS.Timeout;
```

**停止定时器**

使用 `clearTimeout(timeoutID)`。

#### setInterval()

每隔一段时间就调用一次回调函数。

```typescript
function setInterval<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  ms?: number,
  ...args: TArgs
): NodeJS.Timer;

function setInterval(callback: (args: void) => void, ms?: number): NodeJS.Timer;
```

**停止定时器**

使用 `clearInterval(intervalID)`。

#### this 指向问题

因为是 window.setInterval()，所以 this 指向 window

```typescript
btn.addEventListener('click', function () {
  setInterval(function () {
    console.log(this); // 这个 this 指向了 window 对象。
    btn.disabled = false;
  });
});
```

### JS 执行机制

JavaScript 是单线程的，**同一个时间只能做一件事情。** 这意味着，所有任务都需要排队，前一个任务结束，才会执行后一个任务。

这样导致的问题是：如果 JS 执行时间过长，这样就会造成页面渲染不连贯，导致页面渲染加载阻塞。

#### 同步和异步

为了解决这个问题，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，于是，JavaScript 就出现了**同步**和**异步**

- 同步：前一个任务结束后再执行后一个任务，程序的执行顺序和任务的排列顺序是一致的、同步的。
- 异步：因为这个事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情。

本质区别：这条流水线上各个流程的执行顺序不同

异步任务分类：

- 普通事件，如 click、resize 等
- 资源加载，如 load、error 等
- 定时器。

同步任务会放在 主线程执行栈 中，异步任务相关回调函数添加到任务队列中（任务队列也称为消息队列）

#### 执行机制

1. 先执执行栈中的同步任务。
2. 异步任务（回调函数）放入任务队列中。
3. 同步任务执行完，会按次序读取任务队列中的异步任务，进入执行栈，开始执行。

### 窗口通讯

- 发送消息使用：`window.postMessage`
- 接受消息使用：`message`

#### `postMessage()`

postMessage 方法允许非同源的脚本采用异步方式进行有效的通信，可以实现跨文档，多窗口，跨域消息传递。

```typescript
otherWindow.postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
```

otherWindow 可以是：

- 其他窗口的引用
- iframe 的 `contentWindow`
- `window.open` 返回的窗口对象
- 命名过或数值索引的 `window.frames`

message：通信的内容。任何类型的数据

targetOrigin：指定哪些窗口能接收到消息事件，可以是字符串、\*、URI。

会发送 `MessageEvent` 类型的消息

```typescript
interface MessageEventInit<T = any> extends EventInit {
  data?: T;
  lastEventId?: string;
  origin?: string; // 消息发送方窗口的 origin
  ports?: MessagePort[];
  source?: MessageEventSource | null; // 发送方窗口对象的引用，可以通过这个来达到两个窗口之间建立双向通信
}
```

#### window.onmessage、message

接收消息。

```typescript
onmessage: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
```

在接收消息的时候处于安全的考虑，**需要使用 orgin 和 source 属性来检查消息的发送者的身份。**

#### window.top

**返回当前窗口的最顶层窗口对象。**

`window.parent` 返回当前窗口的直接父对象。

如果页面 Father，通过 iframe 的方式，嵌入了 另一个页面 Son。那么对 Son 来说，Son 的 window.top 就是 Father。

#### 示例

main.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>iframe + postMessage 跨域通信 主页面</title>
  </head>
  <body>
    <h1>主页面</h1>
    <iframe id="child" src="http://b.com/iframePage.html"></iframe>
    <div>
      <h2>主页面接收消息区域</h2>
      <span id="message"></span>
    </div>
  </body>
</html>
```

iframePage.html

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>iframe + postMessage 跨域通信 子页面</title>
  </head>
  <body>
    <h2>子页面</h2>
    <div>
      <h3>接收消息区域</h3>
      <span id="message"></span>
    </div>
  </body>
</html>
```

##### 父向子发送消息

main.html

```html
<script>
  const iframe2 = document
    .getElementById('child')
    .contentWindow.postMessage('主页面给 iframe 发送了一些数据', 'http://b.com/iframePage.html');
</script>
```

子页面接收消息：iframePage.html

```html
<script>
  window.addEventListener('message', event => {
    console.log('iframePage 收到了'，event.origin, event.message);
  })
</script>
```

##### 子向父发送消息

iframePage.html

```html
<script>
  window.top.postMessage('子页面收到了消息', 'http://a.com/main.html');
</script>
```

## 五个主要对象

### doucument

### location

用于 URL 相关的操作。

| 属性和方法           | 作用                                               |
| -------------------- | -------------------------------------------------- |
| `location.href`      | 获取当前页面的 url 或者跳转到新的 url              |
| `location.hostname`  | 获取 url 中主机部分                                |
| `location.pathname`  | 获取 url 中路径部分                                |
| `location.search`    | 返回参数                                           |
| `location.hash`      | 返回 #后面内容 常用于锚点链接                      |
| `location.assign()`  | 跟 href 一样，跳转页面。记录浏览历史，可以后退页面 |
| `location.replace()` | 替换当前页面，不记录浏览历史，所以不能后退         |
| `location.reload()`  | 刷新当前页面                                       |

### histroy

| 属性                                   | 作用     |
| -------------------------------------- | -------- |
| `history.back()`                       | 后退 <-  |
| `history.forward()`                    | 前进 ->  |
| `history.go(number)`                   | 任意跳转 |
| `history.pushState(data,title,url)`    | 手动添加 |
| `history.replaceState(data,title,url)` | 手动替换 |

### navigator

用户浏览器相关的信息

| 属性                                                    | 作用                           |
| ------------------------------------------------------- | ------------------------------ |
| `navigator.userAgent`                                   | 版本信息，（操作系统，浏览器） |
| `navigator.geolocation.getCurrentPosition(console.log)` | 设备地理位置                   |
| `navigator.clipboard()`                                 | 获取系统剪切板                 |

### screen

用户屏幕相关的信息

| 属性            | 作用     |
| --------------- | -------- |
| `screen.width`  | 屏幕宽度 |
| `screen.height` | 屏幕高度 |
|                 |          |

## PC 元素坐标和大小

### 元素偏移量 offset 系列

- 返回的数值都不带单位

| 属性                   | 作用                                                            |
| ---------------------- | --------------------------------------------------------------- |
| `element.offsetWidth`  | 返回自身包括 padding、边框、内容区的宽度                        |
| `element.offsetTop`    | 返回元素相对带有定位的父级元素上方的偏移                        |
| `element.offsetParent` | 返回作为该元素带有定位的父级元素，如有父级都没有定位则返回 body |
| `element.offsetHeight` | 返回自身包括 padding、边框、内容区的高度                        |
| `element.offsetLeft`   | 返回元素相对带有定位的父级元素左边的偏移                        |

offset 与 style 区别

### client 系列

获取内容的大小。不包含 border, margin

| 属性                  | 作用                                             |
| --------------------- | ------------------------------------------------ |
| `element.clientWidth` | 获取元素的内部宽度 clientWidth = width + padding |

### scroll 系列

获取内容+溢出内容的大小，不包含 border

| 属性                  | 作用                                                    |
| --------------------- | ------------------------------------------------------- |
| `element.scrollTop`   | 用来获取或者设置垂直滚动条滚动的距离                    |
| `element.scrollWidth` | 用来获取内容+溢出内容的大小，不包含 border 。只读属性。 |

### 一些方法

#### getBoundingClientRect

方法返回元素的大小及其相对于视口的位置
