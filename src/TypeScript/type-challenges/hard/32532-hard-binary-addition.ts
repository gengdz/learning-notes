/*
  32532 - Binary Addition
  -------
  by Finley Garton (@finleygn) #困难 #recursion #array

  ### 题目

  Implement `BinaryAdd` to add two binary numbers together. The numbers should not be translated out of binary at any point.

  Note the two inputs will always have the same length.

  > 在 Github 上查看：https://tsch.js.org/32532/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Bit = 1 | 0

type BinaryAdd<A extends Bit[], B extends Bit[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    BinaryAdd<[1], [1]>,
    [1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<[0], [1]>,
    [1]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 1, 0], [0, 0, 1]>,
    [1, 1, 1]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]>,
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  >>,
  Expect<Equal<
    BinaryAdd<[1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 1, 1, 0, 0]>,
    [1, 0, 0, 1, 1, 1, 0, 1, 0]
  >>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/32532/answer/zh-CN
  > 查看解答： https://tsch.js.org/32532/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
