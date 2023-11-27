# SCSS 基础
在项目中引入了 `variables.scss2css.scss`，那么就有如下关系
```scss
// 下面两种写法是等价的
background: var(--color-brand1-3);
background: $color-brand1-3

```


## 变量 $、#

定义变量：`$apple-color: red`

使用变量：
* `山东苹果颜色：$apple-color`

在一个变量中使用另一个变量 `#`
示例：
`.#{apple-color}-china: {}`



## 导入、变量前缀、继承
```scss
@import '../../../global.scss';

$class-prefix: 'prefix';

.#{$class-prefix} {
  &-content {
    // 假设在 global.scss 中有 other-conent 这个 class
    @extend .other-content;
  }
  &-nav {
    @extend .other-nav;
  }
}

```

## `@mixin` 与 `@include`
`@mixin` 指令允许我们定一个可以在整个样式表中重复使用的样式。
`@include` 指令可以将 混入（mixin）引入到文档中。

```scss
@mixin important-text {
  color: red;
  font-size: 25px;
}

.dange {
  @include import-text;
  background-color: green;
}
```

`@mixin` 还可以使用变量
```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }
```


> 对比：这玩意类似与 JavaScript 中的函数定义和使用