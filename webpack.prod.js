const { smart } = require('webpack-merge')
const base = require('./webpack.config')

// 运行这个文件的命令是： yarn build -- --config webpack.prod.js
module.exports = smart(base, {
    mode: 'production',
    optimization: { // 只有在生产模式下才能压缩
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

})