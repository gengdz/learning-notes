# Markdown 进阶
## Markdown 加入导出样式
```html
<style>
    h1 {
      font-size: 2.8em;
      color: #d33682;
      margin: 0.75em;
    }
    h2 {
      font-size: 2.4em;
      color: #9B31EA;
      margin: 0.75em;
    }
    h3 {
      font-size: 1.8em;
      color: #338000;
      margin: 0.75em;
    }
    h4 {
      font-size: 1.4em;
      color: #d33682;
      margin: 0.75em;
    }
</style>
```
然后在下面写文件即可,仅在导出的使用生效。在编辑器中不生效

## Markdown 自定义样式

* 偏好 --> 外观 --> 主题文件

* 找到你是用的主题的 .css 文件，然后新建一个如 github.user.css

  ```css
  /* 序号设置 */
  body {
      counter-reset: h1;
  }
  h1 {
      counter-reset: h1;
  }
  h2 {
      counter-reset: h2;
  }
  h3 {
      counter-reset: h3;
  }
  
  h2:before {
      counter-increment: h1;
      content: counter(h1) "."
  }
  
  h3:before {
      counter-increment: h2;
      content: counter(h1) "." counter(h2) "."
  }
  
  h4:before {
      counter-increment: h3;
      content: counter(h1) "." counter(h2) "." counter(h3) "."
  }
  
  /* 引用样式 */
  blockquote {
      background-color: #D9D9D9;
  }
  ```

  



