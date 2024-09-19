# CSRF

CSRF，即 Cross-Site Request Forgery，中文是：跨站请求伪造。

攻击者诱导受害者进入第三方网站，在第三方网站中向被攻击网站发送跨站请求。利用受害者在被攻击网站取得的登录凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

攻击者在一定的攻击条件下，利用受害者的身份，向服务器发起恶意请求，服务器可以正常解析并返回正确结果

它可以做的事情：

- 如果盗用了淘宝的身份，那么攻击者就可以给自己下单
- 如果盗用了掘金的身份，就可以删除你的文章，或者恶意评论

下面是攻击流程图 ![CSRF 图解](./CSRF图解.jpg)

1. 受害者登录 A，并保留了登录凭证（Cookie)
2. 攻击者诱导受害者访问了 B
3. B 向 A 发送了一个请求：a.com/act=""。 浏览器会默认携带 A 的 Cookie。
4. A 接受到请求后，对其进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
5. A 以受害者的名义执行了 action
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作

CSRF 发生的条件

- 受害者在网站 A 处于登陆状态
- 必须在同一浏览器中打开攻击者提供的链接
- 后台身份验证不严格（例如除 cookie 外无其他验证）

## 几种常见的攻击类型

### GET 类型的 CSRF

```html
<img src="http://127.0.0.34:9001/transfer?to_user=gengdz&money=2000" width="500" heigh="300" />
```

一般诱导用户访问一个含有这个 img 的页面浏览器就会自动发送一次请求

### POST 类型的 CSRF

```html
<form method="POST" action="http://127.0.0.34:9001/transfer" id="form">
  <input type="hidden" name="to_user" value="gengdz" />
  <input type="hidden" name="money" value="2000" />
  <input />
</form>
<script>
  document.getElementById('form').submit();
</script>
```

访问该页面后，表单会自动提交。相当于模拟了一次 POST 请求

### 链接型

```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a
/></a>
```

这种方式相对比较困难，需要用户点击这个链接才可以触发

## CSRF 的特点

1. 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生
2. 攻击者利用受害者在被攻击网站的登录凭证，冒充受害者提交操作。而不是直接窃取数据
3. 整个登录过程并不能获取到受害者的登录凭证，仅仅是 _冒用_
4. 跨站请求可以用各种方式：图片 URL 、超链接、Form 表单提交

## 场景

假如用户登录了某个银行网站，这个时候攻击者在另外一个网站中放置了一个非法链接，当用户打开攻击者网站的时候，会把请求发送到银行网站，因为请求中携带了认证 Cookie，所以服务器认证成功，你的钱就到了攻击者那里。

## 防范措施

### 验证码/图片识别验证

验证码被认为是对抗 CSRF 攻击最简洁而有效的防御方法。

CRSF 攻击往往在用户不知情的情况下构建了网络请求。而验证码会强制用户必须与应用进行交互才能完成最终请求。

但是验证码不能太多，不然用户体验太差，所以只是一种辅助手段

### Referer Check

HTTP 协议中，有个请求头字段为：Referer，它记录了 HTTP 请求的来源地址。我们可以通过检查 Referer 来确保是合法的源

比如：用户要删除自己的帖子，那么先需要登陆 `www.c.com`，然后找到对应的页面发起请求。此时 Referer 为 `www.c.com`；当请求是从别的网址比如：`www.a.com`，这时候我们就可以判断这有可能是一个非法请求。

但是这样不可靠，通过如下方式可以修改设置

```html
<img src="http://bank.example/withdraw?amount=10000&for=hacker" referrerpolicy="no-referrer" />
```

### 添加 Token 验证

步骤：

1. 登陆时，服务端会生成一个 token（随机字符串），服务端做两件事情
   - 把这个 token 放在自己的 session 中
   - 把这个 token 放在 html 的一个隐藏的 input 标签值中；或者放在 全局变量 中
2. 客户端取得这个 token，放在 Http 的请求头中。
3. 服务端验证这两个 token 是不是一样的， 如果一样就通过，不一样就说明被修改了。
4. session 结束的时候，要把 token 失效。

token 不是放在 Cookie 中的，就算是也是 httpnoly 类型的 Cookie。

攻击者只能拿到我的 cookie，拿不到我的 Token。

Token 类似于：

> X-XSRF-TOKEN: 123cdd23-43aa-dfa3-sfd2-sdfdfgsdf2

这种 Token 的值通常是使用 UserID、时间戳和随机数，通过加密的方法生成。

问题是：需要在每个接口中以参数的形式加入这样的 Token

Q:Token 前端存储在哪里？在哪里使用这个 Token?

一般加在请求头中。

### 禁用第三方 Cookie

SameSite 是一种 Cookie 属性，用于增强 Web 应用程序的安全性，防止 CSRF 攻击。

设置 SameSite=Strict 会禁用第三方 cookie，这样就不会影响 CSRF。

使用 HTTP 头

```bash
Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly

```
