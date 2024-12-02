/*
  3062 - Shift
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Implement the type version of ```Array.shift```

  For example

  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```

  > 在 Github 上查看：https://tsch.js.org/3062/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Shift<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/3062/answer/zh-CN
  > 查看解答： https://tsch.js.org/3062/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
