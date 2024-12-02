/*
  7544 - Construct Tuple
  -------
  by Lo (@LoTwT) #中等 #tuple

  ### 题目

  构造一个给定长度的元组。

  例如

  ```ts
  type result = ConstructTuple<2> // 期望得到 [unknown, unkonwn]
  ```

  > 在 Github 上查看：https://tsch.js.org/7544/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ConstructTuple<L extends number> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/7544/answer/zh-CN
  > 查看解答： https://tsch.js.org/7544/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
