/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #中等 #tuple

  ### 题目

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > 在 Github 上查看：https://tsch.js.org/4471/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Zip<T extends any[], U extends any[],R extends any[]> = T[number] extends never?

// type Zip<A extends any[], B extends any[], L extends any[] = []> = L['length'] extends
//   | A['length']
//   | B['length']
//   ? L
//   : Zip<A, B, [...L, [A[L['length']], B[L['length']]]]>;

type Zip<T extends any[], U extends any[]> = [T, U] extends [
  [infer L, ...infer RestT],
  [infer R, ...infer RestU],
]
  ? [[L, R], ...Zip<RestT, RestU>]
  : [];

type a = Zip<[1, 2], [true, false]>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4471/answer/zh-CN
  > 查看解答： https://tsch.js.org/4471/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
