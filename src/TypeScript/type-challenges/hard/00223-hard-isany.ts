/*
  223 - IsAny
  -------
  by Pavel Glushkov (@pashutk) #困难 #utils

  ### 题目

  Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

  So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.

  > 在 Github 上查看：https://tsch.js.org/223/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsAny<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/223/answer/zh-CN
  > 查看解答： https://tsch.js.org/223/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
