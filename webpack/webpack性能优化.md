# webpack 性能优化

## 分析工具和方法
打包大小分析：webpack-bundle-analyzer

打包速度分析：speed-measure-webpack-plugin


## 减少打包时间
### 缩减范围
配置include/exclude缩小Loader对文件的搜索范围



### 定向搜索
配置resolve提高文件的搜索速度



### 缓存副本
配置cache缓存Loader对文件的编译副本
比如： options: { cacheDirectory: true }


### 提前构建
配置DllPlugin将第三方依赖提前打包。动态链接库



### 并行构建


### 可视结构
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
使用工具分析



## 减少打包体积

### 摇树优化
摇树优化只对ESM规范生效
*babel-plugin-import*



### 压缩资源
压缩HTML/CSS/JS代码，压缩字体/图像/音频/视频，

optimize-css-assets-webpack-plugin：压缩CSS代码
uglifyjs-webpack-plugin：压缩ES5版本的JS代码
terser-webpack-plugin：压缩ES6版本的JS代码


### 分割代码
```js
 optimization: {
        runtimeChunk: { name: "manifest" }, // 抽离WebpackRuntime函数
        splitChunks: {
            cacheGroups: {
                common: {
                    minChunks: 2,
                    name: "common",
                    priority: 5,
                    reuseExistingChunk: true, // 重用已存在代码块
                    test: AbsPath("src")
                },
                vendor: {
                    chunks: "initial", // 代码分割类型
                    name: "vendor", // 代码块名称
                    priority: 10, // 优先级
                    test: /node_modules/ // 校验文件正则表达式
                }
            }, // 缓存组
            chunks: "all" // 代码分割类型：all全部模块，async异步模块，initial入口模块
        } // 代码块分割
    }
```




### 按需加载
将路由页面/触发性功能单独打包为一个文件，使用时才加载
@babel/plugin-syntax-dynamic-import 




### 动态垫片



### 作用提升
分析模块间依赖关系，把打包好的模块合并到一个函数中
在webpack里只需将打包环境设置成生产环境就能让作用提升生效，或显式设置concatenateModules。




CDN 配合 externals