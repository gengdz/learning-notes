# MongoDB和mongoose

## MongoDB介绍和使用

### 说明

NoSql 非关系型数据库，MongoDB是长得最像关系型数据库的非关系型数据库

名词对比：

| 关系型数据库 | MongoDB                |
| ------------ | ---------------------- |
| 数据库       | 数据库                 |
| 数据表       | 集合<数组>(collection) |
| 表记录       | 文档对象               |

MongoDB不需要设计表结构，可以任意往里面存数据，没有结构性这一说

MongoDB的数据结构大致如下：

```javascript
{
  qq:{
       users:[
         {
            name:'张三'，
            age:18
          }                                                           
        ],
       products:[
                                                                        
       ]
  },
                      
  baidu:{
                      
  },
                      
  taobao:{
                      
  }
  
}
```



### 启动和关闭数据库

启动

```shell
# mongodb 默认使用执行mongod 命令所在的盘符根目录下的/data/db 作为自己的数据存储目录
# 需要添加到环境变量 C:\Program Files\MongoDB\Server\4.2\bin
# 所以在第一次执行该命令之前需要手动新建/data/db
mongod
```

如果想修改默认的存储路径可以使用：

```shell
mongod --dppath=数据存储目录
```

停止

```
在开启服务的控制台，直接ctrl+c 即可
```

### 连接和退出数据库

连接

```shell
# 该命令默认连接本机的服务
mongo
```

退出

```shell
# 在连接状态，输入exit退出连接
exit
```

### 常用命令

| 命令                                  | 说明                                       |
| ------------------------------------- | ------------------------------------------ |
| show dbs                              | 查看显示所有数据库                         |
| db                                    | 显示当前操作的数据库                       |
| use 数据库名称                        | 切换 / 新建后切换 到指定的数据库           |
| db.students.insertOne({"name":"gdz"}) | 在students集合中插入一条数据               |
| show collections                      | 显示当前db的所有集合                       |
| db.students.find().pretty()           | 显示students集合的所有数据，pretty表示美化 |
| db.dropDatabase()                     | 删除当前所在的数据库                       |
| db.(students).drop()                  | 删除students集合                           |
|                                       |                                            |

说明：

* 如果当前数据库没数据，则show dbs不显示这个数据库
* 默认在test数据库(系统创建的)



## 使用mongoose在node中操作mongodb

使用mongoose来操作MongoDB，他是基于mongodb做的再一次封装

***mongoose 所有方法都是Promise类型的***

### 建立集合四部曲

```javascript
const mongoose = require('mongoose')

// 1.连接数据库
mongoose.connect('mongodb://localhost/students', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) return console.log('Connection Error:' + err)
  console.log('Connection success!')
})

// 2.设计文档结构
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  alias: String,
})

// 3.将文档结构发布为模型
// 第一个参数：传入一个大写的字符串表示你的数据库名称，MongoDB会自动转成小写的复数形式
//            例如： User --> users
// 第二个参数：架构 Schema
// 返回值：模型构造函数
const User = mongoose.model('User', userSchema)

// 4.使用模型构造函数，对集合中的数据进行操作
```

### 增加数据

```javascript
const gdz = new User({
  userName: '张三',
  age: 18,
  alias: '耿德洲'
})
gdz.save((err, result) => {
  if (err) return console.log('保存失败')
  console.log(result)
})
```

### 查询数据

```javascript
// 查询所有
User.find((err, res) => {
  if (err) return console.log('查询失败')
  console.log(res)
})

// 条件查询 --> []
User.find({userName: '张三'},(err,data) => {
  if(err) return console.log('查询出错')
  console.log(data)
})

// 条件查询一个 --> {}
User.findOne({userName:'张三'},(err,data) => {
  if(err) return console.log('查询出错')
  console.log(data)
})
```

### 删除数据

```javascript
// 删除多个
User.deleteMany({ userName: 'gdz' }, (err, data) => {
  if (err) return console.log('删除出错')
  console.log(data)
})
// 删除一个
User.deleteOne({ userName: 'gdz' }, (err, data) => {
  if (err) return console.log('删除出错')
  console.log(data)
})
```

### 更新数据

```javascript
// 更新一个
User.updateOne({ userName: '张三' }, { alias: '张狗蛋' }, (err, data) => {
  if (err) return console.log('更新失败')
  console.log(data)
})

// 更新多个
User.updateMany({ userName: '张三' }, { alias: '张狗蛋' }, (err, data) => {
  if (err) return console.log('更新失败')
  console.log(data)
})
```

