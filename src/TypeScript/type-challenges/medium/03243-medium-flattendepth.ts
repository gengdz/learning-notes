/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > 在 Github 上查看：https://tsch.js.org/3243/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type FlattenDepth<T, Depth extends number = 0, R extends any[] = []> = T extends [
//   infer H,
//   ...infer rest,
// ]
//   ? H extends any[]
//     ? FlattenDepth<[...H, ...rest], Depth, R>
//     : FlattenDepth<rest, Depth, [...R, H]>
//   : R;

type FlattenDepth<
  T extends any[], // T 是一个数组类型
  S extends number = 1, // S 是扁平化的深度，默认值为 1
  U extends any[] = [], // U 是一个存储当前深度的数组，默认为空数组
> = U['length'] extends S // 检查当前深度是否达到了指定深度
  ? T // 如果达到指定深度，直接返回 T
  : T extends [infer F, ...infer R] // 如果 T 是一个元组
    ? F extends any[] // 检查元组的第一个元素是否为数组
      ? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>] // 如果是数组，递归扁平化
      : [F, ...FlattenDepth<R, S, U>] // 如果不是数组，将 F 保持在结果中
    : T; // 当 T 不是数组时，直接返回 T

type b<T> = T extends any[] ? T : 2;
type c = b<[1, 2]>;
type a = FlattenDepth<[1, [2, 3]]>;
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/3243/answer/zh-CN
  > 查看解答： https://tsch.js.org/3243/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
