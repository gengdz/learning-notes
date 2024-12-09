/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #中等 #template-literal #infer #union

  ### 题目

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > 在 Github 上查看：https://tsch.js.org/4260/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type AllCombinations<S, R extends any = ''> = S extends `${infer H}${infer Rest}` ? any : S;

type String2Union<S extends string> = S extends `${infer FirstChar}${infer Rest}`
  ? FirstChar | String2Union<Rest>
  : S;

// TODO 这个依然负责
type AllCombinations<
  S extends string,
  CharUnion extends string = String2Union<S>,
  CurrentChar extends string = CharUnion,
> = CurrentChar extends CurrentChar
  ? `${CurrentChar}${AllCombinations<'', Exclude<CharUnion, CurrentChar>> | ''}`
  : never;

type a<T> = T extends `${infer H}${infer Rest}` ? Rest : never;
type b = a<'a'>;
type c = String2Union<'abc'>;
type d = 'a' | 'b' | 'c' | 'd';
// `a AllCombinations<'', 'b'|'c'>`

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'AB'
      | 'AC'
      | 'BA'
      | 'BC'
      | 'CA'
      | 'CB'
      | 'ABC'
      | 'ACB'
      | 'BAC'
      | 'BCA'
      | 'CAB'
      | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4260/answer/zh-CN
  > 查看解答： https://tsch.js.org/4260/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
