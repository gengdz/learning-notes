# React和TS

## React.FC<IProps> 和 Card.PropTypes的区别
**前者在编译的时候生效，后者在 *runtime* 的时候生效**



## 获取某个组件的 props 类型
如何在一个三方包里面找一个类型，一般有两个位置：
1. `import { ButtonProps } from '@alifd/next/types/button';`
2. `import { columnItem } from '@alife/whale-tablex/lib/components/WhaleTable';`

还有一种方式获取一个组件的Props
```typescript
type AA = React.ComponentPropsWithoutRef<typeof SchemaForm>;
```