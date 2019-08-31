let path = require('path');
module.exports = {
  mode: 'development',  // 模式有两种，分别是production，development，
  entry: './src/index.js',   // 入口    
  output: {
    filename: 'index.js',    // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 打包后的地址，这里必须是一个绝对路径

  }

}


