# Token



## JWT（json web token)
JWT 会包含 3 部分内容
**header + payload + signature**
eyJhbGciO .eyJuSass.Uim-Mix 

首先 header 的签名使用了 加密算法，例如
```json
{
  "alg": "HS256", // RS512 加密方式
  "typ": "JWT"
}
```

payload 可以使用标准字段，也可以使用自定义字段。例如
```json
{
  "iss": "签发人",
  "isAdmin": true, // 自定义字段
}
```
payload 字段最终会以 base64 的形式来传输，所以里面不能存在敏感的信息


根据头部声明的加密方式，将 header 以及 payload base64 之后进行拼接，使用服务端的密钥进行加密，最终将这 3 段拼接成 JWT Token 21


用户登录之后，使用密钥生成 JWT token，客户端的 JS 代码拿到返回内容之后，将 token 进行存储，一般放在 localStorage 中，当用户再次发起请求时，JS 会主动把 token 放在请求头中，例如这样
```bash
Authorization: Bearer eyJhbG...
```

假如我们使用的是 RSA 算法（非对称加密），任何有公钥的服务器都能验证签名的合法性，如果合法，则认为 payload 内容可以信任，不需要进入额外的数据库来存储 Session，就可以共享状态

如果使用 Session 通常会增加一个 **HttpOnly** 的属性，也就是说 JS 是无法获取 SessionId 的。
但是如果我们将 token 放在 localStorage 中，一旦发生了 XSS（跨站脚本攻击），则可以取到用户登录后的 token，来模拟用户登录进行攻击，同时，只要客户端的 JWT token 没有过期，我们并没有办法将某个 JWT token 设置过期，除非向 Session 一样引入一个中心的数据库，来反向维护 token 黑名单 