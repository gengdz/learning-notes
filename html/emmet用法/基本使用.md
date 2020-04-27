# emmet
[toc]

## emmet是什么？
它使用仿CSS选择器的语法来生成代码，可以大大提高HTML/CSS编码的速度

## 语法

### HTML

#### 初始化
使用 `!` 或者 `html:5` 然后按 *tab* 键

#### 平级元素 `+`
输入
```html
  header{header}+(main>article{article})+footer{footer}
```
输出
```html
<header>header</header>
  <main>
    <article>article</article>
  </main>
<footer>footer</footer>
```


#### 子元素 `>`
输入
```html
  div#page>div.logo+ul.nav>li*5>a{itme $}
```
输出
```html
<div id="page">
  <div class="logo"></div>
  <ul class="nav">
    <li><a href="">itme 1</a></li>
    <li><a href="">itme 2</a></li>
    <li><a href="">itme 3</a></li>
    <li><a href="">itme 4</a></li>
    <li><a href="">itme 5</a></li>
  </ul>
</div>
```


#### 返回上一层 `^`
输入
```html
header{header}+main>article*3{aritcle $}^footer.footer{footer}
```
返回
```html
 <header>header</header>
  <main>
    <article>aritcle 1</article>
    <article>aritcle 2</article>
    <article>aritcle 3</article>
  </main>
  <footer class="footer">footer</footer>
```


#### 属性操作符

##### id和class属性
**class使用类似于 `ul.className`**
**id使用类似于 `li#1`**

输入
```html
 ul.nav>li*3#${item $}
```
输出
```html
 <ul class="nav">
    <li id="1">item 1</li>
    <li id="2">item 2</li>
    <li id="3">item 3</li>
 </ul>
```

##### 自定义属性 `[]`

输入
```html
 table[border="1"]>thead>tr>th*3{label $}^^tbody>tr*2>td*3{value $}
```
输出
```html
<table border="1">
   <thead>
     <tr>
       <th>label 1</th>
       <th>label 2</th>
       <th>label 3</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>value 1</td>
       <td>value 2</td>
       <td>value 3</td>
     </tr>
     <tr>
       <td>value 1</td>
       <td>value 2</td>
       <td>value 3</td>
     </tr>
   </tbody>
 </table>
```

#### 编号 `$`
1. 使用 *$* 可以对元素进行编号。
2. 可以放在元素名，属性名或者属性值中。
3. 可以使用多个连写的 *$* 生成带有前导0的序号。
4. 使用 *@* 操作符可以改变编号的方向及起点

```html
多个连写的 $ 可以生成带有前导零的编号：
ul>li.item$$$*5

改变方向, 将 *@-* 放在 *$* 后面
ul>li.item$@-*5

改变起点，将 *@N* 放在 *$* 后面
rl>li.item$@3*5
```


#### 文本 `{}`

输入
```html
ul>li*5{item $ }
```
输出
```html
 <ul>
    <li>item 1 </li>
    <li>item 2 </li>
    <li>item 3 </li>
    <li>item 4 </li>
    <li>item 5 </li>
  </ul>
```

#### 省略
* li for ul and ol
* tr for table, tbody, thead and tfoot
* td for tr
* option for select and optgroup

| 简写 | 全写 |
|---|---|
| `.wrap.content` | `div.wrap>div.content`  |
| `em>.info`	|  `em>span.info`  |
| `ul>.item*3` | `ul>li.item*3` |
|`table>#row$*4>[colspan=2]` | `table>tr#row$*4>td[colspan=2]`|

输入
```html
table>thead>tr>th*3{标题 $}^tbody>#$*3{item $}
```


#### “Lorem Ipsum” 生成器
使用`lorem`可以生成假的文字。
输入
```html
ul>li*3>lorem20
```
输出
```html
 <ul>
    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis reprehenderit ipsum necessitatibus eius,
      dolorum dignissimos excepturi nesciunt fugit reiciendis. Dolorum.</li>
    <li>Dolore natus cumque necessitatibus sed optio ea ab quisquam placeat? Repellendus asperiores eius alias non
      cupiditate, ad aliquid rem iure!</li>
    <li>Quas maiores veritatis et unde fugit rerum illo? Voluptatem nihil eaque eum fugit officiis. A modi voluptatibus
      quos voluptates magni!</li>
</ul>
```

### CSS

#### 缩写

常用单位别名：
* 整数不写单位 -> px
* 浮点数不写单位 -> em
* p → %
* e → em
* x → ex

输入
```css
w100
```
输出
```css
width:100px;
```

输入
```css
h10p+m5e
```
输出
```css
height: 10%;  
margin: 5em;  
```
