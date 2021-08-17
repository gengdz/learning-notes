
const updateCompiler = require('../utils/updateCompiler');


class Server {
  constructor(compiler) {
    this.compiler = compiler;
    updateCompiler(compiler); // 向入口注入两个脚本文件，用来热更新的
    this.setupApp(); // 创建 App；
    this.currentHash; // 当前 hash 值
    this.clientSocketList = []; // 存放所有的通过 webpack 连接到服务器的客户端
    this.setupHooks(); // 监听编译成功事件 会发出 on hash 两个事件
    this.setupDevMiddleware(); // 设置中间件，开启编译
    this.routes(); // 配置路由
    this.createServer(); // 创建 HTTP 服务器，以 app 作为路由
    this.createSocketServer();  // 创建 socket 服务器 
  }

  setupDevMiddleware() {
    this.middleware = this.webpackDevMiddleware(); // 返回一个 express 中间件
  }

  webpackDevMiddleware() {
    const { compiler } = this;
    // 以监听模式启动编译，如果以后文件发生变更了，会重新编译
    compiler.watch(() => {
      console.log('监听模式编译成功');
    })

    let fs = new MemoryFS(); // 内存文件系统实例
    // 以后打包后文件写入内存文件系统，读的时候也要从内存文件系统里读
    this.fs = compiler.outputFileSystem = fs;
  }


  createSocketServer() {
    const io = socketIO(this.server);
    io.on('connection', socket => {
      this.clientSocketList.push(socket);
      socket.emit('hash', this.currentHash);
      socket.emit('ok');
    })
  }

  routes() {
    const { } = this;
    const config = this.compiler.options;
    this.app.use(this.middleware(config.output.push))
  }

  setupHooks() {
    const { compiler } = this;
    compiler.hooks.done.tap('webpack-dev-server', state => {
      this.currentHash = state.hash;
      this.clientSocketList.forEach(socket => {
        socket.emit('hash', this.currentHash);
        socket.emit('ok');
      })
    })
  }


  setupApp() {
    this.app = express();
  }

  createServer() {
    this.server = http.createServer(this.app);
  }

  listen(port, host, callback) {
    this.server.listen(port, host, callback)
  }

}

module.exports = Server;