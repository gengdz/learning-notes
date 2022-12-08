# SCSS 基础
在项目中引入了 `variables.scss2css.scss`，那么就有如下关系
```scss
// 下面两种写法是等价的
background: var(--color-brand1-3);
background: $color-brand1-3

```


## 变量 $

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
    @extend .onter-content;
  }
  &-nav {
    @extend .other-nav;
  }
}

```