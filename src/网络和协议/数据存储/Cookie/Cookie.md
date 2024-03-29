# Cookie
HTTP 协议是无状态的，也就是说它不知道访问当前内容的用户身份，这种情况在原始时代还行，但是随着前端的不断发展，我们需要识别到当前用户，这样我们才能对当前用户进行管理，比如是否是会员，比如这是谁的购物车，比如能否打开一些内容，等等。
这时候，Cookie 的方案就产生了。



## 现象
### 购物车
- 没登陆京东买了东西，可以加入购物车
- 加入之后，关闭浏览器，再打开京东购物车里面的内容还在
- 关机之后，再打开京东，购物车里面的内容还在

### 邮箱
* 输入密码之后选择十天免密登陆
* 再次打开网站直接进入我的邮箱的首页

### 上述现象说明了什么？
* Cookie 是存放在客户端的
* Cookie 是存在硬盘上的而不是磁盘上的



## Cookie 简介
**Cookie 是一种网络会话状态跟踪的技术**

会话是由一组请求和响应组成，围绕着一个相关事情发起的请求和响应，这些请求和响应之间一定是需要数据的传递，而 HTTP 协议是一种无状态协议，在不同的请求之间是不能进行数据传递的，此时就需要一种**可以进行请求间数据传递的会话跟踪技术**，而 Cookie 就是这么一种技术。

Cookie 是由服务端生成，保存在客户端的一种信息载体。载体存放着用户访问该站点的会话状态信息。

用户在提交第一次请求后，由服务端生成 Cookie，并将其封装在响应头中，以响应的形式发送给客户端，客户端收到响应之后，就会把 **Cookie 保存到客户端**。当客户端再次发送 **同类请求** 后，在请求中会携带 Cookie，发送到服务器，由服务端对会话进行跟踪。

同类请求
* url 由两部分组成，资源路径 + 资源名称
* 资源路径相同的称为同类请求



**Cookie 由若干键值对构成。key 和 value 都是 String 类型的**
**Cookie 只有 4KB 左右**
**Cookie 是不可跨域的**：每个 Cookie 会绑定单一的域名，无法在别的域获取使用，一级域名和二级域名之间是允许共享使用的。（靠的是 domain)



## Cookie 的重要属性

| 属性       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| name=value | 键值对，设置 Cookie 的名称以及对应的值，都必须是**字符串类型** |
| domain     | 指定 Cookie 所属域名。默认是当前域名                         |
| path       | 指定 Cookie 在哪个路径（路由）下生效，默认是 `/`             |
| maxAge     | Cookie 失效时间，单位是秒。默认是 -1<br/>如果为正数，则 Cookie 在 maxAge 秒后失效。<br/>如果为负数表示：该 Cookie 为临时 Cookie，关闭浏览器即失效，浏览器不会以任何形式保存该 Cookie。<br/>如果是 0 表示 删除该 Cookie |
| expires    | 在设置的某个时间后失效                                       |
| secure     | 如果是 true 表示在 HTTPS 中才有效，在 HTTP 中无效            |
| httpOnly   | 表示无法通过 JS 脚本读取到该 Cookie。但是还是能通过 Application 中去手动更改 Cookie |



## 代码中的体现

### 服务端代码
```java
// 设置 Cookie
response.setCookie('userId', 'abcsdff', 「过期时间」, 「可以看到 Cookie 的路径」);
```
这样客户端访问之后，就会把 Cookie 写到浏览器中。
Cookie 可以设置过期时间。上述示例「购物车」中，就是因为 Cookie 设置了过期时间。所以还可以看到

```java
// 获取 Cookie
request.getCookie();
```


### 前端代码
```javascript
// 获取 cookie
const cookie = document.cookie;

// 设置 cookie
document.cookie = "userName=gengdezhou;path=/"
```

当我们在客户端写入数据时，客户端会自动的在请求的时候把 Cookie 值带上。


## Cookie 存在的问题
* 不安全。存储在客户端，容易被篡改或者窃取
* 每次发送请求都携带大量的 Cookie 带宽吃不消
* Cookie 只能存储 4kb 的内容
* Cookie 无法跨域
* 移动端对 Cookie 的支持不是很好，而 Session 需要基于 Cookie 实现，所以移动端常用的是 Token
