const men = {
  gender: 'man'
}

const obj = {
  name: 'gdz',
  age: 18,
};

console.log(obj.hasOwnProperty('name'))
console.log(obj.hasOwnProperty('name1'));

// 设置 obj 的原型对象（也就是设置它的父类）
Object.setPrototypeOf(obj, men);

console.log(obj.gender) // man 
console.log(obj.hasOwnProperty('gender'));

// 判断 对象 以及 对象的原型 上是否有这个属性
console.log('gender' in obj);
