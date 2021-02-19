# Koa基础知识

## 什么是Koa？

Koa是下一代node的web开发框架，他封装了node中自带的http模块。改进了Express

## Koa配合使用的包(应用级中间件)

* koa-router --> 处理路由，增强koa路由分发能力
* koa-bodyparser 用来解析post请求的body

## Koa使用示例

```javascript
// app.js
const Koa  = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')

const db = require('./config/db')
const shooping = require('./routes/shooping')

// 实例化
const app = new Koa()
const router = new Router()

// 连接数据库
db()

// 挂载路由
router.use(shopping)
// 分为多个controller的写法为
// router.use('/shopping',shopping) //--> 表示以shopping开头的路由转发到shopping页面下

// 使用中间件
app.use(bodyparser())

// router.routes() 表示启动路由
// router.allowedMethods() 出错等异常情况下帮你设置response 响应头
app.use(router.routes()).use(router.allowedMethods())

// 监听3000端口，开启服务器
app.listen(3000,() => {
   console.log('购物车node服务启动在了3000端口')
})
、、

```

```javascript
// shopping.js
const Router = require('koa-router')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

const router = new Router()

// 动态路由 :name 表示动态路由,name的值不确定 类比 @PathValiable
router.get('/test/:name/:age', async ctx => {
  // 使用ctx.params的方式获取 -->值为：{ name: 'gengdz', age: '25' }
  console.log(ctx.params)
  ctx.status = 200
  ctx.body = { statusMessage: 'shopping works' }
})

// post请求方法示例
router.post('/addToCart', async (ctx, next) => {
  const postParam = ctx.request.body
  const isExist = await Cart.findById(postParam.pid)
  if (isExist) {
    // 执行修改动作
    await Cart.findByIdAndUpdate(postParam.pid, postParam)
  } else {
    // 执行新增动作
    await new Cart(postParam)
      .save()
      .then(() => {
        return ctx.body = { statusCode: '0', statusMessage: '操作成功' }
      })
      .catch(() => {
        return ctx.body = { statusCode: '1', statusMessage: '新增失败' }
      })
  }
})
```

说明：

* router的第二个异步函数，通常有两个参数组成，(ctx,next)，其中ctx是context，请求上下文的意思。里面是request 和 response 等信息，next是一个函数，作用是调用下游中间件，返回一个带有then 函数的Promise
  * 通过`ctx.querry` 可以拿到get请求的参数
  * 通过`ctx.request.body` 可以拿到post请求中body的参数
* ctx.body 返回数据， 相当于原生中的 res.end('要返回的内容')



## Koa中间件

### 什么是Koa中间件

中间件就是匹配路由之前或者匹配路由完成做的一系列操作，我们就可以把他叫做中间件

### 中间件的功能

* 执行任何代码
* 修改请求和响应对象
* 终结请求-响应循环
* 调用堆栈中的下一个中间件

如果回调函数中没有next参数，那么匹配到第一个就不往下走了。如果写了next()，那么就会继续向下匹配

## Koa中间件的大致分类

* 应用级中间件
* 路由级中间件
* 错误处理中间件
* 第三方中间件

### 应用级中间件

比如要实现调用每个请求之前都打印一下日期。

```javascript
// 没有url,只有一个异步函数，表示匹配每一个地址
app.use(async (ctx, next) => {
  console.log(new Date())
  await next()
})

```

### 路由级中间件

```javascript
// 路由级中间件,匹配到之后将继续向下匹配
router.get('/', async (ctx, next) => {
  console.log(1)
  next()
})
router.get('/', async (ctx, next) => {
  ctx.body = 'hello'
})

```

### 错误级中间件

