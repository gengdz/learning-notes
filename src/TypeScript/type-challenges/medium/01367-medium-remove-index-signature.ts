/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #中等 #object-keys

  ### 题目

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > 在 Github 上查看：https://tsch.js.org/1367/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type RemoveIndexSignature<T> = {
//   [P in Exclude<keyof T, 'a'>]: T[P];
// };

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K];
};

// 利用 泛型 + 联合类型 的 分布式特性 简化下面的代码，简化之后就是上面的代码
type RemoveIndexSignature1<T> = {
  [K in keyof T as /* filters out all 'string' keys */
  string extends K
    ? never
    : /* filters out all 'number' keys */
      number extends K
      ? never
      : /* filers out all 'symbol' keys */
        symbol extends K
        ? never
        : K /* all that's left are literal type keys */]: T[K];
};

type e = RemoveIndexSignature<Foo>;
type a = keyof Foo;
type c = Exclude<keyof Foo, ''>;
// const aa: a =

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
  0: string;
};

const foobar = Symbol('foobar');
type FooBar = {
  [key: symbol]: any;
  [foobar](): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/1367/answer/zh-CN
  > 查看解答： https://tsch.js.org/1367/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/
