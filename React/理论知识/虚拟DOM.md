# 虚拟 DOM

## DOM（Document Object Model）

文档对象模型，用 JS 对象来表示页面上的元素，并提供了操作 DOM 对象的 API;



## 虚拟 DOM（Virtual Document Object Model）
一个用来表示真是 DOM 树的对象，通常含有 标签名、标签上的属性、事件监听和子元素们，以及其他属性
框架中的概念，用 JS 对象的形式来模拟页面上的 DOM 和其嵌套关系。



## 虚拟 DOM 长什么样子

```typescript
const vNode: IVNode = {
  type: 'div', // 标签名 or 组件名
  key: null,
  ref: null,
  props: {
    children: [
      {type: 'span', ...},
      {type: 'span', ...},
    ],
    className: 'red', // 标签上的属性
    onClick: () => {} // 事件
    ...,
  },
  
  ...
}
```



## 如何创建虚拟 DOM

使用 `React.createElement`
```typescript
function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
    type: keyof ReactHTML,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
```

```javascript
createElement('div', {
  className: 'red',
  onClick: () => {},
  ...,
}, [
  createElement('span', {}, 'span1'),
  createElement('span', {}, 'span2'),
])
```

这么写起来太麻烦了。所以我们使用这种方法的变种，也就是 JSX 的方式简化创建虚拟 DOM。
这么写和直接写 DOM 几乎是一样的了，然后会通过 babel 转为 createElement 形式
```javascript
<div className='red' onClick={() => {}}>
  <span>span1</span>
  <span>span2</span>
</div>
```




## 虚拟 DOM 优点

1. **减少 DOM 操作**
    * 虚拟 DOM 可以将多次操作合并为一次操作。比如你添加 1000 个节点，直接用 DOM 会操作 1000 次，虚拟 DOM 只用添加一次。**减少 DOM 操作的次数**
    * 虚拟 DOM 借助 DOM diff 可以把多余的操作省掉。比如你添加 1000 个节点，其中有 990 是不变的，有 10 个是新增的。**减少 DOM 操作的范围**
2. **跨平台**
    * 虚拟 DOM 的本质只是一个 JS 对象。不仅可以变成 DOM，还可以变成小程序，IOS 应用，安卓应用。



## 虚拟 DOM 缺点

* 需要额外的创建函数，比如 createElement，但是可以通过 JSX 来简化成 XML 写法




## 虚拟 DOM 和真实 DOM 运行比对结论

* 在 DOM 数量不是很多的时候（可以优化我们的多余操作）
* 在规模大到一定程度，真实 DOM 更稳定，虚拟 DOM 需要计算之类，可能会慢


