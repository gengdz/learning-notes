
/**
 * @param fn 需要 curry 的函数
 * 
 * 重点解释下： bind: 
 *  作用是： 改变函数执行时的this指向。
 *  核心理念是：借用方法
 *  只有函数才有bind
 *  bind会返回一个函数
 *  如果 `thisArg` 是 `null` 或者 `undefined`, 执行作用域的 `this` 将被视为新函数的 `thisArg` 
 * 
 * 代码执行过程如下：
 *  这里当使用的时候。 fn 便已经给出了。看 curriedSum。
 *  然后 再调用 `curriedSum(1)` 的时候。相当于 给了 args 一个 [1],参数长度不够，那么将返回一个函数，const cur1 = curry(fn.bind(undefined, 1)) 。
 *  这时候 fn = fn.bind(undefined, 1); fn.length === 2 。(注意，fn已经变啦！！！！！！)
 *  然后我们又给了一个参数 2。 也就是 curriedSum(1)(2)。相当于 相当于 给了 args 一个 [2],参数长度不够，那么将返回一个函数，const cur2 = curry(fn.bind(undefined, 2)) 。
 *  这时候 fn = fn.bind(undefined, 2); fn.length === 1。(注意，fn已经变了！！！！！！)
 *  然后我们又给了一个参数 3。 也就是 curriedSum(1)(2)(3)。相当于 相当于 给了 args 一个 [3],参数长度够了，那么将执行这个函数 fn(3); 
 * 结束
 * 
 * 这里要注意主要知识点：
 * 1. 递归的时候 fn 会 随着每次 函数执行的时候变化，它不是不变的。
 * 2. const bindFn =  fn.bind(undefined, ...args) bindFn是一个函数，这个函数的长度为 fn.length - args.length
 */
const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : curry(fn.bind(undefined, ...args));


const sum = (a, b, c) => a + b + c;

const bindSum1 = sum.bind(undefined, 1);
const bindSum2 = bindSum1.bind(undefined, 2);
console.log('bindSum111的长度是：', bindSum1.length);
console.log('bindSum222的长度是：', bindSum2.length);
const curriedSum = curry(sum);
// curriedSum(100, 200);
// curriedSum(1)(2)
// console.log(curriedSum(100, 200))
// console.log(curriedSum(1)(2))
console.log(curriedSum(1)(2, 3))
// const curriedTwo = curriedSum(1)(2)
// curriedTwo(100)
// console.log(curriedTwo, curriedTwo(20)); // 23
