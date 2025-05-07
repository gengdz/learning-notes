/*
  18142 - All
  -------
  by cutefcc (@cutefcc) #中等 #array

  ### 题目

  Returns true if all elements of the list are equal to the second parameter passed in, false if there are any mismatches.

  For example

  ```ts
  type Test1 = [1, 1, 1]
  type Test2 = [1, 1, 2]

  type Todo = All<Test1, 1> // should be same as true
  type Todo2 = All<Test2, 1> // should be same as false
  ```

  > 在 Github 上查看：https://tsch.js.org/18142/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

// type IsEqual<X,Y> = Equal<X,Y>

type All<T extends any[], K> = T extends [infer Head, ...infer Rest]
  ? IsEqual<Head, K> extends true
    ? All<Rest, K>
    : false
  : true;

type aa = IsEqual<any, unknown>;
type aaa = IsEqual<unknown, any>;
type ax = [any] extends [unknown] ? true : false;
type a = All<[1, 1, 1], 1>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
  Expect<Equal<All<[never], never>, true>>,
  Expect<Equal<All<[any], any>, true>>,
  Expect<Equal<All<[unknown], unknown>, true>>,
  Expect<Equal<All<[any], unknown>, false>>,
  Expect<Equal<All<[unknown], any>, false>>,
  Expect<Equal<All<[1, 1, 2], 1 | 2>, false>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/18142/answer/zh-CN
  > 查看解答： https://tsch.js.org/18142/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
