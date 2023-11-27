# HTML 基础
HTML（Hypertext Markup Language）超文本标记语言

## HTML 原则
***我们使用 HTML 是使用它的语义而不是使用它的样式。***


## href 与 src

## 定义
href 是 Hypertext Reference 的简写，表示超文本引用，指向网络资源所在的位置。
常见场景：
```html
<a href="www.baidu.com"></a>
<link type="text/css" href="./style.css">
```

src 是 source 的简写，目的是要把文件下载到 HTML 页面中去。
常见场景：
```html
<script src="a.js"></script>
<img src="img/a.jgp">
<iframe src="a.html">
```


### 作用结果
href 用在当前文档和引用资源之间确立联系

src 用于替换当前内容


### 浏览器解析方式
当浏览器遇到 href 会并行下载资源并且不会停止对当前文档的处理。（这也是为什么使用 link 的方式加载 CSS，而不是使用 @import 方式
当浏览器解析到 src，会暂停其他资源的下载和处理，直到将该资源加载或者执行完毕。（这也是 script 标签为什么放在底部而不是头部的原因）


## 路径

### 绝对路径

绝对路径包含`主机+服务器地址+目录+文件名`的完整路径

```html
https://www.gengdezhou/edu/front/lesson/298.html
```

### 相对路径

相对当前路径的地址

```html
# 当前目录的文件
2.html

# 上级目录中的文件
../3.html

# 子目录中的文件
block/user.html

# 根目录中的文件
/bootstrap.html

```

