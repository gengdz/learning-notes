# fp-ts 基础



## 几个核心概念

### type
用来表示变量或者参数的类型。就是 TS 中的 type 概念
同属于一个类型的值可以组成一个集合，这个集合包含了这种类型的所有可能值。因此可以用 'is a member of' 来描述值和类型之间的关系。比如 true is a member of boolean;



### type constructor
用来创建类型的。
在 TS 中 type constructor 是用泛型构建的。

`Array` 就是一个 type constructor 。Array 本身不能直接作为某个值的类型使用，它必须接受另外一个 type。

```ts
const arr: Array = [ '1' ]; // 这里会报错，Generic type 'Array<T>' requires 1 type argument(s)

const arr1: Array<string> = ['1']; // 这种正确
```

虽然都是 类型，但是可以看出 `Array` 类型和 `string` 等类型还是有区别。正如值具有类型，类型本身也具有类型，也就是类型的类型，被称为 `kind`。
* string 这种可以作为值的类型使用的类型被称为 `concrete  type`（确定，具体的类型）。它们的 kind 可以用 `*` 表示
* Array 的 kind 表示为：`* -> *`，也就是说必须提供另一个 `concrete type`，才能得到一个可以作为值类型使用的 `concrete type`，这样的类型被称为 `higher-kinded type` 缩写成 `HKT`



### typeclass
类似于接口。
程序员通过指定一组函数名或常量名以及它们各自的类型来定义类型类，对于属于该类的每一种类型，这些函数名或常量名必须存在。

typeclass 可以想象成一个个社团。比如 Eq 社、Show 社。如果想要入社那么就要满足社团的要求。比如: Eq 社要求入社的 type 需要支持判等的操作，也就是必须实现一个 equals 函数，这个函数接受任意两个属于 type 的值 a 和 b，输出一个布尔值。



### instance 
没找到比较好的定义。
我理解就是：类型类规定的函数，我们针对自己的数据结构，给出实现。

```ts
// 这里就是为 number 类型提供了 Ord 的 instance 
// 这里是 number 类型的 Ord 实例
const ordNumDesc: ord.Ord<number> = {
  compare: (a: number) => (b: number) => (a === b ? 0 : a > b ? 1 : -1)
};
```

下面是一些实例。

```ts
export const Pointed: Pointed1<URI> = {
  URI,
  of
}
```



```ts
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}
```



```ts
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}
```



```ts
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}
```



```ts
export const Chain: Chain1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}
```



```ts
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}
```



```ts
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}
```



```ts
export const Traversable: Traversable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}
```




## 导入方式
```ts
// 第一种导入方式
import { option } from 'fp-ts';

// 第二种导入方式
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/function'
```




## 类型模块

### Identity
```ts
const func = flow(
  makUrl,
  ID.bindTo("url"),
  ID.bind(
    "result",
    flow((x) => x.url, requestSync, handleResponse)
  ),
  ID.map(({ url, result }) => `${url}: ${result}`)
);
```

#### `bindTo`
接受两个参数，返回一个对象。 `{ firstParam: second }`。等价于 ramda 中的 `objOf`

```ts
const learnBindTo = ID.bindTo("name")("gengdezhou"); // { name: 'gengdezhou' }

```


#### `bind`
先接收两个参数，再接收一个参数，返回一个对象。
使用这个对象，生成一个值。然后把这个值赋给第一个 key，然后合并成一个对象。
```ts
const learnBind = ID.bind(
  "result",
  flow((x) => x.url, requestSync, handleResponse)
)({ url: "ss" });

learnBind  // { url: "ss", result: "on" }
```




### ReadonlyRecord
用函数式的方式来处理 TS 中的 `Record<K, T>` 类型的数据。

#### `lookup`
查找对象中的某个属性，返回值为 Option 类型。

```ts
const mapToDobule: A1 = (key) => (obj) =>
  pipe(
    obj,
    lookup(key),
    O.map((x) => 2 * x)
  );

```



### Option
包括两种情况的值：`None` 和 `Some`。

#### `Do`
构建一个 Some 类型的空对象
```ts
const a = O.Do // {_tag: "Some", value: {}}
```



#### `apS`
接收一个 key 和一个 Option 值，再接收一个 Option 对象。合并成一个对象。 
```ts
O.apS("age", O.some(18))(O.some({name: 'name'})); // Some({age: 18, name: 'name'})
```



#### `ap`
接收一个包着的值和一个包着的函数，然后把值作用在函数上。
```ts
const apAdd: A3 = (oneKey, twoKey) => (obj) =>
  pipe(
    O.of((x: number) => (y: number) => x + y),
    O.ap(pipe(obj, lookup(oneKey))),
    O.ap(pipe(obj, lookup(twoKey))),
    O.getOrElse(() => 11111)
  );
```


#### `of`
把内容放入 some 函数中。



#### `chain`
函数签名：`<A, B>(f: (a: A) => Option<B>) => (ma: Option<A>) => Option<B>`



### Either
处理错误。
包括两种情况的值：`Right` 和 `Left`。



### Eq
```ts
interface Eq<A> {
  readonly equals: (x:A, y:A) => boolean
}
```

生成实例
```ts
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}
```

除了我们自己写之外，fp-ts 还提供了 组合器。比如 `contramap`





### Ord
```ts
type Ordering = -1 | 0 | 1

interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}
```

说明
* 当且仅当 `compare(x, y) = -1` 时，`x < y`
* 当且仅当 `compare(x, y) = 0` 时，`x = y`
* 当且仅当 `compare(x, y) = 1` 时，`x > y`


#### `fromCompare`
```ts
const ordNumDesc: ord.Ord<number> = {
  compare: (second) => (first) =>
    second === first ? 0 : second > first ? 1 : -1
};

// 和上面的方式等价
const ordNumDesc1: ord.Ord<number> = ord.fromCompare((second) => (first) =>
  second === first ? 0 : second > first ? 1 : -1
);
```



### Semigroup
```ts
interface Semigroup<A> {
  concat: (x: A, y: A) => A
}
```

半群要有 concat 方法：`concat(concat(x, y), z) = concat(x, concat(y, z))`


实现半群 `(number, *)`
```ts
const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}
```


### Monoid
```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

实例
```ts
const monoidSum: Monoid<number> = {
  concat: (x, y) => x + y,
  empty: 0
}

const monoidProduct: Monoid<number> = {
  concat: (x, y) => x * y,
  empty: 1
}

const monoidString: Monoid<string> = {
  concat: (x, y) => x + y,
  empty: ''
}
```



### Category

定义
* 对象就是一个个对象。`string｜number|object`
* 态射就是函数。`f: A -> B`

构成
还有一个 组合 的函数。


```ts
function compose<A, B, C>(g: (b: B) => C, f: (a: A) => B): (a: A) => C {
  return a => g(f(a))
}
```





### Functor
在 Category 的示例中，我们通过组合的方式，连接起了 f 和 g 函数，这里有个前提： fa 的类型 B 和 g 的输入参数 b 的类型 是相等的。如果它们不等我们应该怎么做呢？


* `f: (a: A) => F<B>` 是一个有副作用的函数
* `g: (b: B) => C` 是一个纯函数

解决思路：我们可以对 g 进行 lift 操作使得签名从 `(b: B) => C` 到 `(fb: F<B>) => F<C>`，这样就可以使用一般的方式进行组合了。
一般链路是：`A -> B` -> `B -> C`
现在的链路是：`A -> Fb` -> `Fb -> Fc（也就是 B）` -> `B -> C`

找到一个这样的 lift
```ts
function lift<B, C>(g: (b: B) => C): (fb:Option<B>) => Option<C> {
  return fb => (isNone(fb) ? none : some(g(fb.value)))
}
```

总结下来 lift 的签名如下：
```ts
lift: <A, B>(f: (a: A) => B) => ((fa: F<A>) => F<B>)
```

到目前为止，问题并没有解决完。如果 g 是多个参数的函数，这时候，我们依然无法处理。



### Applicative
在 Funcor 的基础上实现了 `ap` 就是 `Apply`。 在 `Apply` 的基础上实现了 `of` 就是 `Applicative`

```ts
const applicativeOption = {
  map: <A, B>(fa: Option<A>, f: (a: A) => B): Option<B> =>
    isNone(fa) ? none : some(f(fa.value)),
  of: <A>(a: A): Option<A> => some(a),
  ap: <A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> =>
    isNone(fab) ? none : applicativeOption.map(fa, fab.value)
}
```

继续解决上面的问题，如果是多参数，那么需要 把多参数 函数进行进行柯里化操作， 然后再使用 liftAn 的函数进行提升

```ts
import { HKT } from 'fp-ts/HKT'
import { Apply } from 'fp-ts/Apply'

type Curried2<B, C, D> = (b: B) => (c: C) => D

function liftA2<F>(
  F: Apply<F>
): <B, C, D>(g: Curried2<B, C, D>) => Curried2<HKT<F, B>, HKT<F, C>, HKT<F, D>> {
  return g => fb => fc => F.ap(F.map(fb, g), fc)
}

```


通过这样的方式，还有一个问题没有解决，如果