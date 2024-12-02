/*
  27133 - Square
  -------
  by null (@aswinsvijay) #中等 #tuple #array #math

  ### 题目

  Given a number, your type should return its square.

  > 在 Github 上查看：https://tsch.js.org/27133/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Square<N extends number> = number

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  Expect<Equal<Square<101>, 10201>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/27133/answer/zh-CN
  > 查看解答： https://tsch.js.org/27133/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
