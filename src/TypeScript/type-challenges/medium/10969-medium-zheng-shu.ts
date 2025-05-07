/*
  10969 - 整数
  -------
  by HuaBing (@hbcraft) #中等 #template-literal

  ### 题目

  请完成类型 `Integer<T>`，类型 `T` 继承于 `number`，如果 `T` 是一个整数则返回它，否则返回 `never`。

  > 在 Github 上查看：https://tsch.js.org/10969/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Integer<T extends number> = number extends T
  ? never
  : `${T}` extends `${any}.${any}`
    ? never
    : T;

// type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

let x = 1;
let y = 1 as const;

type a = Integer<typeof x>;
type b = Integer<1>;

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.0>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/10969/answer/zh-CN
  > 查看解答： https://tsch.js.org/10969/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
