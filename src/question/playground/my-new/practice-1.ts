export {};

const myNew = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
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
