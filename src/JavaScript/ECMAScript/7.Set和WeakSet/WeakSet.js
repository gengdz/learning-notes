const obj1 = {
  name: 'gdz',
  age: 18
};

// const weakSet1 = new WeakSet([obj1, '1']); // 这样会报错 ，必须是对象
// console.log(weakSet1)

const obj2 = {
  ...obj1, name: '张三'
}
const weakSet2 = new WeakSet([obj1, obj2]);
console.log(weakSet2);

weakSet2.