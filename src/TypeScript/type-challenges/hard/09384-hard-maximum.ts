/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #困难 #array

  ### 题目

  ### Description

  Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

  If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

  For example:

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```

  ### Advanced

  Can you implement type `Minimum` inspired by `Maximum`?

  > 在 Github 上查看：https://tsch.js.org/9384/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Maximum<T extends any[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/9384/answer/zh-CN
  > 查看解答： https://tsch.js.org/9384/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
