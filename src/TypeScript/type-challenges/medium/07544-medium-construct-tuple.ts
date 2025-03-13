/*
  7544 - Construct Tuple
  -------
  by Lo (@LoTwT) #中等 #tuple

  ### 题目

  构造一个给定长度的元组。

  例如

  ```ts
  type result = ConstructTuple<2> // 期望得到 [unknown, unkonwn]
  ```

  > 在 Github 上查看：https://tsch.js.org/7544/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ConstructTuple<
  L extends number,
  Result extends unknown[] = [],
> = Result['length'] extends L
  ? Result
  : ConstructTuple<L, [...Result, unknown]>;

type ConstructTuple1<
  L extends number,
  Output extends string = `${L}`,
> = Output extends `${infer Prefix extends string}${keyof N}`
  ? N<
      ConstructTuple1<L, Prefix>
    >[Output extends `${Prefix}${infer D extends keyof N}` ? D : never]
  : [];

type N<T extends unknown[] = []> = {
  '0': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T];
  '1': [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, unknown];
  '2': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
  ];
  '3': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
  ];
  '4': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
  '5': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
  '6': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
  '7': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
  '8': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
  '9': [
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    ...T,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown,
  ];
};

// 有一个降低循环次数的思路：9999  =
// type a = ConstructTuple<1000>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/7544/answer/zh-CN
  > 查看解答： https://tsch.js.org/7544/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
