const symbol = Symbol('Symbol的描述');
console.log('symbol', symbol.description);

const zsSymbol = Symbol("张三");

const data1 = {
  [zsSymbol]: '张三',
}
console.log('data1', data1[zsSymbol]);



const symbolFor = Symbol.for('gdz');

const cn = Symbol.for('gdz2');
console.log(symbolFor === cn, Symbol.keyFor(cn))

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