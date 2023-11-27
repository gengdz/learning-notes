# CSS 函数

## counter()
CSS 计时器
它有一系列属性组成
* `counter-reset` 创建或者重置计时器
* `counter-increment` 递增变量
* `content` 插入生成的内容
* `counter()` 或 `counters` 将计数器的值添加到元素


```css
body {
  counter-reset: section;
}
 
h2::before {
  counter-increment: section;
  content: "Section " counter(section) ": ";
}

/* 支持嵌套写法 */
h2::before {
  counter-increment: subsection;
  content: counter(section) "." counter(subsection) " ";
}

```





## 其他函数
### var()
这个是 CSS 自带的变量。

使用 `--变量名` 声明
使用 `var(--变量名)` 来使用

```css
/* 定义3种类型的作用域 */
:root {
  --color: purple;
}

div {
  --color: green;
}

#alert {
  --color: red;
}

/* 使用 */
* {
   color: var(--color);
}
```


## 属性函数 
### attr()
属性函数。可以利用这个属性取自定义的任意属性。
```html
<p custom="这是自定义的内容">这是文本内容。。   </p>
```
```css
p::after{
    content: attr(custom);
  }
```

## 数字函数
calc()、min()、max()、mixmax()、repeat()；

### calc()
```css
 width: calc(100% - 100px);
```


## 图形函数
circle()、ellipse()、inset()、polygon()、path()
