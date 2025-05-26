export {};

const myNew = () => {
  // 具体实现
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
