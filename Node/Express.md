# Express

## 是什么？

express 是一个web框架,封装了nodejs中的http模块，加快开发效率，补充了原生nodejs的不足

## 怎么用？

```javascript
const express = require('express')

const app = express()

app.get('/login',(req,res) => {
  res.send('hello express')
})

app.use('/public/',express.static('./public/'))

app.listen(3000,(req,res) => {
  console.log('启动在了3000端口')
})
```

说明：

* 通过res.send发送数据

## express中获取数据

* get请求
  * req.query
* post请求
  * 借助 body-parser中间件，然后 req.boby

## express middleware的使用

* body-parser 用来解析post请求中的body参数

  ```javascript
  // 配置body-parser 中间件
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  ```

  

## express-art-template的使用方法和说明

```javascript
// 设置为.html结尾文件，默认是.art结尾
app.engine('html', require('express-art-template'));
// 设置views视图渲染存储目录，默认读取views文件夹下面的文件
app.set('views', path.join(__dirname, 'views'));
```



## 留言板express版示例

```javascript
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const comments = [
    {
        name: '耿德洲',
        message: '耿德洲发表了帖子',
        dateTime: '2019/9/12'
    },
]

// 配置express-art-template
app.engine('html', require('express-art-template'));

// 配置body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index.html', {
        comments
    })
})

app.get('/post', (req, res) => {
   res.render('post.html')
})

app.post('/post', (req, res) => {
    const comment = req.body
    comment.dateTime = Date.now()
    comments.unshift(comment)
    res.redirect('/')
})

// 1.开放静态资源,推荐这种方式
app.use('/public/', express.static('./public/'))

app.listen(3000, () => {
    console.log('服务启动在了3000端口')
})
```



## 修改完代码自动重启的工具

可以使用一个叫`nodemon`的第三方工具，实现修改代码之后服务器自动重启的功能，
可以通过 `yarn global add nodemon`进行全局安装
使用方式 现在使用 `nodemon app.js`的方式启动