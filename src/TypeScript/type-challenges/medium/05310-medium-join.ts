/*
  5310 - Join
  -------
  by Pineapple (@Pineapple0919) #中等 #array

  ### 题目

  Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

  ```ts
  type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
  type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
  type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
  type Res3 = Join<["o"], "u">; // expected to be 'o'
  ```

  > 在 Github 上查看：https://tsch.js.org/5310/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 这是我的代码。可以实现，但是不如下面的优雅
type Join1<
  T extends Array<string>,
  U extends string | number = ',',
  Result extends string = '',
> = T extends [infer Head, ...infer Rest]
  ? Join<Rest, U, Result extends '' ? `${Head}` : `${Result}${U}${Head}`>
  : Result;

type Join1<T extends any[], U extends string | number = ','> = T extends [
  infer F,
  ...infer R,
]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${U}${Join<R, U>}`
  : '';

type Join<T extends unknown[], U extends string | number = ','> = T extends [
  infer F extends string,
  ...infer R,
]
  ? R['length'] extends 0
    ? `${F}`
    : `${F}${U}${Join<R, U>}`
  : '';

type a = Join<['a', 'p', 'p', 'l', 'e'], '-'>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
  Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5310/answer/zh-CN
  > 查看解答： https://tsch.js.org/5310/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
