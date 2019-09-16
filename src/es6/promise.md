# Promise用法介绍

## 为什么有Promise？

Promise是为了解决异步函数**回调地狱**的问题，可以让异步函数和同步函数一样按照同步的顺序去书写

## Promise的概念理解

* Promise是一个构造函数
* 通俗理解是：给别人一个承诺
* Promise容器，一旦创建就自动执行
* Promise本身不是异步，但内部往往封装了一个异步任务(如果是同步的，那么为什么要用Promise呢)
* 当异步成功了，则 resolve(data)，当异步失败了 reject(err)
* 真正有用的是我们 resolve 一个Promise对象，然后采用 .then 的方式，实现链式调用
* 当return一个Promise对象的时候，后续 .then 方法的第一个参数将作为 p2 的 resolve 方法，第二个函数作为 reject 方法，一般我们第二个参数写，然后采用 .catch的方法处理

## Promise代码示例

需求：实现读取三个文件,顺序为 a -> b -> c 

分析：文件读取是异步操作。为了保证顺序，我们这里采用Promise的方式

```javascript
const fs = require('fs')

const pReadFile = url => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

pReadFile('../a.txt')
  .then(data => {
    console.log(data)
    return pReadFile('../b.txt')
  })
  .then(data => {
    console.log(data)
    return pReadFile('../c.txt')
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err))
```

