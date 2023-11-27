# AST

抽象语法树（Abstract Syntax Tree，AST）是：**源代码语法结构的一种抽象表示**，它以树状的形式表现编程语言的语法结构

## AST 编译器

一个 AST 的编译器，包含 3 个部分

1. **Parsing（解析过程）**：这个过程要经过 **词法分析**、**语法分析**、**构建 AST**一系列操作；
2. **Transformation（转化过程）**：这个过程就是将上一步解析后的内容，按照编译器指定的规则进行处理，形成一个新的表现形式；
3. **Code Generation（代码生成）**：将上一步处理好的内容转化为新的代码；

### Parsing

给出示例过程

源码： `(add 2 (subtract 4 2))`

词法分析：

```javascript
[
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' },
];
```

语法分析：

```javascript
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params:
      [{
        type: 'NumberLiteral',
        value: '2',
      },
      {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
  }]
}
```

babel 中使用 `const parser = require('@babel/parser'); `

### Transformation

转换 AST

过程是：先遍历后修改：

```typescript
const astVisitor = (node, cb) => {
  cb(node);
  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      astVisitor(node[key], cb);
    }
  }
};
```

bebel 提供了针对 type 进行遍历的方式

```typescript
const traverse = require('@babel/traverse').default;

traverse(ast, {
  ImportSpecifier(path) {},
});
```

### Generation

把 AST 变成源码 
babel 中使用 `const generator = require('@babel/generator').default;`
