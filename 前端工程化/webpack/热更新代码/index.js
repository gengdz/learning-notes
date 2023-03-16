const webpack = require('webpack');
const Server = require('./lib/server/Server');

// 编译器对象
const compiler = webpack(config);
const server = new Server(compiler);
server.listen(9090, localhost, () => {
  console.log('服务器已经在 9090 启动')
})