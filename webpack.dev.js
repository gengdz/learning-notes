const { smart } = require('webpack-merge')
const base = require('./webpack.config')

// 运行这个文件的命令是： yarn build -- --config webpack.dev.js
module.exports = smart(base, {
    mode: 'development',

    devServer: { // 开发服务器的配置，作用是可以通过 localhost的方式打开服务，好处是：可以查看打包后的结果，但不会真的进行打包，只会在内存中打包
        // hot: true,
        // port: 3000, // 打开的地址
        progress: true, // 显示打包的进度条
        contentBase: './build', // 打包的路径
        compress: true, // 是否压缩
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '/api': '' }
            }
        }
    },

    devtool: 'eval-source-map',

})

