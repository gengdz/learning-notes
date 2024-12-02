/*
  34007 - Compare Array Length
  -------
  by alviner (@ScriptBloom) #中等 #recursion #array

  ### 题目

  Implement `CompareArrayLength` to compare two array length(T & U).

  If length of T array is greater than U, return 1;
  If length of U array is greater than T, return -1;
  If length of T array is equal to U, return 0.

  > 在 Github 上查看：https://tsch.js.org/34007/zh-CN
*/

/* _____________ 你的代码 _____________ */

type CompareArrayLength<T extends any[], U extends any[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/34007/answer/zh-CN
  > 查看解答： https://tsch.js.org/34007/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
