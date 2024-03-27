# TypeScript 入门

> 作者：星涯<br/> TL;DR<br/> 阅读并理解全文需要大概 20 分钟<br/> 阅读完成后你将了解到：
>
> - [x] TypeScript 的基础知识
> - [x] 如何在财鲸项目中使用 TypeScript
>
> 如果你不想了解细节原理，可以直接跳转到「TypeScript 结合 React 使用」章节查看具体实现。

[toc]

## TypeScript 是什么？

TypeScript 是 JavaScript 的超集。这意味着你可以在 TypeScript 中使用所有你学到的 JavaScript 的知识。

那么 TypeScript 比 JavaScript 多了哪些内容呢？

- 类型系统。
- 下一代 JavaScript 的新特性。
- TypeScript 赋予的一些新特性。如「接口」和「泛型」。
- 元编程特性。如装饰器。一些库大量用到了这个特性，如：Angular、MobX。
- 更多的配置。
- 更智能的编辑器。TypeScript 适合开发者在任意规模的项目中使用。 它能帮助开发者在开发阶段发现问题；可以让代码的可读性更好；完善的类型提示可以带给开发者更好的编程体验。

## TypeScript 基础知识

### 基础类型

JavaScript 的类型分为两种：原始数据类型，对象类型

- 原始数据类型：`boolean`、`number`、`string`、`null`、`undefined`、`Symbol`、`BigInt`
- 对象类型：`Array`、`Function`、`Date`、`RegExg`

在 TypeScript 中使用下面的方式表达 JavaScript 中的「原始数据类型」

```typescript
// boolean
const bool: boolean = false;

// number
const num: number = 1;

// string
const str: string = 'str';
```

使用上面这种方式就可以定义类型了。其实上面的示例中不写类型定义，TypeScript 依然能够正确推导出变量的值！所以**原始数据类型就不需要显式定义类型了**。

TypeScript 对 JavaScript 的类型进行拓展，增加了 `any`、 `unknown`、`void`、`never`、`Enums`、`Tuple`类型。

#### any

any 表示任意类型，当你不希望一个值导致类型检查错误的时候，就可以设置为 any 。

如果一个变量是 any 类型，那么它可以被赋予任何值，同样也可以使用任意属性和方法（「可以」表示这么写不会报类型错误，但不代表真的能工作！）。

这是一个几乎在任何场景下都不被推荐使用的类型，TypeScript 到 AnyScript 只需要写很多 any 类型！

不过也正因为有 any 的存在，才使得 TypeScript 的上手成本被降到很低，因为最差就是写 any 了，当知道这一段代码的类型怎么写的时候可以把类型再修正回来。

如果你明确知道代码没有问题，基于一些原因又不想写类型代码时，可以使用 any 让 TypeScript 知道这段代码没有问题。

#### unknown

`unknown` 可以表示任意类型，任何类型都能分配给 `unknown`，但 `unknown` 不能分配给其他基本类型，只能赋值给 `any` | `unknown` 。而 `any` 所有类型都能分配和被分配。

`unknown` 在使用前必需显示进行指定类型，或者在有条件判断情况下隐式的进行类型推断。

下面代码中 data 是 unknown 类型的变量

- 我们可以把任何类型赋值给它。
- 但是不能把它赋值给其他类型。比如说 data 赋值给 string 类型的 data2 就会报错的。

```typescript
let data: unknown;
data = true; // ok
data = 2222; // ok

let data2: string = data; // error
```

unknow 和 any 的区别在于：

- any 表示完全放弃了类型检查，并且基于它操作衍生出来的值也都是 any。
- unknow 表示自己有类型但是不知道是什么，需要用的时候指定好类型。

#### void

表示没有任何类型，一般用来表示函数没有返回值。

```typescript
const showName = (name: string): void => {
  console.log(name);
};
```

#### never

提示：了解有这个概念即可！由于它在业务代码中出现频率很低，所以不建议在入门阶段花时间深度阅读 never！这里写 never 是为了知识体系的完整性。

表示一个不可能存在的状态。

除 never 类型外，任何类型都不是 never 的子类型，也不能赋值给 never 类型的变量。

never 一般在两个场景中使用

- 在函数中使用。
  - 函数无法返回。（如无限循环、抛出异常）
  - if...else 或者 switch...case 保证分支情况被完全穷尽。
- 在工具类型中。
  - 裁剪某些属性。

#### Enums

枚举是为一组值取更好理解的名字，通常用来定义一组常量，一旦定义就不可改变。

比如表单有几种状态：新增、编辑、预览，在提交表单的需要加上表单状态，上述状态对应的值分别是："0"、"1"、"2"。这时候页面中就会存在这种魔法变量，不利于自己后期理解和新同学快速接入，这时候就可以采用枚举。

在 TypeScript 中，枚举分为很多种如：数字枚举、字符串枚举。定义字符串枚举的方式如下：

```typescript
enum FormStateEnum {
  FormStateAdd = '0',
  FormStateEdit = '1',
  FormStateView = '2',
}
```

这里需要说明的一点：尽管大小写都可以工作，但是无论是枚举名称，还是枚举成员名都只推荐使用 大驼峰 的命名方式：AxxxBxxxCxx。

#### Tuple

数组合并了相同类型的对象，元组 合并了不同类型的对象。 元组的长度是有限的，可枚举的

```typescript
// 姓名 年龄 工号
const people: [string, number, number] = ['星涯', 18, 348551];
```

- 声明的时候，前面定义的类型和后面的值类型要对应上。
- 【不推荐】添加新元素时，其类型为元组中每个类型的联合类型。 在上面的示例中，新增的元素，类型将是：string | number。
- 元组元素可以是可选的。方式如下：people: [string, number?, number?]。

### 类型别名 type

类型别名 type：就是 给类型起个别名。使用关键字 type。

还有一种意思是：TypeScript 允许定义不在基本类型中的类型。

比如：type StringOrNumber = string | number。

```typescript
// string | number 就称为联合类型、
// StringOrNumber 就是给联合类型起个别名
type StringOrNumber = string | number;

// 下面是正常使用
let myNameOrAge: StringOrNumber = 18;
myNameOrAge = '星涯';
```

### 接口 interface

interface 用来：对 对象的形状 进行描述；对 类的一部分行为 进行抽象。

```typescript
interface IStaff {
  name: string;
  age: number;
  staffId?: number;
}
staffId?: number;表明 staffId 属性是可选的。

```

### 对象

可以通过 3 种方式定义对象的类型：

- 匿名形式
- interface
- type

```typescript
// 1. 匿名形式
const obj1: { name: string; age: number; staffId: number } = {
  name: '星涯',
  age: 18,
  staffId: 348551,
};

// 2. interface
interface IStaff {
  name: string;
  age: number;
  staffId: number;
}
const obj2: IStaff = {
  name: '星涯',
  age: 18,
  staffId: 348551,
};

// 3. type
type Staff = {
  name: string;
  age: number;
  staffId: number;
};
const obj3: IStaff = {
  name: '星涯',
  age: 18,
  staffId: 348551,
};
```

### 数组

推荐使用 类型[]的方式定义数组的类型。

```typescript
const arr1: string[] = ['a', 'b'];
```

### 函数

下面是函数常见的几种定义

```typescript
// function
function sum1(x: number, y: number): number {
  return x + y;
}

// 箭头函数
const sum2 = (x: number, y: number) => x + y;

// 箭头函数 另一种方式
const sum3: (x: number, y: number) => number = (x, y) => x + y;

// 可选参数
const sum4 = (x: number, y: number, z?: number) => x + y + (z || 0);

// 默认值
const sum5 = (x: number, y: number, z = 0) => x + y + z;
```

### 泛型

在定义函数、接口、类的时候，不预先指定具体的类型，而在使用的时候再指定的一种特性。

```typescript
// function
function fn1<T>(x: T, y: T) {
  return `${x} - ${y}`;
}
fn1<number>(1, 2);
fn1('1', '2'); // 能自动推测出 T 为 string
fn1(1, '1'); // 会报错。 Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// 箭头函数 方式 1
const fn2: <T>(x: T, y: T) => string = (x, y) => `${x} - ${y}`;
fn2(1, 2);

// 箭头函数 方式 2
const fn3 = <T>(x: T, y: T) => `${x} - ${y}`;
fn3(1, '1'); // 会报错。 Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

## TypeScript 结合 React 使用

通过上面章节的介绍，我们已经基本了解了 TypeScript 的用法，下面介绍如何在 React 中 使用 TypeScript。

### 定义函数组件

在定义函数组件的方式中，我们有两种方式：

- 箭头函数方式（`FC<P>`）。
- function 方式。函数组件本质是一个函数，函数有两种定义方式，所以相应的函数组件也就有了两种方式。

#### `FC<P>`方式

用来声明一个函数式组件，表明这是一个 React 函数组件。

这是 React 内置的类型，可以看到它是支持泛型的。

```typescript
const StaffInfo1: React.FC = () => {
  return <div>hello</div>;
};

```

这种方式和「泛型」章节中提到的示例是类似的：

```typescript
const fn2: <T>(x: T, y: T) => string = (x, y) => `${x} - ${y}`;
```

#### function 方式

```typescript
function StaffInfo2() {
  return <div>hello</div>;
}
```

### 定义组件 Props

组件 Props 是一个对象，那么定义组件 Props 的方式就是定义对象的方式。

通过「对象」章节的描述，我们知道定义对象的方式有三种，所以定义组件 Props 的方式就有三种。

在上一节「定义函数组件」中，我们的组件都没有 Props，那么如果组件有 Props 形式可以如下：

```typescript
// 匿名方式
const StaffInfo3: React.FC<{ name: string }> = props => {
  const { name } = props;
  return <div>{name}</div>;
};

// interface 形式
interface ISatffInfo4 {
  name: string;
}
const StaffInfo4: React.FC<ISatffInfo4> = props => {
  const { name } = props;
  return <div>{name}</div>;
};

// type 形式
type TStaffInfo5 = {
  name: string;
};
const StaffInfo5: React.FC<TStaffInfo5> = props => {
  const { name } = props;
  return <div>{name}</div>;
};

```

在定义 Props 的时候，我们可能还会用到更多类型，比如 boolean、number 等。下面再介绍一些 React 中内置的类型。

- ReactNode 用来表示一段 React 可以直接渲染的内容，如：JSX、string 等。
- CSSProperties 用来定义样式。
- `PropsWithChildren<P>`表示组件带有 children 。
- `PropsWithoutRef<P>`表示组件没有 ref。

下面是上述几种内置类型的综合使用

```typescript
type StaffInfoProps = {
  name: string;
  content: React.ReactNode;
  style?: React.CSSProperties;
};
const StaffInfo: React.FC<StaffInfoProps> = props => {
  const { name, content, style } = props;
  return (
    <div style={style}>
      {name}
      <div>{content}</div>
    </div>
  );
};

function Basic(props: React.PropsWithoutRef<{ name: string }>) {
  const { name } = props;
  return (
    <StaffInfo
      name={name}
      style={{ padding: 10 }}
      content={
        <div>
          <h3>个人介绍</h3>
          <p>这是一个 18 岁的小伙子</p>
        </div>
      }
    />
  );
}

```

### 显式定义 Hooks 类型

显式定义是指人为指定值的类型，相对的是隐式定义（自动推导）的方式。

React 可以根据初始值自动推导出 Hook 值类型，如果初始值类型就是目标类型，那么就不需要显式的定义了；如果初始值类型不是目标类型，那么就需要显示的声明了。

```typescript
// 【不推荐】可以根据 0 推导出 number，并且 number 也是目标类型，那么没必要再显式定义
const [count, setCount] = useState<number>(0);

type Data = {
  name?: string;
  age: number;
};

// 在一些情况下，我们给了一个初始值，但是初始值不是目标值，那么就需要使用显式定义的方式
const inputRef = useRef<HTMLInputElement>(null);
```

### 定义请求的入参和结果

在请求函数中定义请求的入参和返回结果类型，这样在使用的时候就会有类型提示。

下面代码中我们定义了「获取员工信息」的入参类型和返回值类型，在使用的时候，如果入参类型不对，那么就会报错，同时在 then 函数中消费返回值数据时，也会有类型提示。

```typescript
interface IStaffInfo {
  realname: string;
  nickname: string;
  staff_id: string;
}

// 获取员工信息
async getStaffInfo(staffId: string) {
  return (await request({
    url: '/api/staffInfo',
    data: { staffId },
  })) as IStaffInfo;
},

// 使用接口
useEffect(() => {
  api.getStaffInfo('348551').then(info => {
    console.log(info.realname);
  });
}, []);
```

### 使用组件库的类型

有的组件库也会导出组件的类型，这样我们在定义具体属性的时候就可以使用组件库中对应的类型。

```typescript
import React from 'react';
import { ProTable, ProTableColumnProps } from '@alife/whale-ui';

export default function MyTable() {
  const dataSource = [{ name: '星涯', staffId: '348551' }];

  const columns: ProTableColumnProps[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '工号',
      dataIndex: 'staffId',
    },
  ];

  return <ProTable dataSource={dataSource} columns={columns} />;
}
```

如果组件库没有明确导出类型，还可以尝试下面的方式

```typescript
import { ProDataSource } from '@alife/whale-ui/es/pro-table/types';
```

## 更多资料

- TypeScript 官网文档
- 阿里巴巴前端规约 - TypeScript 编码规约
