# Promise 用法介绍

## 为什么有 Promise？
Promise 是为了解决异步函数**回调地狱**的问题，可以让异步函数和同步函数一样按照同步的顺序去书写



## Promise 的概念理解
* Promise 是一个构造函数
* Promise 容器，一旦创建就自动执行
* Promise 本身不是异步，但内部往往封装了一个异步任务（如果是同步的，那么为什么要用 Promise 呢）
* 当异步成功了，则 resolve(data)，当异步失败了 reject(err)
* 真正有用的是我们 resolve 一个 Promise 对象，然后采用 .then 的方式，实现链式调用
* 当 return 一个 Promise 对象的时候，后续 .then 方法的第一个参数将作为 p2 的 resolve 方法，第二个函数作为 reject 方法，一般我们第二个参数写，然后采用 .catch 的方法处理


## 场景
```javascript
const p1 = Promise.reject(new Error())
console.log('aaaa')
// 上面写法，浏览器会报错：Uncaught (in promise) Error。但是程序就正常往下执行，aaaa 会被打印
const p2 = Promise.reject(new Error())
p2.catch(e => {console.log('这个错误不用处理')})
console.log('bbbb')

```

# Promise 代码示例
 求：实现读取三个文件,顺序为 a -> b -> c 

 析：文件读取是异步操作。为了保证顺序，我们这里采用 Promise 的方式

``javascript
onst fs = require('fs')

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




## Promise 进阶用法

### Promise.all()
使用场景：读取多个文件，全部读取成功的时候才执行成功的操作，只要有一个读取失败就执行失败的操作。

语法：`const  p =  Promise.all([p1, p2, p3])`

返回值：
* **都 resolve 的时候，返回 p1, p2, p3 返回值组成的数组，这个返回是有序的**
* **如果有一个没 resolve，但是有自己的 catch 方法，这时候，执行完自己 catch 方法之后也就变成了 resolve，同样返回数组**
* **如果有任意一个没 resolve 的时候并且没 resolve 的这个没有自己的 catch 方法，就会调用P romise.all() 的 catch()，这时候的返回值就是 Error 对象**

注意：
如果作为参数的 Promise 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法。

代码演示：

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

// 1. 三个都成功，这时候返回 每一个 Promise 的返回值组成的数组。
// 返回值为： ['aa', 'bb', 'cc']
// const pa = pReadFile('../a.txt').then(data => data).catch(() => console.log('a出错了'))
// const pb = pReadFile('../b.txt').then(data => data).catch(() => console.log('b出错了'))
// const pc = pReadFile('../c.txt').then(data => data).catch(() => console.log('c出错了'))

// 2. 有任何一个失败，但是失败的那个有自己的catch方法, 这个时候执行完自己的catch方法后也变成了resolved状态
// 返回值：[aa,undefined,err对象]
// const pa = pReadFile('../a.txt').then(data => data).catch(() => console.log('a出错了'))
// const pb = pReadFile('../bb.txt').then(data => data).catch(() => console.log('b出错了'))
// const pc = pReadFile('../cc.txt').then(data => data).catch(err=>err)

// 3.有任何一个失败，同时失败的那个没自己的catch方法，这时候就会执行promise.all()的catch方法,
// 这时候不会返回数组了。直接返回err对象
// 返回值err对象
const pa = pReadFile('../aa.txt').then(data => data)
const pb = pReadFile('../bb.txt').then(data => data)
const pc = pReadFile('../c.txt').then(data => data).catch(err=>err)

const p = Promise.all([pa, pb, pc])

p.then(data => console.log(data))
  .catch(err => console.log(`失败了: ${err}`))

```

### Promise.race()
`race` 是竞速赛跑的意思。跑赢了就存活，如果没跑赢就会失去机会。
使用场景：读取多个文件，只要有一个文件读取成功了，就返回，不再读取别的文件。如果有文件读取失败，那么直接返回失败信息。

语法：`Promise.reac([p1,p2,p3])`

返回值：
**数组中，哪个 Promise 结果获得的的快就返回那个结果，不管这个结果是成功状态还是失败状态**


使用 Promise.race 封装一个请求超时

```javascript
function requestWithTimeout(promise, waitTime) {
  const timeoutPromise = new Promise((resolve, reject) =>
    setTimeout(() => reject(Error('request timeout')), waitTime)
  );
  return Promise.race([promise, timeoutPromise]);
}

```
