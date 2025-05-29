export {}

function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }

  const type = Object.prototype.toString.call(obj);
  let clone;

  switch (type) {
    case '[object Date]':
      clone = new Date(obj.getTime());
      map.set(obj, clone);
      return clone;

    case '[object Symbol]':
      clone = Symbol(obj.description);
      map.set(obj, clone);
      return clone;

    case '[object Set]':
      clone = new Set();
      map.set(obj, clone);
      obj.forEach((value) => {
        clone.add(deepClone(value, map));
      });
      return clone;

    case '[object Map]':
      clone = new Map();
      map.set(obj, clone);
      obj.forEach((value, key) => {
        clone.set(deepClone(key, map), deepClone(value, map));
      });
      return clone;

    case '[object Array]':
      clone = [];
      map.set(obj, clone);
      obj.forEach((item) => {
        const v = deepClone(item, map);
        clone.push(v);
      });
      return clone;

    case '[object Object]':
      clone = Object.create(Object.getPrototypeOf(obj));
      map.set(obj, clone);
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = deepClone(obj[key], map);
        }
      }
      Object.getOwnPropertySymbols(obj)
        .filter((sym) => obj.propertyIsEnumerable(sym))
        .forEach((sym) => {
          clone[sym] = deepClone(obj[sym], map);
        });

      return clone;

    default:
      map.set(obj, obj); // 处理循环引用中的自身指向
      return obj;
  }
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
