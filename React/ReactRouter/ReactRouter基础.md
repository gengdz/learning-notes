# ReactRouter 基础

React 是单页面应用。也就是只有一个页面，它是没有路由导航机制的，我们需要这种路由机制，以便在不同的视图之间切换而不用刷新整个页面。所以就有了 ReactRouter



## 路由和前端路由

* 路由是根据不同的 url 地址展示不同的内容或页面
* 前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是服务端根据不同的 url，返回不同的页面。



## 实现原理

两种模式：

1. hash 模式
2. HTML5 history 模式 



### hash 模式

url hash 就是如下

```html
https://segmentfault.com/a/1190000011956628#articleHeader2
```

这种 `#`。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发 `hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。



### HTML history 模式

14年后，因为 HTML5 标准发布。多了两个 API，`pushState` 和 `replaceState`，通过这两个 API 可以改变 url 地址且不会发送请求。同时还有 `onpopstate` 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 url 就不会多出一个 `#`，变得更加美观。但因为没有 `#` 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。



## Link

进行路由跳转。



## Route

路由
如果给定的 path 和当前 location.pathName 匹配就显示，否则不显示



## Switch

Route 的容器组件。负责只匹配一个路由，匹配到就直接返回，防止同时有多个匹配到



## Router

总的容器组件，负责数据的提供。
* 提供 `history` 和 `location`
* 监听和取消监听 `history`，更新 `location`





## 问题

1. react-router 和 react-router-dom 的联系和区别？

2. react-router 里的「 `<Link>` 标签」和 「 `<a>` 标签」有什么区别？

   `<Link>` 标签本质也是 `<a>` 标签。只不过 点击 Link 标签的时候，会阻止 a 标签的默认行为（这样点击完就不会跳转和刷新了）。然后取出 href。使用 history 的方式进行跳转。这样就不会刷新页面了。



