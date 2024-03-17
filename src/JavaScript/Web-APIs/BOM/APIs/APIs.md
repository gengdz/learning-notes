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
