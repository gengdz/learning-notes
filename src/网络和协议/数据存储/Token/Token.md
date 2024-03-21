# Token

令牌。

## 原理

1. 服务器只有一个密钥：比如是： `xingya`。
2. 用户名和密码来了之后，会使用加密算法 把用户信息和这个密钥生成一个字符串。
3. 用户下次登陆的时候把这个带上就行。

为什么安全？如果你改了用户名和或者密码，那么服务端根据你提供的用户名和密码新生成的签名和你传过来的不一样，这样就验证身份失败。

原理是：

## Access Token

访问资源接口（API）时说需要的资源凭证

### 简单 Token 的组成

uid（用户唯一的身份标识） 、time（当前时间的时间戳）、sign（数字签名）

### 特点

- 服务端无状态化，可拓展性好
- 支持移动端设备
- 安全
- 支持跨程序调用

### Token 的身份验证流程

![Token 的身份验证流程](./Token 身份验证流程.awebp)

1. 客户端使用用户名及密码登录请求登录
2. 服务端收到请求后去验证用户名和密码
3. 验证成功后，服务端会签发一个 Token，并把这个 Token 签发给客户端
4. 客户端收到 Token 之后，会把它存储起来，一般放在 localStorage 或者 cookie 里面
5. 客户端每次向服务端请求资源的时候会带着服务器签发的 Token
6. 服务端收到请求后去验证客户端请求里面带着的 Token，拿到 Token 之后做解密和签名认证，验证其有效性，如果验证成功就向客户端返回请求的内容

- 每一次请求都需要携带 Token，需要把 Token 放在 HTTP 的 Header 里
- **基于 Token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 Token 数据，用解析 Token 的时间 换取 Session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库**
- Token 完全由应用管理，所以它可以避免同源策略

## Refresh Token

Refresh Token 是专门用来刷新 Access Token 的 Token。

Refresh Token 可以没有。如果没有，只用让用户重新登录刷新 Access Token，有了 Refresh Token 可以减少这个麻烦，客户端直接使用 Refresh Token 去更新 Access Token，无需进行重新登录。

![Refresh Token 的工作流程](./Refresh-Token 的工作流程.awebp)

Access Token 的有效期比较短，当其过期时，使用 Refresh Token 可以获取新的 Access Token，如果 Refresh Token 也失效了，用户只能重新登录了。

Refresh Token 及过期时间是存储在服务器的数据库中，只有在申请新的 Access Token 时才会验证，不会对业务接口响应时间造成影响，也不需要向 Session 一样一直保存在内存中以应对大量的请求。

## Token 和 Session 的区别

## Token 需要考虑的问题

- Token 完全由应用管理，所以它可以避开同源策略
- Token 可以避免 CSRF 攻击（因为不需要 Cookie 了）

## JWT（JSON Web Token)

- 是目前最流行的**跨域认证**解决方案。
- 是一种**认证授权机制**
- JWT 是为了在网络应用环境间**传递声明**而执行的**一种基于 JSON 的开放标准**。
- 可以使用 HMAC 算法或者 RSA 的公/私密钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

## 生成 JWT

[jwt.io](https://jwt.io/)

JWT 会包含 3 部分内容

**header + payload + signature**

eyJhbGciO .eyJuSass.Uim-Mix

### Header

Header 部分是一个 JSON 对象，描述 JWT 的元数据。

首先 header 声明了签名使用的加密算法，例如

```json
{
  "alg": "HS256", // RS512 加密方式
  "typ": "JWT"
}
```

最后会将上面的 JSON 对象使用 Base64URL 算法转成字符串

### Payload

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。 JWT 规定了 7 个官方字段

- iss（issuer）：签发人
- exp（expiration time）：过期时间
- sub（subject）：主题
- aud（audience）：受众
- nbf（not before）：生效时间
- iat（issued At）：签发时间
- jti（JWT ID）：编号

payload 可以使用标准字段，也可以使用自定义字段。例如

```json
{
  "iss": "签发人",
  "isAdmin": true // 自定义字段
}
```

payload 字段最终会以 base64 的形式来传输，所以里面不能存在敏感的信息

这个 JSON 对象也要使用 Base64URL 算法转成字符串

### Signature

Signature 是对前两部分的签名，放置数据篡改。

根据头部声明的加密方式，将 header 以及 payload base64 之后进行拼接，**_使用服务端的密钥进行加密_**，最终将这 3 段拼接成 JWT Token

### JWT 使用

用户登录之后，使用密钥生成 JWT Token，客户端的 JS 代码拿到返回内容之后，将 Token 进行存储，一般放在 localStorage 中，当用户再次发起请求时，JS 会主动把 Token 放在请求头中，例如这样

```bash
Authorization: Bearer <token>
```

假如我们使用的是 RSA 算法（非对称加密），任何有公钥的服务器都能验证签名的合法性，如果合法，则认为 payload 内容可以信任，不需要进入额外的数据库来存储 Session，就可以共享状态

如果使用 Session 通常会增加一个 **HttpOnly** 的属性，也就是说 JS 是无法获取 SessionId 的。

但是如果我们将 Token 放在 localStorage 中，一旦发生了 XSS（跨站脚本攻击），则可以取到用户登录后的 Token，来模拟用户登录进行攻击，同时，只要客户端的 JWT Token 没有过期，我们并没有办法将某个 JWT Token 设置过期，除非向 Session 一样引入一个中心的数据库，来反向维护 Token 黑名单

## Token 和 JWT 的区别

相同点：

### 区别

Token：服务端验证客户端发来的 Token 时，还要查询数据库获取用户的信息，然后验证 Token 是否有效。

JWT：将 Token 和 Payload 加密后存储在客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。
