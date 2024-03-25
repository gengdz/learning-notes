# eslintrc 相关配置

```javascript
module.exports = {
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    './my-rules.js',
    'eslint-config-prettier',
  ],
  rules: {
    'no-return-await': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react/no-find-dom-node': 'off',
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'es', 'lib', 'logs', 'coverage'],
};
```

## 配置项说明

### extends

通过 extends 继承的配置不仅可以包含规则（rules）集合，还可以包含配置的其他方面，如环境（env）、插件（plugins）、全局变量（globals）和解析器选项（parserOptions）。这意味着当你通过 extends 继承一个共享配置时，**你实际上是在继承整个 ESLint 配置对象**。

- 预定义规则集： `eslint:recommended` 是 ESLint 官方推荐的一组配置。 是 ESLint 的内置配置，不需要单独安装。
- 插件规则集：**使用 `plugin:` 前缀来引用某个 ESLint 插件的规则集**。例如，使用 `plugin:react/recommended` 引用 eslint-plugin-react 插件的规则集。
- 自定义规则集：自己创建规则，并在 extends 中引用。`./my-rules.js`

**后面的规则会覆盖前面的**。

### rules

配置具体的规则，可以禁用、启用或者覆盖错误等级。

```json
{
  "prettier/prettier": "error"
}
```

含义：如果代码与 prettier 的规范不一致，ESLint 将会在代码检查的过程中抛出一个错误，提示你进行修复。

`plugin:prettier/recommended` 规则集已经包含了 `"prettier/prettier": "error"` 的设置，因此你无需再次指定该规则。

### plugins

指定使用的插件。

插件名中 `eslint-plugin-` 的前缀可以被省略。`eslint-plugin-plugin2` 可以写成 `plugin2`

ESLint 查找插件的规则：

1. 尝试加载 `eslint-plugin-<plugin-name>` 插件。
2. 如果未找到匹配的插件，尝试加载 `<plugin-name>` 插件。

### ignorePatterns

- `ignorePatterns` 属性是 ESLint 7.0.0 版本引入的新属性
- `ignorePatterns` 和 `.eslintignore` 都用于配置哪些文件或目录应该被 ESLint 忽略，因此它们的作用是类似的。

## 插件

### `eslint-config-prettier` 的作用

用于解决 ESLint 和 Prettier 之间的冲突问题。它可以让 ESLint 禁用与 Prettier 重复的或有冲突的规则，以确保代码格式化一致性。

### `eslint-plugin-prettier` 的作用

它使 ESLint 和 prettier 工具集成，提供了在 ESLint 中使用 prettier 的功能。使得在代码检查的同时也能自动格式化代码。

1. 可以通过 extends 属性继承 plugin:prettier/recommended 规则集，该规则集已经包含了与 prettier 兼容的规则。 所以安装了`eslint-plugin-prettier` 就不用安装 `eslint-config-prettier` 了

## eslint-config-xx 和 eslint-plugin-xx 的使用场景

如果您需要定义新的规则或为 ESLint 增加额外的功能，您应该创建一个 eslint-plugin-xx 插件。

如果您只是想分享或统一规则配置，您应该创建一个 eslint-config-xx 包。

创建 eslint-plugin-xx：

- 当你需要定义新的自定义规则时。如果 ESLint 的内置规则或现有插件不符合你的特定需求，你可以创建自己的插件来实现这些规则。
- 当你想要添加对新的或自定义 JavaScript 特性或框架的支持时。例如，对某个特定的框架或者库定义最佳实践规则。
- 插件还可以提供自定义的环境、配置和处理器，这些在 ESLint 的核心中未被定义。

创建插件涉及：

- 编写规则逻辑。
- 编写测试用例确保规则按预期工作。
- 配置插件的元数据，以告诉 ESLint 如何使用这些规则。

创建 eslint-config-xx：

- 当你想要分享或重用一组 ESLint 规则配置时。如果你有一套自定义的规则配置，你认为它们对其他项目也会有用，你可以创建一个配置包来分享这些规 ules。
- 当你在多个项目间统一代码风格和规则时。例如，在一个大型组织中，为了保持代码的一致性和可维护性，共享配置是非常有用的。
- 配置包可以依赖于一个或多个插件，并可以包括规则、环境、全局变量和解析器选项的设置。

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
    schema: [],
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
- schema: 描述了规则的配置选项，如果规则没有配置选项，这个数组可以留空。

### create

create 方法：参数为 context。常用的属性为

- report 方法
  - node: 发生问题的节点，用于报告具体哪一部分的代码出现问题。
  - message: 当规则违反时要展示给用户的信息。
  - fix: 一个函数，其参数为 fixer 对象，它具有方法可用来创建修复的文本。在示例中，如果检测到从 preact 导入，fix 函数将会替换整个导入语句为相应的 react 导入语句。

这个简单的规则模板可以扩展为更复杂的逻辑，例如更精确地定位导入语句的特定部分并进行修复，或支持更多的配置选项。规则配置的能力和灵活性使 ESLint 成为了非常强大的代码质量和风格的工具。
