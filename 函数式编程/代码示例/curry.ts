const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : curry(fn.bind(undefined, ...args));

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
const curriedTwo = curriedSum(1)(2)
console.log(curriedTwo, curriedTwo(20)); // 6

const log = (a, b, c) => {
  console.log(a, b, c);
};
const curriedLog = curry(log);
curriedLog('a')('b')('c'); // a b c
