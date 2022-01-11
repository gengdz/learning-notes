# CSS 单位
CSS 单位分为：
* 相对长度单位: rem, em, vw, vh, 
* 绝对长度单位: px,

浏览器默认 font-size: 16px


## 相对长度单位
### `rem`
`rem` 中 `r` 是 `root`
体现在 `<html>` 上。这里它就是 root
```css
html {
  color: red;
  font-size: 1rem; 默认16px
  font-size: 2rem; 意思是说现在 默认是 2 * 16px = 32px 啦
}

.div1 {
  font-size: 2rem;
  /* 2 * 16px = 32px */
  /* 对应的这里就是 2 * 32px 啦 */
}
```



### `em`
`em` 会使用直接父节点的 `font-size`，如果直接父节点没有的话，就往上层找，也就是说它的根不固定。



## 绝对长度单位
### px





