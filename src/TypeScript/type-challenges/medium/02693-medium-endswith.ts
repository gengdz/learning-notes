/*
  2693 - EndsWith
  -------
  by jiangshan (@jiangshanmeta) #中等 #template-literal

  ### 题目

  实现`EndsWith<T, U>`,接收两个string类型参数,然后判断`T`是否以`U`结尾,根据结果返回`true`或`false`

  例如:

  ```typescript
  type a = EndsWith<'abc', 'bc'> // expected to be true
  type b = EndsWith<'abc', 'abc'> // expected to be true
  type c = EndsWith<'abc', 'd'> // expected to be false
  ```

  > 在 Github 上查看：https://tsch.js.org/2693/zh-CN
*/

/* _____________ 你的代码 _____________ */

type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
  Expect<Equal<EndsWith<'abc', ' '>, false>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2693/answer/zh-CN
  > 查看解答： https://tsch.js.org/2693/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
