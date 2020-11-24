# require.context

## 作用
自动化导入多个文件

## 语法
```typescript
require.context(path: string, deep?: boolean, filter?: RegExp, mode?: "sync等"): RequireContext;
```
输入：
* path：目录路径
* deep: 是否递归遍历子目录
* filter：需要什么样子的文件（正则）

输出：
输出为一个函数。这个函数拥有3个属性
* keys: 相对文件名
* resolve: 具体文件名
* id



## 使用姿势
```javascript
// context 是一个函数
const context = require.context('@/services/V2/', true, /\.ts$/);

const serviceMoudules = context
  .keys()
  .filter(item => item !== './index.ts')
  .map(context)
  .reduce((acc, cur) => Object.assign(acc, cur), {});

console.log('llllll', serviceMoudules);

export default serviceMoudules;
// export default { ...serviceMoudules };
```

## 问题
### ts提示 context 不存在的问题
```bash
tnpm i @types/webpack-env @types/node -D
```

### 致命问题
在ts中导出的内容在使用的时候，没有ts提示！！！还没找到破解方法
```typescript
```