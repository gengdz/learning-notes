/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #中等 #math

  ### 题目

  给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。

  例如:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > 在 Github 上查看：https://tsch.js.org/2257/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ParseInt<T extends string> = T extends `${infer Digit extends number}` ? Digit : never;
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : '';
type RemoveLeadingZeros<S extends string> = S extends '0'
  ? S
  : S extends `${'0'}${infer R}`
    ? RemoveLeadingZeros<R>
    : S;
type InternalMinusOne<S extends string> = S extends `${infer Digit extends number}${infer Rest}`
  ? Digit extends 0
    ? `9${InternalMinusOne<Rest>}`
    : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
  : never;
type MinusOne<T extends number> = ParseInt<
  RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
>;

// 这个太复杂了！！不想看

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2257/answer/zh-CN
  > 查看解答： https://tsch.js.org/2257/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
