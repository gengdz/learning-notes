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
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'es',
    'lib',
    'logs',
    'coverage',
  ],
};
```

## 配置项说明

### extends

指定要继承的规则集。

预定义规则集： `eslint:recommended` 是 ESLint 官方推荐的一组配置。 是 ESLint 的内置配置，不需要单独安装。
插件规则集：**使用 `plugin:` 前缀来引用某个 ESLint 插件的规则集**。例如，使用 `plugin:react/recommended` 引用 eslint-plugin-react 插件的规则集。
自定义规则集：自己创建规则，并在 extends 中引用。`./my-rules.js`

后面的规则会覆盖前面的。

### rules

配置具体的规则，可以禁用、启用或者覆盖错误等级。

```json
{
  "prettier/prettier": "error"
}
```

含义：如果代码与 prettier 的规范不一致，ESLint 将会在代码检查的过程中抛出一个错误，提示你进行修复。
`plugin:prettier/recommended` 规则集已经包含了 `"prettier/prettier": "error"` 的设置，因此你无需再次指定该规则。

### plugins:

指定使用的插件。
插件名中 `eslint-plugin-` 的前缀可以被省略。`eslint-plugin-plugin2` 可以写成 `plugin2`

ESLint 查找插件的规则：

1. 尝试加载 `eslint-plugin-<plugin-name>` 插件。
2. 如果未找到匹配的插件，尝试加载 `<plugin-name>` 插件。

### ignorePatterns

`ignorePatterns` 属性是 ESLint 7.0.0 版本引入的新属性
`ignorePatterns` 和 `.eslintignore` 都用于配置哪些文件或目录应该被 ESLint 忽略，因此它们的作用是类似的。

## 插件

### `eslint-config-prettier` 的作用

用于解决 ESLint 和 Prettier 之间的冲突问题。它可以让 ESLint 禁用与 Prettier 重复的或有冲突的规则，以确保代码格式化一致性。

### `eslint-plugin-prettier` 的作用

它使 ESLint 和 prettier 工具集成，提供了在 ESLint 中使用 prettier 的功能。使得在代码检查的同时也能自动格式化代码。

1. 可以通过 extends 属性继承 plugin:prettier/recommended 规则集，该规则集已经包含了与 prettier 兼容的规则。 所以安装了`eslint-plugin-prettier` 就不用安装 `eslint-config-prettier` 了
