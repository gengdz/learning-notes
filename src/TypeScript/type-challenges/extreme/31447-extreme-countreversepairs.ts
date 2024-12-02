/*
  31447 - CountReversePairs
  -------
  by jiangshan (@jiangshanmeta) #地狱

  ### 题目

  Given an integer array nums, return the number of reverse pairs in the array.

  A reverse pair is a pair (i, j) where:

  * 0 <= i < j < nums.length and
  * nums[i] > nums[j].

  > 在 Github 上查看：https://tsch.js.org/31447/zh-CN
*/

/* _____________ 你的代码 _____________ */

type CountReversePairs<T extends number[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountReversePairs<[5, 2, 6, 1]>, 4>>,
  Expect<Equal<CountReversePairs<[1, 2, 3, 4]>, 0>>,
  Expect<Equal<CountReversePairs<[-1, -1]>, 0>>,
  Expect<Equal<CountReversePairs<[-1]>, 0>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/31447/answer/zh-CN
  > 查看解答： https://tsch.js.org/31447/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
