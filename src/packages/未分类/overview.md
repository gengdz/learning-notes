# 概览

## zod

[colinhacks/zod: TypeScript-first schema validation with static type inference](https://github.com/colinhacks/zod)

Zod 是一个 TypeScript-first 的模式验证库，提供了一个简单的 API 来定义和验证数据结构。它支持复杂的嵌套对象、数组、联合类型等，并且可以与 TypeScript 的类型系统无缝集成。

```typescript
import * as z from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
});
const user = UserSchema.parse({
  name: 'John Doe',
  age: 30,
  email: '',
});
console.log(user); // { name: 'John Doe', age: 30, email: '' }

// 使用 safeParse
const result = UserSchema.safeParse({
  name: 'Jane Doe',
  age: 25,
  email: '',
});
if (result.success) {
  console.log(result.data); // { name: 'Jane Doe', age: 25, email: '' }
} else {
  console.error(result.error.errors); // 输出验证错误
}

// 验证失败会抛出错误
try {
  UserSchema.parse({
    name: 'John Doe',
    age: -1, // 错误：年龄必须是正整数
    email: 'invalid-email',
  });
} catch (e) {
  console.error(e.errors); // 输出验证错误
}
```

## `zod-schema-faker`

[soc221b/zod-schema-faker: Generate mock data from zod schemas. Powered by @faker-js/faker and randexp.js.](https://github.com/soc221b/zod-schema-faker)

`zod-schema-faker` 是一个用于从 Zod 模式生成虚假数据的库。它基于 `@faker-js/faker` 和 `randexp.js`，可以根据定义的模式生成符合要求的随机数据。

```typescript
import { z } from 'zod';
import { fake, install } from 'zod-schema-faker';
const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
});
```

## `@faker-js/faker`

[faker-js/faker: Generate massive amounts of fake data in the browser and node.js](https://github.com/faker-js/faker)
`@faker-js/faker` 是一个用于生成大量虚假数据的库，适用于浏览器和 Node.js。它可以生成姓名、地址、公司、日期等各种类型的数据，非常适合用于测试和开发。

```typescript
import { faker } from '@faker-js/faker';
// 生成一个随机姓名
const name = faker.person.fullName();
// 生成一个复杂对象
const user = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: {
    street: faker.location.street(),
    city: faker.location.city(),
    country: faker.location.country(),
  },
  dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
};
```

## `tailwind-merge`

[dcastil/tailwind-merge: Merge Tailwind CSS classes without style conflicts](https://github.com/dcastil/tailwind-merge)
`tailwind-merge` 是一个用于合并 Tailwind CSS 类的工具，能够自动处理类之间的冲突，确保最终生成的类列表是有效的。它可以帮助开发者避免手动处理类冲突，提高开发效率。

- 智能合并同类样式
  - 例如：`bg-red-500 bg-blue-500 hover:bg-green-500` 会合并为 `bg-blue-500 hover:bg-green-500`，因为 `bg-red-500` 被 `bg-blue-500` 覆盖。
  - 确保最终样式符合 CSS 层叠规则
- 解决冲突
  - 当多个类具有相同的样式属性时，`tailwind-merge` 会根据 Tailwind CSS 的优先级规则自动选择正确的类。
- 简化动态类拼接
  - 自动处理条件渲染、状态拼接等场景下的类名冗余。

```typescript
import { twMerge } from 'tailwind-merge';
const className = twMerge('bg-red-500', 'bg-blue-500 hover:bg-green-500');
console.log(className); // 输出: 'bg-blue-500 hover:bg-green-500'
```

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## `clsx`

类似于 `classnames`，更小更快，Next.js 官方推荐的类名处理库。

## `class-variance-authority`

[joe-bell/cva: Class Variance Authority](https://github.com/joe-bell/cva#readme)
`class-variance-authority` 是一个用于处理类名变体的库，允许开发者定义组件的不同变体和状态，并根据这些变体生成相应的类名。它可以帮助开发者更好地管理组件的样式变体，提高代码的可读性和可维护性。

```typescript
import { cva } from 'class-variance-authority';
const button = cva('px-4 py-2 font-semibold rounded-lg', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-black',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});
const className = button({ variant: 'secondary', size: 'large' });
console.log(className); // 输出: 'px-4 py-2 font-semibold rounded-lg bg-gray-500 text-black text-lg'
```
