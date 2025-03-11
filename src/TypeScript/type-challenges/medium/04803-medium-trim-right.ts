/*
  4803 - Trim Right
  -------
  by Yugang Cao (@Talljack) #中等 #template-literal

  ### 题目

  实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

  例如

  ```ts
  type Trimed = TrimRight<'  Hello World  '> // 应推导出 '  Hello World'
  ```

  > 在 Github 上查看：https://tsch.js.org/4803/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Space = ' ' | '\n' | '\t';

type TrimRight<S extends string> = S extends `${infer Left}${Space}`
  ? TrimRight<Left>
  : S;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4803/answer/zh-CN
  > 查看解答： https://tsch.js.org/4803/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
