/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #中等 #template-literal #infer

  ### 题目

  从字符串中剔除指定字符。

  例如：

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > 在 Github 上查看：https://tsch.js.org/2070/zh-CN
*/

/* _____________ 你的代码 _____________ */

// ✅
// type DropChar<S, C, Result extends string = ''> = S extends `${infer L}${infer R}`
//   ? L extends C
//     ? DropChar<R, C, Result>
//     : DropChar<R, C, `${Result}${L}`>
//   : Result;

// 这个执行不停的使用模式匹配去除 C
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2070/answer/zh-CN
  > 查看解答： https://tsch.js.org/2070/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
