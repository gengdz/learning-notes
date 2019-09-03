const path = require('path');
// 作用是，将打包后的文件写入到dist,如果没有的话，就新建一个
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const Happypack = require('happypack')
module.exports = {
  mode: 'development',  // 模式有两种，分别是production，development，

  devServer: { // 开发服务器的配置，作用是可以通过 localhost的方式打开服务，好处是：可以查看打包后的结果，但不会真的进行打包，只会在内存中打包
    // hot: true,
    // port: 3000, // 打开的地址
    progress: true, // 显示打包的进度条
    contentBase: './build', // 打包的路径
    compress: true, // 是否压缩
    // open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '/api': '' }
    //   }
    // }
  },

  entry: './src/index.js',   // 入口    

  output: {
    filename: 'index.js',    // 打包后的文件名, 可以加上hash 如： index[hash:8].js
    path: path.resolve(__dirname, 'dist'), // 打包后的地址，这里必须是一个绝对路径
  },

  devtool: 'eval-source-map',

  watch: true,
  watchOptions: {  // 监控选项
    poll: 1000, // 每秒监控1000次
    aggregateTimeout: 500, // 防抖时间间隔
    ignored: /node_modules/,
  },

  optimization: { // 只有在生产模式下才能压缩
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },

  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  },

  // 解析
  resolve: {
    modules: [path.resolve('node_modules')], // 在哪些模块解析
    extensions: ['.js', 'jsx', '.css', '.json'], // 拓展，.js找不到，就找jsx。等等
    // mainFields: ['style','main'],
    // mainFiles: [],
    alias: {  // 别名
      bootstrap: 'bootstrap/dist/css/bootstrap.css',
    }
  },

  plugins: [   // 插件数组，
    // 定义环境变量等
    new webpack.DefinePlugin({
      DEV: JSON.stringify('dev'),
      FLAG: 'true',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 生成的模板
      filename: 'index.html', // 打包之后的文件名
      minify: { // 压缩设置
        removeAttributeQuotes: true, //去掉双引号
        collapseWhitespace: true, // 压缩空格
      },
      hash: true, // shengcheng hash值
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'public', to: './' }
    ]),
    new webpack.BannerPlugin('耿德洲,2019-09-03'),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 如果moment引用了locale，那么就把它忽略掉，这样语言包就不会被引入

    // 动态链接库，引用清单
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new Happypack({  // 多线程打包
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: { // 用babel-loader 需要把es6-es5
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            "@babel/plugin-transform-runtime"
          ]
        }
      }]

    })
  ],

  module: { // 模块配置(js,css,less模块等)
    noParse: /jquery/, // 不解析jquery
    rules: [
      {
        test: /\.js$/, // normal 普通的loader
        use: 'Happypack/loader?id=js',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // {
      //   test: /\.js$/,  // .less结尾的使用这种loader，loader的执行顺序为：从后往前
      //   use: {
      //     loader: 'eslint-loader',
      //     // options: {
      //     //   enforce: 'pre'
      //     // }
      //   }
      // },
      {
        test: /\.less$/,  // .less结尾的使用这种loader，loader的执行顺序为：从后往前
        use: [
          // {
          //   loader: 'style-loader',
          //   // options: {
          //   //   insertAt: 'top'

          //   // }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ]
      },
    ]
  }


}


