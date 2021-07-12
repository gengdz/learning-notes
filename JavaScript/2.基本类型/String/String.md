# String

## 截取字符串

### `substring()`
```typescript
substring(start: number, end?: number): string;
```
* 截取字符串
* 包含 start，不包含 end
* 不会改变原数组
* 如果只有 start，那么将从 start 开始，截取到最后
```js
const str = 'gengdezhou'
console.log(str.substring(2, 5), str) //=> ngd gengdezhou 
console.log(str.substring(2), str) //=> ngdezhou
```


### `substr()`
```typescript
substr(from: number, length?: number): string;
```
* 截取字符串
* 包含 from，第二个参数为截取的长度
* 如果只有 from，那么将从 from 开始，截取到最后

```js
console.log(str.substr(2, 3), str) //=> ngd gengdezhou
console.log(str.substr(2), str) //=> ngdezhou gengdezhou
```


### `slice()`
用法和数组的一样



## 字符串补全
对字符串进行补全。

### `padStart()`
```typescript
padStart(maxLength: number, fillString?: string): string;
```
* 不会改变原字符串
* 第一个参数为补全之后字符串的长度
* 第二个参数为用来补全的字符串

```js
console.log(str.padStart(100, '   xx  '), str);
console.log(str.padEnd(100, '   xx  '), str);
```


### `padEnd()`
```typescript
padEnd(maxLength: number, fillString?: string): string;
```

用法和上面一样，只是字符串补全的位置不同



## 移除空白
### `trim()`
移除**左右两边**的空白

### `trimStart()`
移除**开始位置**的空白

### `trimEnd()`
移除**结束位置**的空白