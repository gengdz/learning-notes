# Proxy用法

## 什么是Proxy？

代理，拦截器。外界对该对象的访问都必须先通过 这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

## 语法？
```javascript
const proxy = new Proxy(target, handler);
```


说明：

* target和handler都是一个对象，target是目标对象，handler用来定制拦截行为。

* handler可以拦截的行为有13种，下面列出一部分

  | 行为                                      | 说明                             |    补充             |
  | ----------------------------------------- | -------------------------------|----------------------- |
  | `get(target, propKey, receiver)`        | 拦截对象属性的读取                 |                   |
  | `set(target, propKey, value, receiver)` | 拦截对象属性的设置            |严格模式下set代理如果没有返回true,就会报错|
  | `construct(target, args)`              | 拦截Proxy实例作为构造函数调用的操作<br />比如new proxy(...args) ||
  | `apply (target, ctx, args)`             | 拦截函数的调用                                               ||

  

## 实战

### 实现数组负索引
```typescript
const nth = (list: any[]) => {
  const length = list.length;
  return new Proxy(list, {
    get(target, prop) {
      let key = Number(prop);
      while (key < 0) {
        key += length;
      }
      return target[key];
    }
  });
};
const list = nth([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(list[-1]);
```
### 如何监控一个数组或者对象的值，当值变化的时候打印一句话

使用ES6中的Proxy,对数组的length属性进行监控。

```javascript
// 监听数组的变化
const obj = [1, 2];
const objProxy = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log('调用了 get 方法')
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    console.log(`修改了key: ${propKey},新值: ${value}`)
    target[propKey] = value;
    //严格模式下，set代理如果没有返回true，就会报错。
    return true
  }
})
objProxy.push(20);
// 修改了key: 2,新值: 20
// 修改了key: length,新值: 3
```