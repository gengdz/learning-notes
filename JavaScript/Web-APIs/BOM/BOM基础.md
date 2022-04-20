# BOM 基础
英文：Browser Object Model
中文 浏览器对象模型

是对浏览器提供的 API 的统称

BOM 提供的 API 都放在了 window 全局对象中，它代表当前浏览器窗口，DOM 也属于 BOM 的一部分，因为 window 也包括 document 对象

## 常见的 API
### doucument

### 弹窗
* alert。window.alert();
* prompt。winodw.prompt();
    
### 窗口属性
* innerWidth
* innerHeigh
* open
* close


### location 属性
用于 URL 相关的操作。

| 属性                | 作用                                  |
| ------------------- | ------------------------------------- |
| `location.href`     | 获取当前页面的 url 或者跳转到新的 url |
| `location.hostname` | 获取 url 中主机部分                   |
| `location.pathname` | 获取 url 中路径部分                   |
| `location.reload()` | 刷新当前页面                          |


### Histroy 属性

| 属性                                   | 作用     |
| -------------------------------------- | -------- |
| `history.back()`                       | 后退 <-  |
| `history.forward()`                    | 前进 ->  |
| `history.go()`                         | 任意跳转 |
| `history.pushState(data,title,url)`    | 手动添加 |
| `history.replaceState(data,title,url)` | 手动替换 |



### Navigator 属性
用户浏览器相关的信息

| 属性                                                    | 作用         |
| ------------------------------------------------------- | ------------ |
| `navigator.userAgent`                                   |              |
| `navigator.geolocation.getCurrentPosition(console.log)` | 设备地理位置 |
|                                                         |              |



### Screen 属性
用户屏幕相关的信息


| 属性            | 作用     |
| --------------- | -------- |
| `screen.width`  | 屏幕宽度 |
| `screen.height` | 屏幕高度 |
|                 |          |



## window.postMessage
postMessage 方法允许非同源的脚本采用异步方式进行有效的通信，可以实现跨文档，多窗口，跨域消息传递。

```typescript
otherWindow.postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
```
otherWindow 可以是：
* 其他窗口的引用
* iframe 的 `contentWindow` 
* `window.open` 返回的窗口对象
* 命名过或数值索引的 `window.frames`

message：通信的内容。任何类型的数据

targetOrigin：指定哪些窗口能接收到消息事件，可以是字符串、*、URI。

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

## window.onmessage、message
接收消息。

```typescript
onmessage: ((this: WindowEventHandlers, ev: MessageEvent) => any) | null;
```

在接收消息的时候处于安全的考虑，**需要使用 orgin 和 source 属性来检查消息的发送者的身份。** 



## window.top
**返回当前窗口的最顶层窗口对象。**

`window.parent` 返回当前窗口的直接父对象。

如果页面 Father，通过 iframe 的方式，嵌入了 另一个页面 Son。那么对 Son 来说，Son 的 window.top 就是 Father。




## 窗口通讯
main.html

```html
<!DOCTYPE html> 
<html>
<head>
<meta charset="utf-8">
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
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
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



### 父向子发送消息
main.html

```html
<script>
  const iframe2 = document
    .getElementById('child')
    .contentWindow.postMessage('主页面给 iframe 发送了一些数据', 'http://b.com/iframePage.html');
</script>
```

子页面接收消息：
iframePage.html
```html
<script>
    window.addEventListener('message', event => {
      console.log('iframePage 收到了'，event.origin, event.message);
    })
</script>
```


### 子向父发送消息
iframePage.html
```html
<script>
    window.top.postMessage('子页面收到了消息', 'http://a.com/main.html');
</script>
```



## JS 派发事件

```js
window.dispatchEvent(new Event('resize'));
```