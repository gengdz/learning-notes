# String

## `replace()`

### 指定字符串作为替换项

替换字符串可以包括以下特殊替换模式：

| 模式 | 插入值                                                          |
| ---- | --------------------------------------------------------------- |
| $$   | 插入一个 "$"。                                                  |
| $&   | 插入匹配的子字符串。                                            |
| $`   | 插入匹配子字符串之前的字符串片段。                              |
| $'   | 插入匹配子字符串之后的字符串片段。                              |
| $n   | 插入第 n（索引从 1 开始）个捕获组，其中 n 是小于 100 的正整数。 |
| $    | 插入名称为 Name 的命名捕获组。                                  |

```ts
'foo'.replace(/(f)/, '$2');
```

### 指定函数作为替换项

你可以将第二个参数指定为函数。在这种情况下，匹配完成后将调用该函数。函数的结果（返回值）将用作替换字符串。

:::info
上述特殊替换模式不适用于替换器函数返回的字符串。
:::

```ts
// 使用函数进行替换
let text3 = 'John Smith';
let newText3 = text3.replace(/(\w+)\s(\w+)/, (match, p1, p2) => {
  return `${p2}, ${p1}`;
});
console.log(newText3); // 输出：Smith, John
```

## 截取字符串

### `substring()`

```typescript
substring(start: number, end?: number): string;
```

- 截取字符串
- 包含 start，不包含 end
- 不会改变原数组
- 如果只有 start，那么将从 start 开始，截取到最后

```javascript
const str = 'gengdezhou';
console.log(str.substring(2, 5), str); //=> ngd gengdezhou
console.log(str.substring(2), str); //=> ngdezhou
```

### `substr()`

```typescript
substr(from: number, length?: number): string;
```

- 截取字符串
- 包含 from，第二个参数为截取的长度
- 如果只有 from，那么将从 from 开始，截取到最后

```javascript
console.log(str.substr(2, 3), str); //=> ngd gengdezhou
console.log(str.substr(2), str); //=> ngdezhou gengdezhou
```

### `slice()`

用法和数组的一样

## 字符串补全

对字符串进行补全。

### `padStart()`

```typescript
padStart(maxLength: number, fillString?: string): string;
```

- 不会改变原字符串
- 第一个参数为补全之后字符串的长度
- 第二个参数为用来补全的字符串

```javascript
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
