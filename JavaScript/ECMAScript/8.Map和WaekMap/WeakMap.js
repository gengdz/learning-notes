
// const weakMap1 = new WeakMap([[1, 2], [1, 2]]) // 这种会报错，键名必须是对象


const obj1 = {
  name: 'gdz',
  age: 18
}

const obj2 = {
  ...obj1, name: '张三'
}
const weakMap2 = new WeakMap([[obj1, '耿德洲'], [obj2, '张三']]);
console.log(weakMap2)

// weakMap2.

