# vm

vm(Virtual Machine): 利用 V8 引擎提供的能力来创建独立的执行环境（沙箱），从而为在服务器端运行 JavaScript 代码提供了一个安全的方式。通过这种机制，开发者可以隔离代码执行的上下文，保护主应用免受潜在不安全或不受信任代码的影响。

## 作用

- 执行代码隔离：在沙箱中运行脚本，不会直接污染全局作用域或影响运行中的 Node.js 应用的上下文。
- 控制上下文：可以为每个脚本执行设置独立的上下文，控制变量和函数的作用域范围。
- 安全性增强：通过隔离上下文、防止直接访问外部环境，vm 模块提高了代码执行的安全性。

## 主要方法

- vm.Script: 编译和运行代码的方法
- vm.createContext: 创建新的上下文(沙箱)对象。
- vm.runInContext: 在给定的上下文中运行代码

## 用法示例

```typescript
const vm = require('vm');

// 创建一个脚本
const script = new vm.Script('x + 2');

// 创建一个隔离的上下文
const sandbox = { x: 1 };
const context = vm.createContext(sandbox);

// 在上下文中运行脚本
const result = script.runInContext(context);

console.log(result); // 输出: 3
console.log(sandbox.x); // 输出: 1，因为沙箱环境不会修改外部的 x 变量
```
