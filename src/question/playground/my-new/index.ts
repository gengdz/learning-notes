export {};

const myNew = (constructor, ...args) => {
  // 原型链继承。是为了继承 构造函数原型上的方法
  const obj = Object.create(constructor.prototype);

  // 上下文绑定。确保 this 指向新对象。如果不这么干，导致 this.color 报错。 TypeError: Cannot set properties of undefined (setting 'color')
  const res = constructor.apply(obj, args);

  // 返回值处理。有可能构造函数直接返回了 对象。
  return res instanceof Object ? res : obj;
};

function Dog(color, name) {
  this.color = color;
  this.name = name;
}

Dog.prototype.getName = function () {
  return this.name;
};

const greyDog = myNew(Dog, 'gred', '小灰');

console.log('mynew', greyDog, greyDog.getName());
