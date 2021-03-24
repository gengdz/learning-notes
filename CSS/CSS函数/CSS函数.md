# CSS 函数

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
