# APIs

一些资料

- [浏览器提供了这些 API](https://mp.weixin.qq.com/s/nJdlLjl6xlB2Z3myOFkJWw)

## DOMParser

作用是：解析 XML 或 HTML 源代码字符串，并返回一个可操作的 Document 对象。该 Document 对象是一个完整的 DOM 树，可以像处理常规 HTML 元素一样处理。

```ts
export const parseInnerTextFromStr = (str: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  const { innerText } = doc.body;
  return innerText;
};
```

## URL Pattern API

匹配模块包含：URL Pattern API 的模式语法包括：

- 字面字符串：将精确匹配的文本字符串，例如 "/home" 或 "/contact"。
- 通配符：如 "/posts/ " 中的星号 ( ) 表示匹配任何字符序列，直至遇到下一个路径分隔符（/）。
- 命名组：如 "/books/:id" 中的 ":id"，它会提取匹配 URL 中对应部分的值，作为单独的数据项。
- 非捕获组：如 "/books{/old}?"，这里的花括号 {...}? 表示该部分模式是可选的，可以匹配 0 次或 1 次，且不会作为一个单独的数据项提取出来。
- 正则表达式组：如 "/books/(\d+)" 中的 (\d+)，这部分遵循 JavaScript 正则表达式的规则，用于进行复杂匹配，尽管在 URL Pattern API 中有一定的限制。例如，此处的正则表达式将匹配一个或多个数字字符，并将其作为一个独立的数据项提取出来。

```typescript
const pattern = new URLPattern({ pathname: '/books/:id' });
console.log(pattern.test('https://example.com/books/123')); // true
console.log(pattern.exec('https://example.com/books/123').pathname.groups); // { id: '123' }
```

## CSS Custom Highlight API

CSS 自定义高亮 API 提供了一种方法，可以通过使用 JavaScript 创建范围并使用 CSS 定义样式来设置文档中任意文本范围的样式。

## Compression Stream API

内置的压缩

## Cookie Store API

作用是：获取 cookie。 异步的方式获取。

- cookieStore.getAll 获取全部
- cookieStore.delete: 删除
- cookieStore.get: 获取单个 cookie 信息
- cookieStore.set: 设置单个 cookie 信息

```typescript
cookieStore.getAll().then(console.log);

获取到的值为如下类型：

{
    "domain": "alibaba-inc.com",
    "expires": 1716029214741.809,
    "name": "SSO_LANG_V2",
    "partitioned": false,
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "value": "ZH-CN"
}
```

## MutationObserver

Mutation 是突变的意思

MutationObserver 的作用是监听 DOM 变化。可以监听 DOM 节点的新增、删除、属性变化、文本内容变化

```typescript
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = {
  childList: true, // 监听目标节点的子节点的增减
  attributes: true, // 监听属性的变化
  characterData: true, // 监听文本节点内容的变化
  subtree: true, // 监听目标节点以及其子孙节点的变动
  attributeOldValue: true, // 记录变化前的属性值
  characterDataOldValue: true, // 记录变化前的数据
  attributeFilter: ['class', 'style'], // 仅监视 class 和 style 变化
};

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察，一般说来这个放在 callback 中，满足某种条件之后就不观察了。
observer.disconnect();
```

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

```typescript
interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}
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

### 封装一个图片懒加载组件的思路，以及优化方案

- 监听事件防抖节流
- 考虑图片的宽高

```typescript
import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, placeholder, ...props }) => {
  const [imageSrc, setImageSrc] = useState(placeholder || 'placeholder.png');
  const [imageRef, setImageRef] = useState(null);

  // 使用 IntersectionObserver 监听元素进入可视区域
  const onLoad = (entries, observer) => {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        // 图片进入可视区域，加载图片
        setImageSrc(src);
        observer.unobserve(imageRef);
      }
    }
  };

  useEffect(() => {
    let observer;
    if (imageRef && IntersectionObserver) {
      observer = new IntersectionObserver(onLoad, {
        rootMargin: '0px', // 可根据需要设置预加载距离
        threshold: 0.01 // 当 0.01 部分可见时触发回调
      });
      observer.observe(imageRef);
    }
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]); // 仅当 src 或 DOM 引用发生变化时运行 effect

  return <img src={imageSrc} alt={alt} ref={setImageRef} {...props} />;
};

export default LazyImage;

```

## BroadcastChannel

它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档相互通讯。

```typescript
const channel = new BroadcastChannel('channel-name');
channel.postMessage();
channel.onmessage = (event) => {};
```
