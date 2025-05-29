export {}

function deepClone(obj, map = new WeakMap()) {
}



// 测试对象
const obj = {
  arr: [1, {a: 2}],
  date: new Date(),
  map: new Map([['key', 'value']]),
  symbol: Symbol('test'),
  [Symbol('private')]: 'secret',
  self: null
}
obj.self = obj // 循环引用

// 执行克隆
const cloned = deepClone(obj)

// 验证结果
console.log(cloned !== obj)                  // true
console.log(cloned.arr !== obj.arr)          // true
console.log(cloned.date.getTime() === obj.date.getTime()) // true
console.log(cloned.self === cloned)          // true


obj.arr.push(3);

console.log('obj--->',obj)
console.log('cloned--->',cloned)
