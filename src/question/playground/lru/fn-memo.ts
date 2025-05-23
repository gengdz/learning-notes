export {};

// ## 实现函数的 memo。三个参数，1. 原函数。2. 判断是否走缓存的函数。3. 缓存池大小。根据 LRU 进行设置。

function memo(fn, isCacheable, maxSize) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    // 不缓存
    if (maxSize === 0 || !isCacheable(...args)) {
      console.log(`[不缓存] 参数: ${key}, 直接执行原函数`);
      return fn.apply(this, args);
    }

    // 命中了缓存
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      console.log(`[命中缓存] 参数: ${key}, 返回结果: ${value}`);
      return value;
    }

    // 没有命中缓存
    const result = fn.apply(this, args);
    cache.set(key, result);
    console.log(`[未命中缓存] 参数: ${key}, 执行原函数并缓存结果: ${result}`);

    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
      console.log(`[缓存池已满] 删除最久未使用的项: ${firstKey}`);
    }
    return result;
  };
}

const add = (a, b) => a + b;

// 判断函数：所有参数都可缓存
const isCacheable = () => true;

// 创建 memo 函数，缓存池大小为 2
const memoAdd = memo(add, isCacheable, 2);

console.log(memoAdd(1, 2)); // 3（计算）
console.log(memoAdd(1, 2)); // 3（命中缓存）
console.log(memoAdd(2, 3)); // 5（计算）
console.log(memoAdd(3, 4)); // 7（计算，缓存已满，移除 (1,2)）
console.log(memoAdd(1, 2)); // 3（未命中缓存，重新计算）
