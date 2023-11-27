# p-memoize
这个库可以用来缓存 http 请求


## 用法如下
```javascript
import pMem from 'p-memoize';

const memoGet = pMem(get, {
  maxAge: 3600000, // 1h
});
```