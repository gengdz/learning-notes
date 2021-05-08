// 监听数组的变化
const obj = [1, 2];
const objProxy = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log('调用了 get 方法')
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    console.log(`修改了key: ${propKey},新值: ${value}`)
    target[propKey] = value;
    //严格模式下，set代理如果没有返回true，就会报错。
    return true
  }
})
objProxy.push(20);
// 修改了key: 2,新值: 20
// 修改了key: length,新值: 3