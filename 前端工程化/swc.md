# swc

swc(Speedy Web Compiler)是一个用 Rust 编写的速度非常快的 TypeScript/JavaScript 编译器

对标的是 Babel

## 为什么快

1. 使用 Rust 编写。语言优势。
2. 优化了编译器算法。使用了 实时编译和并行编译等。
3. WebAssembly 的加持。 SWC 把 WebAssembly 作为编译目标。

## swc 的遍历

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

巧妙的利用了 for 循环，可以同时遍历数组和对象。
