# other

## 全局变量

`__dirname` 是 Node.js 中的一个全局变量，指的是当前模块文件所在的目录的绝对路径。

### process

`process`（进程）是 NodeJS 提供的一个全局对象，可以提供当前 NodeJS 的进程信息。因为 process 是全局变量，所以无需通过 require()加载就可以使用。process 对象提供一系列属性，用于返回系统信息。

- process.env 返回当前环境运行所在的环境信息。

- process.env.NODE_ENV。NODE_ENV 只是用户自定义的变量，当我们在服务启动时配置 NODE_ENV,env 里面就会有这个信息
