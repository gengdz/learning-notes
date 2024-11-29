# CSS 编码规范

## CSS 样式的书写顺序

1. 定位：position、left、top、right、bottom、z-index、clear
2. 盒模型：display、float、width、height、padding、margin、border、border-radius、overflow;
3. 文字排版：font、color、line-height、letter-spacing、text-align
4. 外观：background、box-shadow
5. 其他：animation、transition

## 命名方式

- 全部小写
- 多个单词使用中划线 `-` 分割

## CSS 样式的导入

```css
/* 不推荐 */
import url("common/menus.css")

/* 推荐 */
<link rel="stylesheet" href="common/menus.css">
```
