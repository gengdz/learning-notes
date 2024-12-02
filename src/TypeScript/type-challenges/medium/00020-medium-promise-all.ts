/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #中等 #array #promise

  ### 题目

  给函数`PromiseAll`指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为`Promise<T>`，其中`T`是这些 Promise 的结果组成的数组。

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // 应推导出 `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > 在 Github 上查看：https://tsch.js.org/20/zh-CN
*/

/* _____________ 你的代码 _____________ */

// declare function PromiseAll<T extends any[]>(values: T): Promise< T[number] extends Promise<any> ? Awaited<T[number]> : T[number]>

// declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
//   [key in keyof T]: Awaited<T[key]>
// }>

// 如果直接使用 values: T 那么 T 会被推测为 (string | number | Promise<number>)[]
// 如果使用 values: [...T]，那么 T 就是在元组中使用，就会被推断为更具体的每个元素的值
declare function PromiseAll<T extends any[]>(values: [...T]): Promise<{
  [key in keyof T]: Awaited<T[key]>
}>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/20/answer/zh-CN
  > 查看解答： https://tsch.js.org/20/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
