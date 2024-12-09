/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #中等 #template-literal #union #tuple

  ### 题目

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > 在 Github 上查看：https://tsch.js.org/3326/zh-CN
*/

/* _____________ 你的代码 _____________ */

// ✅
// type BEM<B extends string, E extends string[], M extends string[]> = E['length'] extends 0
//   ? `${B}--${M[number]}`
//   : M['length'] extends 0
//     ? `${B}__${E[number]}`
//     : `${B}__${E[number]}--${M[number]}`;

// ✅
type BEM<
  B extends string,
  E extends string[],
  M extends string[],
> = `${B}${E['length'] extends 0 ? '' : `__${E[number]}`}${M['length'] extends 0 ? '' : `--${M[number]}`}`;

type a = BEM<'btn', ['price'], []>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>
  >,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/3326/answer/zh-CN
  > 查看解答： https://tsch.js.org/3326/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
