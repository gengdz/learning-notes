# APIs

## InterSectionObserver

检测一个元素是否与祖先元素或者 viewport 是否相交。viewport 在浏览器中代表网站可见内容的部分。

用法如下：

```typescript
let observer = new IntersectionObserver(callback, {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
});

let target = document.querySelector('#listItem');
observer.observe(target);
```

> root 元素必须是 目标元素 的祖先级元素，
>
> rootMargin 是 root 元素的外边距。用来扩大 root 范围的。
>
> threshold 是交叉度。指交叉了多少的时候触发 callback。0-1 的取值

实例方法：IntersectionObserver 的 disconnect()方法终止对所有目标元素可见性变化的观察。

IntersectionObserver 的 unobserve() 方法命令 IntersectionObserver 停止对一个元素的观察。

可以用来做

- 判断一个元素和另一个元素是否相交
- 下拉刷新
- 上拉加载

## BroadcastChannel

它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档相互通讯。

```typescript
const channel = new BroadcastChannel('channel-name');
channel.postMessage();
channel.onmessage = (event) => {};
```
