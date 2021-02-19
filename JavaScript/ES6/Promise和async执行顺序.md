# Promise和async执行顺序

## 题目如下：

```javascript
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function() {
    console.log("setTimeout");
}, 0);

async1();

new Promise(function(resolve) {
    console.log("promise1");
    resolve();
    console.log("test")
}).then(function() {
    console.log("promise2");
});

console.log("script end");

script start
async1 start
async2
promise1
test
script end

async1 end
promise2

setTimeout
```

## 总结

1. async总结

   * 看到async不用慌张，它和普通函数的区别是：1. 返回值是promise类型的；2. 里面有await
   * await async2()的执行机制是，(从右向左执行)先执行async2函数，然后看到await会暂定async的执行，让出线程，执行async外面的同步代码。
   * 同步代码执行完之后，回到当前的await，执行下面的同步代码，执行完再执行当前宏任务的其他微任务

2. promise总结

   * promise函数是自执行函数，所以不用调用
   * 看到promise函数不用慌张，先执行里面的同步代码再说
   * promise本身是 **同步的立即执行函数**，then中的方法是异步执行的。

3. 宏任务和微任务

   * 宏任务和微任务都是队列 `宏任务1  | 微任务1 微任务2 微任务3`
   * 一段代码执行时，会先执行宏任务中的同步代码
   * 如果遇到setTimeout之类的宏任务就会把这个setTimeout内部的函数推入到宏任务列表中，下一个轮回再执行
   * 如果执行到promise.then()之类的微任务，就会把这些微任务放入当前宏任务的微任务列表中，等这个宏任务中的同步代码执行完之后，然后依次执行微任务1、微任务2

4. 常见的宏任务和微任务

   | 宏任务                | 微任务                     |
   | --------------------- | -------------------------- |
   | setTimeout            | Promise.then catch finally |
   | setInterval           | process.nextTick           |
   | setImmediate          | `MutationObserver`回调     |
   | requestAnimationFrame |                            |

   

## 知识点分析

1. 事件循环(eventloop)