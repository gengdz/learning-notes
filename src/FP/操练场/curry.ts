/**
 * @param fn 需要 curry 的函数
 *
 * 重点解释下： bind:
 *  作用是： 改变函数执行时的this指向。
 *  核心理念是：借用方法
 *  只有函数才有bind
 *  bind会返回一个 新的函数
 *  如果 `thisArg` 是 `null` 或者 `undefined`, 执行作用域的 `this` 将被视为新函数的 `thisArg`
 *
 *
 */
const curry =
  (fn) =>
  (...args) =>
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
console.log(curriedSum(1)(2, 3));
// const curriedTwo = curriedSum(1)(2)
// curriedTwo(100)
// console.log(curriedTwo, curriedTwo(20)); // 23
