/*
  27152 - Triangular number
  -------
  by null (@aswinsvijay) #中等 #tuple #array #math

  ### 题目

  Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

  > 在 Github 上查看：https://tsch.js.org/27152/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Triangular<N extends number> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/27152/answer/zh-CN
  > 查看解答： https://tsch.js.org/27152/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
