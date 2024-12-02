/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #地狱 #tuple

  ### 题目

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > 在 Github 上查看：https://tsch.js.org/7561/zh-CN
*/

/* _____________ 你的代码 _____________ */

// M => minuend, S => subtrahend
type Subtract<M extends number, S extends number> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/7561/answer/zh-CN
  > 查看解答： https://tsch.js.org/7561/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
