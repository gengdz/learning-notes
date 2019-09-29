# Proxy用法

## 什么是Proxy？

代理，拦截器。外界对该对象的访问都必须先通过 这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

## 语法？

`const proxy = new Proxy(target,handler)`

说明：

* target和handler都是一个对象，target是目标对象，handler用来定制拦截行为。

* handler可以拦截的行为有13种，下面列出一部分

  | 行为                                      | 说明                                                         |
  | ----------------------------------------- | ------------------------------------------------------------ |
  | **get(target, propKey, receiver)**        | 拦截对象属性的读取                                           |
  | **set(target, propKey, value, receiver)** | 拦截对象属性的设置                                           |
  | **construct(target, args)**               | 拦截Proxy实例作为构造函数调用的操作<br />比如new proxy(...args) |
  | **apply (target, ctx, args)**             | 拦截函数的调用                                               |

  



