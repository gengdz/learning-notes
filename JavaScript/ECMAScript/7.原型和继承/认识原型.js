const arr = [1, 2, 3];
arr.concat([4, 5, 6]);


// arr 之所以有 concat 这些方法，是因为它的父亲上有这些方法
console.log(arr);
console.log(Object.getPrototypeOf(arr)); // 获取它的原型

const arr1 = ['hello', 'js'];

console.log(Object.getPrototypeOf(arr) === Object.getPrototypeOf(arr1))


// 创建一个没有原型的对象
const obj1 = Object.create(null, {
  name: {
    value: 'gdz'
  }
});

console.log(obj1)