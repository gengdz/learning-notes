# 复杂表单解决方案 FormilyJS

> 作者：星涯<br/>
> TL;DR<br/>
>阅读并理解全文需要大概 15 分钟<br/>
>阅读完成后你将了解到：
>* [x] Formily 是什么以及 Formily 的一些核心概念
>* [x] 如何使用 Formily 在财鲸项目中新建一个表单
>* [x] 了解和使用 Formily 开发者工具 
>
>如果你不想了解细节原理，可以直接跳转到「使用 Formily 新建一个表单」章节查看具体实现。

[toc]

## Formily 是什么？
Formily 是阿里数字供应链团队开发的一款面向中后台复杂表单场景的表单解决方案，它也是一个表单框架。

Formily 适合用在项目中存在复杂表单的场景，解决表单性能差，表单逻辑多且复杂的问题，得益于 Formily 优雅的设计思路，借助 Formily 还可以实现 表单的场景化复用 、动态配置表单 等诉求。但是 Formily 有一个核心劣势：有较高的学习成本。

## Formily 核心概念

### 字段状态分布式管理
字段状态分布式管理是相对 React 中单向数据流而言的。

单向数据流：数据同步靠根组件重绘来驱动，子组件重绘受根组件控制。

状态分布式管理就是：数据同步靠根组件广播需要更新的子组件重绘，根组件只负责消息分发。

其实，前者跟后者还是有一定的相同之处的，比如根组件都是消息的分发中心，只不过分发的形式不一样，一个是靠组件树重绘来分发消息，一个是通过 pub/sub 来广播消息，让子组件自己重绘。数据流，还是一个中心化的数据管理流，只是分发的形式不一样，就这样的差别，却可以让整个 React 应用性能提升数倍。

要做到字段分布式管理，对组件的要求是要满足 value/onChange 的结构。

这就是 Formily 性能高的原因。

### JSON Schema
JSON Schema 是 Formily 中用来描述表单项的。

Formily 是通过协议驱动的方式来做的。Formily 的表单协议是在数据协议 JSON-Schema 上做扩展，使用 JSON-Schema 原有能力描述数据结构，用以x-*格式的拓展属性来描述 UI。

通过这种方式还可以做到动态配置表单。

schema 的结构类似下面：
```typescript
const schema = {
  type: 'object',
  properties: {
    name: {
      // title 表示：表单项的展示名称
      title: '姓名',
      // type 表示：表单项值的类型。
      type: 'string',
      // required 表示：是否必填
      required: true,
      // x-component 表示：表单项 UI 用到的组件
      'x-component': 'Input',
      // x-component-props 表示：组件的 props
      'x-component-props': {
        placeholder: '请输入姓名',
      },
    },
    province: {
      title: '省份',
      type: 'string',
      required: true,
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请输入省份',
      },
      // enum 表示：下拉框的数据源（dataSource）
      enum: ['a', 'b', 'c'],
    },
  },
};
```
### 生命周期
Formily 的生命周期设计类似于 React 的生命周期，表单系统按照生命周期运行，开发者可以在不同的生命周期做不同的事情。

生命周期是通过事件的方式完成的，在不同的阶段对外发出不同的事件，同时开发者还可以自定义生命周期，这样就让表单变得非常强大和灵活。

在 Formily 中，生命周期分为两种：
* 表单的生命周期。常量名形式为：ON_FORM_XX ，Hook 形式为：onFormXx$ 
* 字段的生命周期。常量名形式为：ON_FIELD_XX ，Hook 形式为：onFieldXx$

下面列举一些常见的生命周期：

| 常量名               | Hook                | 描述                                              |
|---------------------|---------------------|---------------------------------------------------|
| ON_FORM_INIT        | onFormInit$         | 表单初始化之后触发                                 |
| ON_FORM_MOUNT       | onFormMount$        | 表单组件挂载完毕时触发                            |
| ON_FORM_INPUT_CHANGE| onFormInputChange$  | 表单输入事件触发时触发(人为操作，不包含间接联动)   |
| ON_FIELD_CHANGE     | onFieldChange$      | 字段状态发生变化时触发                            |
| ON_FIELD_INPUT_CHANGE| onFieldInputChange$| 字段输入事件触发时触发(人为操作，不包含间接联动)   |
| ON_FIELD_VALUE_CHANGE| onFieldValueChange$| 字段值变化时触发                                  |

### actions/effects
actions 用来解决：外部调用组件内部 API 的问题。

effects 用来解决：组件内部事件通知外面的问题。这里就会结合生命周期使用。

我们的业务逻辑就会使用 actions/effects 处理。

下面是  actions 和 effects 的简单用法示例：
```typescript
// actions 用法
useEffect(() => {
  actions.setFieldState('a.b.c', state => {
    state.value = 'First Form';
  });
}, []);

// effects 用法
const effects: FormEffect = ($, actions) => {
  
  // 这里是消费生命周期
  onFieldValueChange$('a.b.c').subscribe(state => {
    state.value = `First Form: ${state.value}`
  });
};

```
Tips：这两个单词都是复数，是 actions 和 effects 。有同学出现过写的联动没有生效，结果是因为这里不对。 

### 表单路径系统
如果说生命周期是管理心脏，状态管理是肌肉，那么，路径系统就是血管，没有血管，整个体系就根本无法运作起来。

路径就是表单中每个字段的位置，使用类似于"a.b.c.d"的字符串形式表示。

路径不是凭空存在的，它也是有「铺路」和「用路」过程。这个过程对应到代码里具体是什么呢？
* 「铺路」：在我们使用 JSON Schema 编写表单的 schema 时，就通过字段间的层级和嵌套关系完成了这一步，剩下的交给 Formily。
* 「用路」：我们上面提到了生命周期的概念，如果我们需要在某个字段值变化的时候做一些操作，这时候就需要知道这个字段的路径。

同时 Formily 还对我们找到某条路径做了很多便捷的匹配操作，如通配，解构等。

## 使用 Formily 新建一个表单

当我们了解了 Formily 的核心概念之后，就可以使用 Formily 新建一个自己的表单了！

接下来我们以录入新同学入职信息为例，一步步的完成新建表单的任务。要求如下：
1. 支持录入信息
2. 支持联动
3. 可以校验和提交

目标页面如下图所示：

说明：下面代码中，不会展示无关 Formily 部分的具体实现。 

### step 1：引入 SchemaForm

@alife/whale-formily-ui是财鲸对 Formily 进行封装后透露给开发者的包。所有和 Formily 相关的内容，都是从这个包引入。

```typescript
import React from 'react';
import { Card, Page } from '@alife/whale-ui';
import { SchemaForm } from '@alife/whale-formily-ui';
import Footer from './Footer';
import schema from './schema';
import './index.scss';

export default function Basic() {
  return (
    <Page title="基础表单">
      <Card title="新同学入职信息录入">
        <SchemaForm schema={schema} />
        <Footer />
      </Card>
    </Page>
  );
}

```

### step 2：编写 schema 

这里使用了StrictSchema的类型约束。这样我们就知道x-component有哪些组件可用，并且 x-component-props在书写的时候也会有类型提示。

```typescript
import { StrictSchema } from '@alife/whale-formily-ui';

const schema: StrictSchema = {
  type: 'object',
  properties: {
    grid: {
      type: 'objcet',
      'x-component': 'WhaleGrid',
      'x-component-props': {
        cols: 3,
      },
      properties: {
        name: {
          title: '姓名',
          required: true,
          explanation: '姓名要填对哦',
          'x-component': 'WhaleInput',
          'x-component-props': {
            placeholder: '请填写姓名',
          },
        },
        age: {
          title: '年龄',
          required: true,
          explanation: '年龄要填对哦',
          'x-component': 'WhaleNumberPicker',
          'x-component-props': {
            placeholder: '请填写年龄',
          },
        },
        proviance: {
          title: '省份',
          required: true,
          'x-component': 'WhaleSelect',
          enum: ['a', 'b', 'c'],
        },
        hasAttachment: {
          title: '是否上传附件',
          required: true,
          'x-component': 'WhaleRadioGroup',
          default: false,
          enum: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
        },
        attachment: {
          title: '上传附件',
          required: true,
          'x-component': 'WhaleUpload',
          visible: false,
        },
        workExperience: {
          title: '工作经历',
          type: 'array',
          'x-component': 'WhaleArrayTable',
          colSpan: 'full',
          required: true,
          items: {
            type: 'object',
            properties: {
              companyName: {
                title: '公司名称',
                type: 'string',
                'x-component': 'WhaleInput',
              },
              post: {
                title: '职位',
                type: 'string',
                'x-component': 'WhaleInput',
              },
              time: {
                title: '任职时间',
                type: 'string',
                'x-component': 'WhaleRangeDatePicker',
              },
              descirption: {
                title: '经历描述',
                type: 'string',
                'x-component': 'WhaleTextArea',
                'x-component-props': { rows: 3 },
              },
            },
          },
        },
      },
    },
  },
};

export default schema;

```

说明：'x-component': 'XX'，可以这么做的前提是：XX组件已经注册过了。财鲸脚手架默认在 入口页面使用setup方法注册了WhaleXx组件。所以我们可以直接使用注册好的组件，而不用关心具体的注册过程。

此时页面已经和目标页面一模一样了，是不是很简单！

要求 1：「支持录入信息」 已经完成，接下来我们来实现要求 2：「支持联动」，为表单增加一些联动：当「是否上传附件」的值等于true的时候，展示 「上传附件」。

### step 3：增加联动

我们使用 effects 为页面增加联动！这里用到了「生命周期」和「路径 」的部分。

```typescript
import React, { useMemo } from 'react';
import { Card, Page } from '@alife/whale-ui';
import {
  SchemaForm,
  createAsyncFormActions,
  FormEffectHooks,
} from '@alife/whale-formily-ui';
import { schema } from './schema';
import './index.scss';

const { onFieldValueChange$ } = FormEffectHooks;

export default function Basic() {
  const actions = useMemo(createAsyncFormActions, []);
  
  const effects = ($, actions) => {
    // 当「是否上传附件」的值等于 true 的时候，展示 「上传附件」
    onFieldValueChange$('hasAttachment').subscribe(({ value }) => {
      actions.setFieldState('attachment', attachmentState => {
        attachmentState.visible = value;
      });
    });
  };
  
  return (
    <Page title="基础表单">
      <Card title="新同学入职信息录入">
        <SchemaForm schema={schema} actions={actions} effects={effects} />
        <Footer />
      </Card>
    </Page>
  );
}
```

要求 2：「支持联动」 已经完成，接下来我们来实现要求 3：「可以校验和提交」，完成表单的校验和提交。

### step 4：表单的校验和表单

这里使用 actions，使得可以在组件外部调用组件内部的 API （submit 函数）。

```typescript
+ // 提交表单
+ const onSubmit = async () => {
+   const { values } = await actions.submit();
+   console.log('如果校验失败，那么这里不会执行哦～');
+ };
```

使用actions.submit()函数就可以完成表单的校验和提交了。
* 如果校验不通过，那么页面就会提示未校验通过的原因，同时下面代码第 4 行的 console.log 函数也不会执行。校验不通过页面如下：
* 如果校验成功，点击提交页面结果如下：

至此，我们就完成了所有的要求！

完整代码可以 点击这里 。

## 开发者工具 - Fomily DevTools
Formily 提供了浏览器拓展程序：Fomily DevTools。 这是一个开发者工具，通过这个工具可以很方便的查看表单的节点树结构、表单和字段状态，方便调试，排查错误。
Chrome 中 点击这里下载。

安装之后，打开控制台 ，找到 Formily 就可以看到表单的信息了。 

## 更多资料
* Formily 官网地址

