export {};
/**
 * LRU：Least Recently Used
 * 最新最少使用
 *
 */
class LRUCache {
  private capacity: number;
  private cache: Map<unknown, unknown>;
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
}

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
