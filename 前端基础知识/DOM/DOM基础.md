# DOM 基础
英文：Document Object Model
中文：文档对象模型

DOM 以树结构表达 HTML 文档（所以也叫 DOM 树），定义了访问和操作 HTML 文档的标准方法

浏览器在加载页面的时候会生成 DOM 对象，以供我们使用 JS 控制页面元素




## 操作时机
需要保证浏览器已经渲染了内容才可以读取节点对象，下例将无法获取节点对象

```html
<script>
  const node = document.getElementById('hdcms')
  console.log(node) //null
</script>
<h1 id="hdcms">houdunren.com</h1>
```

解决方案为：

1. 任何时候把节点放在上面，把 `script` 放在下面

2. 使用定时器将脚本设置为异步执行

   ```html
   <script>
     setTimeout(() => {
       const node = document.getElementById('hdcms')
       console.log(node)
     })
   </script>
   <h1 id="hdcms">houdunren.com</h1>
   ```

3. 放在文档加载后的事件处理函数中

   ```html
   <script>
     window.onload = function () {
       let hd = document.getElementById('hd')
       console.log(hd)
     }
   </script>
   <div id="hd">houdunren</div>
   
   ```
   
4. 或将脚本设置在外部文件并使用 defer 属性加载，defer 即会等到 DOM 解析后迟延执行

   ```html
   <script defer="defer" src="3.js"></script>
   <div id="hdcms"></div>
   ```



## 节点对象

每个元素都是 DOM 树的节点。 **根节点是：Doucument 对象**

* 包括 12 种类型的节点对象
* 常用节点为：document、标签元素节点、文本节点、注释节点
* 节点都继承 Node，所以拥有相同的属性或者方法
* document 是 DOM 操作的起始节点

节点有很多种类型：
```javascript
// document节点 noteType为9
console.log(document.nodeType)
  
// body 是标签节点 nodeType为1
console.log(document.body.nodeType) 
```

| nodeType | 说明          |
| -------- | ------------- |
| 1        | 元素节点      |
| 2        | 属性节点      |
| 3        | 文本节点      |
| 8        | 注释节点      |
| 9        | document 对象 |



