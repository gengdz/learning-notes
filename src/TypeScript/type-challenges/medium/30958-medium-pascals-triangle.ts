/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #中等 #array #math

  ### 题目

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > 在 Github 上查看：https://tsch.js.org/30958/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Pascal<N extends number> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/30958/answer/zh-CN
  > 查看解答： https://tsch.js.org/30958/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
