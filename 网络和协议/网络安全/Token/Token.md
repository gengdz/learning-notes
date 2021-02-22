# Token
令牌



## 工作原理
用户访问后台之后，后台会生成一个 Token，存储在如 Redis 中，然后在响应的时候，会带上我们生成的 Token。
用户在下次请求的时候，会自动携带 Token, 我们就拿出 Reids 中的 Token 和这个 Token 进行比较，进行验证。 
如果没过期，那么我们就把过期时间重置一下



## 代码中的体现
> ⚠️ 下面是伪代码

服务端代码
```java
// 生成 Token
String token = UUID.randomUUID() + '';

// 存储到 Redis 数据库中
Redis.setValue(token, user, 「存储时间」)

```
这样客户端访问之后，就会把 Cookie 写到浏览器中。


```java
// 获取 Token
Redis.getValue(token);
```


前端代码
```javascript
// 取 Token
const token  = localStorage.getItem('token');


// 在请求头中带上 Token
headers: {
  token,
}


```


