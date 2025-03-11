/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #中等 #array

  ### 题目

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > 在 Github 上查看：https://tsch.js.org/5153/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsEqual<T, U> = T extends U ? (U extends T ? true : false) : false;

type IndexOf<T, U, Index extends any[] = []> = T extends [
  infer Head,
  ...infer Rest,
]
  ? IsEqual<Head, U> extends true
    ? Index['length']
    : IndexOf<Rest, U, [...Index, 0]>
  : -1;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5153/answer/zh-CN
  > 查看解答： https://tsch.js.org/5153/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
