/*
  9898 - 找出目标数组中只出现过一次的元素
  -------
  by X.Q. Chen (@brenner8023) #中等

  ### 题目

  找出目标数组中只出现过一次的元素。例如：输入[1,2,2,3,3,4,5,6,6,6]，输出[1,4,5]

  > 在 Github 上查看：https://tsch.js.org/9898/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

// 最后两个用例没有通过
// type FindEles<
//   T extends any[],
//   Duplicate extends any[] = [],
//   Result extends any[] = [],
// > = T extends [infer First, ...infer Rest]
//   ? First extends Rest[number]
//     ? FindEles<Rest, [...Duplicate, First], Result>
//     : First extends Duplicate[number]
//       ? FindEles<Rest, Duplicate, Result>
//       : FindEles<Rest, Duplicate, [...Result, First]>
//   : Result;

type IncludesInUnion<U, T> = [U] extends [never]
  ? false
  : U extends T
    ? true
    : false;

type aa = IncludesInUnion<1 | 2 | 3, 2> extends true ? true : false;

type FindEles<
  T extends unknown[],
  Duplicates extends unknown[] = [],
> = T extends [infer Head, ...infer Tail]
  ? IncludesInUnion<Duplicates[number] | Tail[number], Head> extends false
    ? [Head, ...FindEles<Tail, Duplicates>]
    : FindEles<Tail, [...Duplicates, Head]>
  : T;

type a = FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>;
type c = FindEles<[1, 2, number]>;

type b = 1 extends [11, 2, 3, 3][number] ? true : false;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/9898/answer/zh-CN
  > 查看解答： https://tsch.js.org/9898/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
