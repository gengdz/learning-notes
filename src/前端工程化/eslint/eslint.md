# ESLint

## 是什么

**发现和修复 JavaScript 代码问题**

ESLint 存在的形式：

- IDE 的 ESLint 插件
- ESLint 的 npm 包。写在项目中的 devDep 中

npm 包：是实际的 Lint 规则以及我们 Lint 的时候控制代码如何进行格式化的。

IDE 插件：

- 调用项目或者全局的 ESLint 通过 ESLint 规则告诉 IDE 哪些地方需要标红；
- 通过 IDE 配置在不同时机执行我们的 Lint，比如自动格式化。解析文件，和规则对比查看是否存在 ESLint 问题

## 怎么使用

配置完，自动对当前文件生效。还可以通过命令的方式执行 ESLint

```json
  "scripts": {
    "lint": "eslint --fix --ext .js,.vue src/",
  },
```

- --fix 表示运行 ESLint 时自动修复可以修复的错误。
- --ext .js,.ts,.tsx 指定要检查的文件拓展名
- src/ 指定要检查的文件或者目录的路径。

通过以下几种方式配置，按照优先级如下：

1. `.eslintrc.js`
2. `.eslintrc.yaml`
3. `.eslintrc.yml`
4. `.eslintrc.json`
5. `.eslintrc`
6. `package.json`

## 工作原理

1. 把源码通过编译器(Espree) 生成 AST
2. 遍历 AST，如果某个 AST 满足 ESLint 规则，就上报，并提供一个修复函数。eslint 包中 SourceCode，里面有很多方法。

[ESLint 机制分析与简单插件实践](https://zhuanlan.zhihu.com/p/605859109)

## 写一个 eslint-plugin-x

```js
// lib/rules/no-preact.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "disallow import from 'preact'",
      category: 'Possible Errors',
    },
    fixable: 'code',
    // 传递给规则的参数，写法是下面的方式
    schema: [
      {
        type: 'object',
        properties: {
          objName: {
            type: 'string',
          },
          propNames: {
            type: 'array',
          },
          commentName: {
            type: 'string',
          },
        },
      },
    ],
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'preact') {
          context.report({
            node,
            message: "Import from 'preact' is not allowed",
            fix: function (fixer) {
              return fixer.replaceText(node.source, 'react');
            },
          });
        }
      },
    };
  },
};
```

### meta

meta 属性包含了关于这条规则的元信息，**描述了规则的一些特性和用途**，具体包括：

- type: 规则的类型，这影响着 ESLint 如何使用这条规则。
  - problem: 表示这条规则识别出的问题表明了代码中的一个错误或问题部分，这是可能会影响代码运行或造成错误的。
  - suggestion: 这是表明代码可以优化以提升质量或修复可能不一致的编码风格问题。
  - layout: 表明问题与代码的格式或者风格有关，跟代码正确运行不直接相关。
- docs: 包含了关于规则的文档资料，通常用于生成规则文档。它有以下属性：
  - description: 对规则的简短描述，说明了这条规则的作用。
  - category: 规则所属的分类，帮助用户在配置 ESLint 时更好地理解和选择规则。
- fixable: 指明了此规则是否可以通过 ESLint 的--fix 选项自动修复。如果可以自动修复，需要指明是那一类修复类型，典型值是"code"或"whitespace"。
  - "code": 表示规则可以自动修复源码问题。
  - "whitespace": 表示规则可以自动修复代码中的空格问题。
- schema: 描述了规则的配置选项，如果规则没有配置选项，这个数组可以留空。如果有参数，配置的时候就需要这么写
  -messages: message 的对象，在调用 context.report 时可以使用 messageId 来映射到 messages 对象中。

  ```JavaScript
    rules: {
          // 你的具体开启的规则
          'myCustomPlugin/myRule': [
              'error',
              // 你的规则参数
              {
                  objName: 'test',
                  propNames: 'testCall',
                  commentName: '$test'
              }
          ],
      },
  ```

### create

create 方法：参数为 context。常用的属性为

- report 方法
  - node: 发生问题的节点，用于报告具体哪一部分的代码出现问题。
  - message: 当规则违反时要展示给用户的信息。
  - fix: 一个函数，其参数为 fixer 对象，它具有方法可用来创建修复的文本。在示例中，如果检测到从 preact 导入，fix 函数将会替换整个导入语句为相应的 react 导入语句。

这个简单的规则模板可以扩展为更复杂的逻辑，例如更精确地定位导入语句的特定部分并进行修复，或支持更多的配置选项。规则配置的能力和灵活性使 ESLint 成为了非常强大的代码质量和风格的工具。

这里还可以使用 4.0 以后的选择器语法（Selectors），类似于 CSS 选择器。

[eslint selectors](https://eslint.org/docs/latest/extend/selectors)

```JavaScript
module.exports = {
  create(context) {
    // ...

    return {

      // This listener will be called for all IfStatement nodes with blocks.
      "IfStatement > BlockStatement": function(blockStatementNode) {
        // ...your logic here
      },

      // This listener will be called for all function declarations with more than 3 parameters.
      "FunctionDeclaration[params.length>3]": function(functionDeclarationNode) {
        // ...your logic here
      }
    };
  }
};
```

### 调试

在 `.eslintrc` 的配置文件下需要使用 npm link 的方式来

## QA

1. eslintrc.js 为啥要用 CMD 的导出方式 eslintrc.js 是 eslint 的配置文件，里面要使用 CMD 的方式导出模块，因为 eslint 是基于 Node.js 的

2. ESLint 为什么和 Prettier 冲突 Linters 可能会与 Prettier 冲突。因为：Linters 不仅包含代码质量的规则，还可以包含格式化的规则。可以使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 这样的方案来避免。

3. 可以只用 ESLint 代替 Prettier 利用插件可以让您像运行 linter 规则一样运行 Prettier：这样不行的原因是：

   - 你会看到很多波浪线
   - 会比较慢

4. 在写插件的时候没有提示，怎么解决。
   可以使用 `/** @type {import("eslint").Rule.RuleModule} */`
