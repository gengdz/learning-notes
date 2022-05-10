# webpack 基础？
## 是什么？
> webpack 是一个**静态模块打包工具**，它的任务是：分析项目结构，找到 JS 模块，以及其它一些浏览器不能直接运行的拓展语言(如 less，TS)，并将其打包成合适的格式，供浏览器使用。
>
> 通俗版：就是把程序员写的代码，经过编译、压缩、语法检查，最终加工成浏览器能够识别的、精简的，高效运行的代码
>
> ==说明：webpack 本身只能处理 JS 和 JSON==



## 能干什么？

* 代码转换  -- 将 ES6 转换成 ES5，将 less 装换成 css 等
* 文件优化  -- 可以压缩文件大小
* 代码校验  -- eslint
* 自动刷新
* 代码分割
* 模块合并
* 自动发布



## 前置知识

| 命令(文件夹) | 说明                                                         | 例子           |
| ------------ | ------------------------------------------------------------ | -------------- |
| src          | 源代码（程序员写的，没有经过处理的）                         | 生鸡蛋、生米   |
| build        | 经过一定处理加工的不完善的代码                               | 熟鸡蛋、熟米   |
| dist         | 经过完善处理的代码                                           | 蛋炒饭         |
| dev          | 开发环境、模拟运行项目<br />(相当于进行 dist 操作，但是不生成实质的文件) | 模拟做饭的机器 |


## webpack 构建过程｜打包原理
webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：
1. 初始化参数： 从配置文件和 Shell 语句中 读取与合并参数，得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法，开始执行编译。
3. 确定入口：根据配置的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块递归本步骤，直到所有入口文件依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 webpack 提供的 API 改变 webpack 的运行结果

## 安装

1. `yarn init` 创建或者更新一个 `package.json` 文件  `yarn init -y`  跳过交互式的创建
2. `yarn add webpack webpack-cli -D` 安装之后会生成 `node_modules` 模块， `-D` 表示是开发使用，生产不需要。



## 使用

* 使用 `npx webpack` 进行打包 默认打包的出口是 `dist/main.js`
* 新建一个 `webpack.config.js` 对 webpack 进行配置



## 配置说明

* 配置文件名为 `webpack.config.js`
* 通过 `common.js` 暴露出去一个对象，`module.exports = { }`



## 五个核心概念

### entry（活蹦乱跳的猪）

以哪个文件为入口，开始打包

### output（香喷喷的红烧肉）

出口，我们可以通过配置，修改输出文件的名称和文件位置

### loader（加工工具）

webpack 自身只能处理 JS 和 JSON 模块，使用不同的 loader 可以将不同类型的文件转成 webpack 可以处理的模块然后就可以进行打包操作了。

* 有的 loader 可以把 less 变成 CSS
* 有的 loader 可以图片 变成可识别的

其中

* loader 的 test 属性表明：配置哪些文件，
* use 属性代表使用哪些 loader。执行顺序是：从下到上

### plugins

插件可以完成 loader 不能完成的功能。比如：打包优化和压缩，

### Mode

| 选项          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `development` | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。 |
| `production`  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。 |
| `none`        | 不使用任何默认优化选项                                       |

如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`





## loader

不同的 loader 作用不同。

loader 配置在 `module` 属性中



### 打包样式资源

* `style-loader` 创建 `<style>` 标签，将 JS 中的样式资源添加到 `<head>` 中
* `css-loader` 将 CSS 文件，变成 commonjs 模块加载到 JS 中，里面内容是样式字符串

* `less-loader` 将 `.less` 文件编译成 `.css` 文件

```javascript
{
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }
    ]
  }
}
```



### 打包图片资源

* `url-loader`
* `file-loader`

默认处理不了 HTML 中的图片，所以还需要再加上一个 loader

* `html-loader`

  处理 HTML 中 img 图片，（负责引入 img）。它和 `url-loader` 使用还需要解决 打包方式不同带来的错误

  

```js
{
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }, 
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader', // 只使用一个 loader 可以用 loader 属性
        options: {
          // 如果图片小于 8kb，就会被 base64 处理
          limit: 8 * 1024,
          esModule: false, // 默认 es module, 和 html-loader 冲突，所以关闭
          name: '[hash:5].[ext]', // 图片的名称 ext 表示本来是什么格式的现在还是什么格式
        }
      },
      {
        text: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
}
```



### 打包其他资源

还是使用 `file-loader`

```js
{
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }, 
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader', // 只使用一个 loader 可以用 loader 属性
        options: {
          // 如果图片小于 8kb，就会被 base64 处理
          limit: 8 * 1024,
          esModule: false, // 默认 es module, 和 html-loader 冲突，所以关闭
          name: '[hash:5].[ext]', // 图片的名称 ext 表示本来是什么格式的现在还是什么格式
        }
      },
      {
        text: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude:/\.(css|js|html)$/,
        loader: 'file-loader',
        name:'[hash:5].[ext]'
      }
    ]
  }
}
```





## plugins

### 打包 HTML 文件

* `html-webpack-plugin` 

  创建一个空的 HTML 文件，自动引入打包输出的全部资源（JS/CSS）

  需求是有结构的 HTML，那么

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

{
  plugins: [
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件 + 自动引入
      template: './src/index.html',
      filename: 'index.html', // 打包之后的文件名
      hash: true, // 生成 hash 值
    })
  ]
}
```



## devServer

在开发的时候，我们改变了代码，刷新页面之后，并没有出现更新之后的结果，我们需要重新打包一次，这是非常麻烦的，所以我们可以通过配置 devserver 来配置。

* 自动编译，自动打开浏览器，自动刷新
* 不会真的编译，只会在内存中编译

想要使用这个需要

* 下载 `webpack-dev-server` 并使用这种方式启动 `npx webpack-dev-server`

```js
{
  devServer: {
    contentBase: path.resolve(__dirname, 'bulid'),  // 项目构建后的路径
    compress: true, // 是否开启压缩
    port: 3000,
    open: true, // 是否默认打开浏览器
  }
}
```



## 基本的单页面配置

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename:'index.js',
    path: path.resolve(__dirname, 'dist'), // 打包后的地址，这里必须是一个绝对路径
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }, 
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader', // 只使用一个 loader 可以用 loader 属性
        options: {
          // 如果图片小于 8kb，就会被 base64 处理
          limit: 8 * 1024,
          esModule: false, // 默认 es module, 和 html-loader 冲突，所以关闭
          name: '[hash:5].[ext]', // 图片的名称 ext 表示本来是什么格式的现在还是什么格式
          outputPath: 'imgs' // 输出路径
        }
      },
      {
        text: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude:/\.(css|js|html)$/,
        loader: 'file-loader',
        name:'[hash:5].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件 + 自动引入
      template: './src/index.html',
      filename: 'index.html', // 打包之后的文件名
      hash: true, // 生成 hash 值
    })
  ],
  mode: "development"
}
```

可以通过 `outputPath: 'imgs' ` 指定输出路径





## 提取 CSS 成单独文件

在上面的配置中，会把 CSS 经过 `css-loader` 将 CSS 文件整合到 JS 文件中去，然后通过 `style-loader` 创建 `<style>` 标签，将样式放入。

```html
<style>
  body {
    background: 'pink'
  }
</style>
```



这种方式的问题在于：

* 样式闪动：先加载 JS 在通过  JS 将样式插入到标签中去。
* JS 文件会变大
* CSS 和 JS 混合，查找不方便。

所以我们想把 CSS 单独抽离出来，于是就有了 `mini-css-extract-plugin` ，使用如下

这种方式是提取 CSS 成单独的文件，然后通过 `<link href="css/built.css">` 的方式应用

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          // 这个 loader 的作用是 提取 js 中的 css 成单独文件 
          MiniCssExtractPlugin.loader
          'css-loader',
          'less-loader',
        ]
      }, 
    ]
  },
  plugins: [
   new MiniCssExtractPlugin({
     filename: 'css/buit.css'
   })
  ],
  mode: "development"
}
```



## CSS 兼容性处理

有些语法，比如 flex、grid 有些浏览器可能不兼容，所以可以让一些 loader 帮助我们做兼容处理，我们使用 `postcss-loader | postcss-preset-env` 来做兼容处理

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
          		plugins: () => [
        				require('postcss-preset-env')
        			 ]
             }
          }
        ]
      }, 
    ]
  },
  plugins: [
   new MiniCssExtractPlugin({
     filename: 'css/buit.css'
   })
  ],
  mode: "development"
}
```



## 压缩 CSS

使用 `optimize-css-assets-webpack-plugin` 插件

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

{
  plugins: [
    // 压缩 CSS
    new OptimizeCSSAssetsPlugin()
  ]
}
```





## 多页配置

```javascript
module.exports = {
    entry: {
       home:'./src/index.js',
       company:'./src/other.js',
      },
      
    output:{
        filename:[name].js,
        path: path.resolve(__dirname, 'dist'),
    },
  
          
    plugins:[
        new HtmlWebpackPlugin({
          template: './src/index.html', // 生成的模板
          filename: 'home.html', // 打包之后的文件名
          chunks: ["home"],
        }),
         new HtmlWebpackPlugin({
          template: './src/index.html', // 生成的模板
          filename: 'company.html', // 打包之后的文件名
          chunks: ["home","other"],
        }),
    ]
}
```



## devtool <调试工具>

### source-map
souce-map: 源码映射,方便出错调试

什么是 Source Map？
Source Map 是一个存储源代码与编译代码对应位置映射的信息文件，便于开发人员定位上述代码错误。实际上，它就是一个 JSON 键值对，利用 VLQ 编码与特定的规则存储位置信息。简而言之，可以理解为 Source Map 在处理前的代码和处理后的代码之间搭建了一座桥梁。



| 配置名称                                  | 效果                                                 |
| ----------------------------------------- | ---------------------------------------------------- |
| `devtool: 'source-map'`                   | 会单独生成一个 sourcemap文件<br />出错了会标识行和列 |
| `devtool: 'eval-source-map'`              | 不产生单独的sourcemap<br />出错了会标识行和列        |
| `devtool: 'cheap-moudle-source-map'`      | 会生成映射文件<br />不会标识列                       |
| `devtool: 'cheap-moudle-eval-source-map'` | 不会生成映射文件<br />不会标识列                     |

## 实时打包

```javascript
module.exports = {
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500, // 防抖时间间隔
        ignored: /node_modules/,
    },
}
```

## 几个插件

* 清空dist之后再打包

  ```javascript
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  plugins:[
      new CleanWebpackPlugin(),
  ]
  ```

* 把文件拷贝到dist文件

  ```javascript
   new CopyWebpackPlugin([
     {from: 'public',to:'./'}  
   ])
  ```
  
* 版权插件

  ```javascript
  new webpack.BannerPlugin('耿德洲,2019-09-03')
  ```

## 代理 proxy

1. 服务器接口是3000，webpack中devServer的默认端口是8080

   ```javascript
    proxy:{
         '/api':{
           target: 'http://localhost:3000',
           pathRewrite:{'/api':''}
         }
       }
   ```

2. 前端单纯的模拟数据

   ```javascript
   devServer:{
       before(app){
           app.get('/user', (req, res) => {
               res.json({ name: '耿德洲' }),
           })
       }
   }
   ```

3. 在服务端启动webpack,后端前端公用一个接口

   ```javascript
   
    // 在服务端启动webpack，
    const middleware = require('webpack-dev-middleware')
   
    const webpack = require('webpack')
   
    const config = require('./webpack.config.js')
   
    const compiler = webpack(config)
   
    app.use(middleware(compiler))
   ```


## resolve配置

```javascript
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
```



## 动态链接库

原因：第三库没必要每次都打包，因为没有发生变动，打包起来很慢

原理是：将第三方库提前打包成文件，然后在DllReferencePlugin中引用

用到两个webpack自带插件,一个是webpack.DllPlugin，另一个是webpack.DllReferencePlugin



## webpack自带优化
* import多个时，会进行 tree-shaking  会把没用到的代码自动删除掉。但require不会进行tree-shaking
* webpack会自动省略可以简化的代码
* es6模块会把结果放在default上


## 抽离公共代码
有文件被多个地方使用，如Pateo系列组件，那么可以进行的抽离公共代码

```javascript
  optimization: {  // 优化
      splitChunks: {  // 分割代码块 代替之前的 commonChunkPlugins
          cacheGroups: { // 缓存组
              vendor: { // 第三方模块抽离
                  test: /node_modules/,
                  chunks: 'initial',
                  minSize: 0,
                  minChunks: 2
              },
              common: { // 公共模块
                  chunks: 'initial',
                  minSize: 0,
                  minchunks: 2
                  // priotity: 1,
              },
          }
      }
  },
```

## 懒加载
```javascript
// 这里的import要使用到 在use.options.plugins中配置@babel/plugin-syntax-dynamic-import 
handleClick = () => {
  import(aa.js).then(data=>{
    console.log(data)
  })
}

```



## 热更新
Hot Module Replacement 简称 HMR，无需完全刷新整个页面的同时，更新模块

```javascript
devServer:{
    hot: true
}

plugins:[
    new webpack.NamedModulesPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
]
```

### webpack 热更新原理

HotModuleReplacementPlugin 会生成两个补丁文件
1. 上一次编译生成的 hash.hot-update.json 。返回的内容为
  ```json
  {
    "h": "fb3csdfceaq2", // 这次新生成的 hash
    "c": {  "main": true  } // 哪些文件发生了变化
  }
  ```
2. chunk 名字.上一次编译生成的 hash.hot-update.js。存放着此代码块最新的模块定义，里面会调用 webpackHotUpdate 方法。

```js
// 编辑器对象
const compiler = webpack(config);
const server = new Server(compiler);
server.listen(9090,localhost, ()=>{
  console.log('服务器已经在 9090 启动')
})
```

1. webpack-dev-server 启动本地服务
    * 启动 webpack，生成 compiler 实例。
    * 使用 express 启动本地 server，让浏览器可以请求本地的静态资源
    * 再启动 websocket 服务，通过 websocket，可以建立本地服务和浏览器的双向通信。这样可以实现本地文件发生变化，立马告知浏览器可以热更新代码啦。
2. 修改 webpack.config.js 的 entry 配置
    * 把客户端与浏览器通信代码塞到前端中
3. 监听 webpack 编译结束
    * 调用 setupHooks 方法，监听编译完成事件，compiler.hooks.done.tap。然后发出 hash 和 ok 
4. webpack 监听文件变化
    * 调用 setupDevMiddleware 方法，调用 compiler.watch 方法，以监听模式启动编译（如果文件变更了，它会重新编译）
    * 使用 MemoryFS 将编译后的文件打包到内存。
5. 浏览器接受到热更新的通知
    * 第 2 步中注入的文件，会在浏览器运行。建立和服务端的 socket 连接 `socket(socketUrl, onSocketMessage)`，会调用 reloadApp 方法。然后发出 webpackHotUpdate 消息。
    * 这时候 webpack 监听到了 webpackHotUpdate 事件，并且获取了最新的 hash 值。然后调用 module.hot.check 方法。
6. HotModuleReplacementPlugin
    * 

7. moudle.hot.check 开始热更新
8. hotApply 热更新模块替换
    * 删除过期的模块，通过 hotUpdate 可以找到旧模块
    * 将新的模块添加到 modules 中
    * 通过 `__webpack_require__` 执行相关模块的代码

## webpack 中的 path 和 publicPath



## externals

如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。

有时我们希望我们通过script引入的库，如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。

externals是决定的是以哪种模式去加载所引入的额外的包。

使用方法

在`config.js配置中`

```javascript
externals: {
  'intro.js': 'introJs',
}
```



在`index.html` 中

```ht
<link
  rel="stylesheet"
  href="https://g.alicdn.com/code/lib/intro.js/2.9.3/introjs.min.css"
 />
 
<script src="https://g.alicdn.com/code/lib/intro.js/2.9.3/intro.min.js"></script>
```

