export {};

const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length ? fn(...args) : curry(fn.bind(undefined, ...args));

const add = (x, y, z) => x + y + z;

//   add.bind(undefined, 1).bind(undefined, 2)(3),

const curriedAdd = curry(add);
// =  (...args) => args.length >= add.length ? add(...args) : curry(add.bind(undefined, ...args));

const curryAdd1 = curriedAdd(1);
// =  (...args) => args.length >= add.length ? add(...args) : curry(add.bind(undefined, ...args)); 给一个参数 1
// curry(add.bind(undefined, 1))
// 实际执行完变为
// (...args) => args.length >= add.bind(undefined, 1).length ? add.bind(undefined, 1)(...args) : curry(add.bind(undefined, 1).bind(undefined, ...args));

// 抽象一下，其实还是 curry 化之后的样子
// (...args) => args.length >= currentFn.length ? currentFn(...args) : curry(currentFn.bind(undefined, ...args));
// 其中 currentFn 是 add.bind(undefined, 1)
//

const curryAdd1Plus2 = curryAdd1(2);
// (...args) => args.length >= add.bind(undefined, 1).length ? add.bind(undefined, 1)(...args) : curry(add.bind(undefined, 1).bind(undefined, ...args)) 给一个参数(2)
// curry(add.bind(undefined, 1).bind(undefined, 2))
// 实际执行完变为
// (...args) => args.length >= add.bind(undefined, 1).bind(undefined, 2).length ? add.bind(undefined, 1).bind(undefined,2)(...args) : curry(add.bind(undefined, 1).bind(undefined,2).bind(undefined, ...args));

// 抽象一下，其实还是 curry 化之后的样子
// (...args) => args.length >= currentFn.length ? currentFn(...args) : curry(currentFn.bind(undefined, ...args));
// 其中 currentFn 是 add.bind(undefined, 1).bind(undefined,2)

const result = curryAdd1Plus2(3);
// (...args) => args.length >= add.bind(undefined, 1).bind(undefined, 2).length ? add.bind(undefined, 1).bind(undefined,2)(...args) : curry(add.bind(undefined, 1).bind(undefined,2).bind(undefined, ...args)); 给一个参数 2
// 实际执行完变为 参数够了
// add.bind(undefined,1).bind(undefined,2)(3)

// // const result = curryAdd(1)(2);
// // const result = curryAdd1(2);
//
console.log('curry--->', result);
