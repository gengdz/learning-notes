# Babel
Babel 是一个 JS 的**编译器**

## 可以做什么？
转译新标准引入的语法，比如
箭头函数

let / const

解构

## 不能做什么
新标准引入的全局变量、部分原生对象新增的原型链上的方法，Babel 表示超纲了
全局变量

Promise
Symbol
WeakMap
Set
includes

generator 函数


## 编译的过程
1. 解析（解析成抽象语法树）
2. 转换（对抽象语法树进行转换）
3. 生成（将转化后的抽象语法树再生成代码字符串）


## 解析
1. 分词
2. 语义分析


## 转换
Plugins

Presets
官方给出的插件集合

Plugin/Preset 排序
如果两次转译都访问相同的节点，则转译将按照 Plugin 或 Preset 的规则进行排序然后执行。

Plugin 会运行在 Preset 之前。
Plugin 会从第一个开始顺序执行。
Preset 的顺序则刚好相反(从最后一个逆序执行)

## 生成
使用 babel-generator 通过 AST 树生成 ES5 代码


## 编写一个 babel 插件
把所有的 `a` 变成 'b'

接收了当前 Babel 对象作为参数的 Function 开始
```javascript
export default function({ types: t }) {
  return {
    visitor: {
      VariableDeclarator(path, state) {
        if (path.node.id.name == 'a') {
          path.node.id = t.identifier('b')
        }
      }
    }
  }
}
```
