# localStorage 和 sessionStorage
HTML5 推出了 localStorage 和 sessionStorage.

## 共同点
1. 存储大小都是 5M 左右
2. 都是客户端存储
3. 都有同源策略限制
4. API 一致


## 不同点
### 生命周期不同
* localStorage 是永久存储的，除非人为删除
* sessionStorage 与存储脚本所在标签页的有效期是相同的，一旦窗口关闭或者标签页关闭，那么所有通过 sessionStorage 存储的数据也会被删除。


### 作用域不同
* localStorage 在同一个浏览器内，同源文档之间共享数据，可以相互读取、覆盖
* sessionStorage 作用域被限制在窗口中，也就是说，同一浏览器、同一窗口的同源文档才能共享数据。也就是说你开了两个 tab 页，这两个 tab 页中，sessionStorage 数据是不共享的。


