# ECMAScript2021

## 空值合并赋值操作符号 `??=`

只有当前值为 null 或者 undefined 的时，它才会赋值一个新的值。

```typescript
// Old way (pre-2021)
if (user.name === null || user.name === undefined) {
  user.name = 'Anonymous';
}

// Or using the nullish coalescing operator (??)
user.name = user.name ?? 'Anonymous';

// New way (ES2021 and later)
user.name ??= 'Anonymous';
```
