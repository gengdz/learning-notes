// 为了实现客户端跟服务器端通讯，需要往入口中多注入两个文件


const path = require('path');

function updateCompiler(compiler) {
  const config = compiler.options;
  config.entry = {
    main: [
      path.resolve(__dirname, '../client/index.js'),
      path.resolve(__dirname, '../hot/dev-server.js'),
      config.entry
    ]
  }
}

module.exports = updateCompiler;