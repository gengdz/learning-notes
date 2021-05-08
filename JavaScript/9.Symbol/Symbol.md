# Symbol
可以理解为一串永不重复的标示

基本语法
```javascript
const symbol = Symbol();
```


## 描述参数
`symbol.description`
```javascript
const symbol = Symbol('Symbol的描述');

symbol.description // Symbol的描述

```


## Symbol.for()，Symbol.keyFor()
使用 `Symbol.for(description)` 也可以定义一个 Symbol，区别是它会根据 description 来记录 Symbol，如果已经存在了，那么那么再定义一个一样的，则比较结果为真

```javascript
const symbolFor = Symbol.for('gdz');
const cn = Symbol.for('gdz');

symbolFor === cn // true
Symbol.keyFor(cn) // gdz

```


## 对象属性
```javascript
const zsSymbol = Symbol("张三");

const data1 = {
  [zsSymbol]: '张三',
}
console.log('data1', data1[zsSymbol])
```


```javascript
const user1 = {
  name: '李四',
  key: Symbol(),
}
const user2 = {
  name: '李四',
  key: Symbol(),
}

const grade = {
  [user1.key]: { js: 100, css: 89 },
  [user2.key]: { js: 100, css: 89 }
}

console.log('grade', grade[user1.key])
```


