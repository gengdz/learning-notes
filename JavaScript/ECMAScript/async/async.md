# async 用法介绍

## 为什么是 async?

* async 的出现是为了解决异步函数 **回调地狱** 的问题
* 采用更形象的语法，async 和 await 来代替 generator 函数和机制
* 更好用的异步处理机制。
  * 调用方式和同步方法相同，直接 `asyncReadFile();`即可调用
  * async ==函数的返回值== 是 Promise 对象，这样可以采用 .then 的方法实现链式调用



## async 的多种使用方式

```javascript
// 箭头函数
const foo = async () => {};

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

```



## 代码示例

需求：实现读取三个文件,顺序为 a -> b -> c 

分析：文件读取是异步操作。为了保证顺序，我们这里采用Promise的方式

* 如果任意一个错误就返回错误(这种应该遇到的比较多)

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
  
  asyncReadFile = async () => {
    let content = 'aa'
    try {
      // const [aaContent, bbContent, ccContent] = await Promise.all([
      //   pReadFile('../a.txt'), pReadFile('../b.txt'), pReadFile('../c.txt')
      // ])
  
      const aaContent = await pReadFile('../a.txt')
      const bbContent = await pReadFile('../b.txt')
      const ccContent = await pReadFile('../cc.txt')
  
      content = `
        a文件的内容：${aaContent}
        b文件的内容：${bbContent}
        c文件的内容：${ccContent}
        `
    } catch (e) {
      console.log('发生了错误')
    }
    return content
  }
  
  // 验证成功 async可以像普通函数一样调用，并且实现异步功能
  asyncReadFile()
  
  // 验证成功 async返回值是promise对象
  asyncReadFile().then(console.log)
  
  //注释掉的代码表示不是继发关系的使用方法(如果不是继发,写在一个 async 里面没意义)
  
  // 打印结果 --> 
  /*
  发生了错误
  aa
  */
  ```

* 如果一个错误了，别的也要继续执行

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
  
  asyncReadFile = async () => {
    const aaContent = await pReadFile('../aa.txt').catch(() => console.log('a文件读取失败'))
    const bbContent = await pReadFile('../bb.txt').catch(() => console.log('b文件读取失败'))
    const ccContent = await pReadFile('../c.txt').catch(() => console.log('c文件读取失败'))
    content = `
    a文件的内容: ${aaContent}
    b文件的内容：${bbContent}
    c文件的内容：${ccContent}
    `
    return content
  }
  
  asyncReadFile().then(console.log)
  
  // 打印结果 --> 
  /*
  
  a文件读取失败
  b文件读取失败
  
    a文件的内容: undefined
    b文件的内容：undefined
    c文件的内容：ccccc
    
  */
  
  ```

  

## await 详解

* 正常情况下, await 后面如果是一个 Promise，则返回该对象的结果。如果不是Promise对象，就直接返回对应的值 (特殊的是，如果 await 对象是一个 thenable 对象<定义了 then 方法的对象>，则视其为 Promise 对象)
*  await 后面的Promise对象如果变成了 *reject* 状态，那么 reject 的参数会被 catch 方法接收到（即便是你的 await 方法前面没写 return），也就是说。如果出错了。那么错误参数一定会被 catch 到
* 任意一个 await 语句后面的Promise对象变成 *reject* 状态，那么 async 函数将中断执行，(后面的 await 不再执行)
* 基于上面的原因，如果有多个 await ，那么最好要使用 `try{} catch(e) {}` 代码结构  将 await 包围住
* 如果多个 await  确实不存在继发关系，那么最好让他们同时触发。否则 async 方法就会执行完一次再执行下一个
  * 使用`const [a,b] = await Promise.all([asyncRead('a.txt'),asyncRead('b.txt') ])`