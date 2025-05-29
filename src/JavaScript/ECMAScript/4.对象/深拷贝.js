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

function deepClone1(obj, map = new WeakMap()) {
  // 处理基本类型和null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 判断对象类型
  const type = Object.prototype.toString.call(obj);
  let clone;

  switch (type) {
    case '[object Date]':
      clone = new Date(obj.getTime());
      map.set(obj, clone);
      return clone;

    case '[object RegExp]':
      clone = new RegExp(obj.source, obj.flags);
      clone.lastIndex = obj.lastIndex;
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
      for (let i = 0; i < obj.length; i++) {
        clone[i] = deepClone(obj[i], map);
      }
      return clone;

    case '[object Object]':
      clone = Object.create(Object.getPrototypeOf(obj));
      map.set(obj, clone);
      // 复制可枚举的自有属性（字符串键）
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clone[key] = deepClone(obj[key], map);
        }
      }
      // 复制Symbol类型的自有可枚举属性
      const symbolKeys = Object.getOwnPropertySymbols(obj);
      for (const symKey of symbolKeys) {
        if (obj.propertyIsEnumerable(symKey)) {
          clone[symKey] = deepClone(obj[symKey], map);
        }
      }
      return clone;

    // 其他类型直接返回（如Function、Error等）
    default:
      map.set(obj, obj); // 处理循环引用中的自身指向
      return obj;
  }
}

const data = {
  title: '深拷贝对象',
  dataIndex: 'first',
  componentProps: {
    path: 'user/',
    mode: 'add',
  },
};

const arrayData = [
  {
    label: '前端',
    value: 'front',
  },
  {
    label: '后端',
    value: 'end',
  },
];

// 需要提前知道的知识
console.log('对象的entries方法', JSON.stringify(Object.entries(data), null, 2));
console.log(
  '数组对象的entries方法',
  JSON.stringify(Object.entries(arrayData), null, 2),
);

// 深拷贝能做的事情就是一层层的进行拷贝
function deepCopy(obj) {
  let res = obj instanceof Array ? [] : {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === 'object' ? deepCopy(v) : v;
  }
  return res;
}

const o1 = deepCopy(data);
console.log('深拷贝 o1: ', o1);

data.componentProps.mode = 'edit';
console.log(`修改了data之后的 o1 : ${JSON.stringify(o1, null, 2)}`);

o1.componentProps.path = '修改了o1 的path';
console.log(`修改了o1之后的 data : ${JSON.stringify(data, null, 2)}`);

console.log(o1);

const a1 = deepCopy(arrayData);
const a2 = JSON.parse(JSON.stringify(arrayData));

arrayData[0].label = 'React';
console.log('a1', a1);

a1[1].label = 'Spring Boot';
console.log('arrayData', arrayData);

console.log('a1', a1);
