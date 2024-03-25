/**
 * LRU：Least Recently Used
 *
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 缓存的容量
    this.cache = new Map(); // 缓存内容，使用Map数据结构
  }

  get(key) {
    if (this.cache.has(key)) {
      // 如果缓存中有key，则将其移动到最近使用的位置（即Map的末尾）
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1; // 如果缓存中没有key，则返回-1
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // 如果缓存中已经存在key，则删除原来的数据
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 如果缓存到达容量上限，则删除最久未使用的数据，即Map的第一项
      const keysIterator = this.cache.keys(); // 获取键的迭代器
      this.cache.delete(keysIterator.next().value); // 删除第一个键对应的项
    }
    this.cache.set(key, value); // 将数据存入缓存
  }
}

// 示例
const cache = new LRUCache(2);

cache.put(1, 1); // 缓存是 {1=1}
cache.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(cache.get(1)); // 返回  1
cache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {3=3, 1=1}
console.log(cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回  3
console.log(cache.get(4)); // 返回  4

// 示例
const cache = new LRUCache(2);

export {};
