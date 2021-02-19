# HTMLUnknownElement元素和自定义元素


## 了解 `HTMLUnknownElement`元素。
随便写一个标签如
```html
<greeting>
  你好，这是自定义标签
</greeting>
```
这个<greeting>就是一个 `HTMLUnknownElement`元素。

在HTML中 *HTMLUnknownElement* 元素是一个被认可的合法元素，css可以无障碍使用。

> 在HTML中，HTMLUnknownElement和HTMLDivElement, HTMLSpanElement等等都是平级的，都是HTML的子集。
> 区别是什么呢？
> 区别在于，规范中的一部分HTML元素自己带有一些特殊的属性或者方法，比如表单元素HTMLFormElement元素有 `reset()`方法，`novalidate`属性。
> 然而， HTMLUnknownElement自己没有携带任何属性和方法。


### HTMLUnknownElement元素说明
* 有命名规范。中间不能有 **`-`**, 如果存在，那就是自定义元素啦。
* 浏览器会将其渲染为 **行元素** `display: inline;`
* 没有任何样式、属性、方法


### 示例

```html
<greeting>
  你好，这是HTMLUnknownElement
</greeting>
<span>这里是一个span元素</span>
<div>这里是一个div元素</div>
```

## 自定义元素
W3规范中，对自定义元素的定义是中间必须要有短横线（就是键盘上的减号）连接，并且浏览器也是这么认为的，例如：
```javascript
document.createElement('username') instanceof HTMLUnknownElement;    // 返回值是true
document.createElement('user-name') instanceof HTMLUnknownElement;    // 返回值是false
```


### 自定义元素使用
暂时不使用