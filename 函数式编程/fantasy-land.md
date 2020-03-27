# fantasy-land

`Fantasy-Land-Specification` 又被称为**代数类型规范**。

fantasy-land规定了通用代数数据结构及其通用方法，可以看作是 js 函数式编程的数据结构规范。该项目规定了通用代数数据结构的互操作性。

## 依赖关系图

![fantasy-land 依赖关系图](../images/fantasy-land dependencies.png)



## 类型签名

### 类型约束 `=>`

`=>` 表示把类型约束为一个特定的接口(interface)

```javascript
sort :: Ord a => [a] -> [a]
// 表示a要实现Ord接口

assertEqual :: (Eq a, Show a) => a -> a -> Assertion

pluck :: Functor f => k → f {k: v} → f v
```



### 方法类型的构造函数 `~>`
什么是方法：当一个函数是一个对象的属性的时，它就被称为方法。方法是作为对象的属性的函数。

`a ~> a -> a` 表示是一个方法，它接受 `a` 类型的参数，并返回一个 `a` 类型的值。

举例说明：

```html
具有Setoid 必须要提供 equals方法
equals:: Setoid a => a ~> a -> Boolean

表示：equal方法，接受一个a类型的参数,返回一个Boolean类型的值。
```



## 代数

代数是遵循一定法则的、具有封闭性的，一系列值及一些列操作的集合。

每个 Fantasy Land代数是一个单独的规范。一个代数可能依赖于其他必须实现的代数。

### Setoid

在数学中，setoid是具有等价关系的集合。

必须要实现`equals`方法。



### Ord

实现 *Ord* 规范的值还必须要实现 *Setoid* 规范。

必须要实现`lte` 方法。



### Semigroupoid

必须要满足结合律 `a.compose(b).compose(c) === a.compose(b.compose(c))`

必须要提供`compose` 组合方法。



### Semigroup

必须要满足结合律 `a.concat(b).concat(c)` 等价于 `a.concat(b.concat(c))` （结合性）

必须要实现`concat`方法。



### Monoid

实现 *Monoid* 规范的值还必须实现 *Semigroup* 规范

必须要实现`empty`方法。



### Group

实现 *Group* 规范的值还必须实现 *Monoid* 规范

还必须实现`invert` 方法。





