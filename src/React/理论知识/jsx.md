# JSX

JSX 是 JavaScript 语法拓展，可以让你在 JavaScript 文件中书写类似 HTML 的标签

JSX 并不是 React 独有的，但它常和 React 一起用

最终会被编译为 ReactElement 对象

JSX → 编译后 → React.createElement → 生成 ReactElement。

- React.createElement 函数的返回值就是一个 ReactElement 对象

JSX -> ReactElement -> Fiber -> Commit

## ReactElement

描述 UI 的 JavaScript 对象。

React 通过 ReactElement 来构建和维护虚拟 DOM（Virtual DOM）树。

```typescript
const ReactElement = {
  // 用于标识这是一个 React 元素
  $$typeof: Symbol(react.element),

  // 元素类型，可以是字符串（如 'div'），也可以是函数或类组件
  type: 'div' | MyComponent | ...,

  // 元素的 key，用于同级元素区分
  key: null | string,

  // ref 引用
  ref: null | function | object,

  // props 属性对象
  props: {
    children,
    // ...其它属性
  },

  // 其他内部字段
};
```

## React.createElement

React.createElement 函数的返回值就是一个 ReactElement 对象

```typescript
function createElement(type, config, ...children) {
  // ...
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
  };
}
```

```tsx
const element = <App title="test" />;

const element = React.createElement(App, { title: 'test' });
```

```javascript
// 手写
const el = <div className="foo">hello</div>;
// JSX 编译后
const el = React.createElement('div', { className: 'foo' }, 'hello');


{
  $$typeof: Symbol(react.element),
  type: 'div'
  key: null,
  ref: null,
  props: { children: "hello", className: 'foo' },
}
```

jsx 中出现 `< >` 的地方，最终都会被编译为 ReactElement

React 17 发布了新的 JSX 转换:

新的 JSX 转换不会将 JSX 转换为 React.createElement，而是自动从 React 的 react/jsx-runtime 包中引入新的入口函数并调用：

## babel 转换过程

JSX 代码

```tsx
export default function TodoList() {
  return (
    <div className="cn1">
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
    </div>
  );
}
```

JSX 转换生成的代码

```jsx
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
export default function TodoList() {
  return /*#__PURE__*/ _jsxs('div', {
    className: 'cn1',
    children: [
      /*#__PURE__*/ _jsx('h1', {
        children: "Hedy Lamarr's Todos",
      }),
      /*#__PURE__*/ _jsx('img', {
        src: 'https://i.imgur.com/yXOvdOSs.jpg',
        alt: 'Hedy Lamarr',
        className: 'photo',
      }),
    ],
  });
}
```
