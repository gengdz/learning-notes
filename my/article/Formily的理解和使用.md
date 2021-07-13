# Formily 的理解和使用
> **本文背景：**
> 项目一期使用了基于 fusion next 的 Form。
> 但随着项目的快速膨胀，逻辑越来越复杂。 next Form 逐渐显得力不从心。性能问题、表单控制颗粒度问题、通讯问题、代码组织等问题让我们每走一步都变得很艰难。
> 项目二期决定找一款新的表单方案，来解决我们的一些列痛点，于是便和 Formily 结了缘。
> 由此在组内做了一次分享（2020-07-13），本文由分享时的 PPT 总结而成。
> 
> **本文目的：**
> 1. 希望能说明白为什么有 Formily、为什么是 Formily
> 2. 希望能说明白 Formily 是什么、和它的一些核心概念
> 3. 通过代码示例，希望能说明白怎么开始使用 Formily，并且引申出一些复杂的场景结合 RxJS 使用 Formily
> 
> **本文说明：**
> Formily 正在筹措 2.0 版本（预计 2021 年底上正式版），本文基于 1.0 版本。


## Why
前端技术更新这么快，**「我都要」在这是行不通的**，人都要累死！所以我们要学会挑。挑适合我们的！
哪些是适合我们的呢？我们为什么需要某个技术呢？它解决了哪些问题？带来了哪些好处？

对于 Formily 我们同样要问几个为什么？



### 为什么有 Formiy?
下面问题，大家有没有遇到过呢？
* 复杂表单的联动、校验、通讯问题难解
* 表单卡顿，性能太差
* 表单逻辑太分散并且严重和UI耦合
* 复杂表单布局布局很麻烦
* 表单复杂起来，重复代码太多
* ...


### 为什么是 Formily?
**因为 Formily 几乎解决了上面所有问题！**

它有清晰的定位，高性能，优雅的解决了复杂表单的联动和校验。
具有 reactive 的特性，让应用更具响应性。

提高开发效率的同时 额外赠送一套 自增列表组件 `<ArrayTable/>` + 表单布局方案

上面这段话很像技术选型的总结，大家可以先认为是这样的，然后通过后面的介绍和自己的理解，给出自己的答案



### Formily 的缺点？
1. 体积大！(一般说来这并非关键因素)
2. 学习成本高！--> 多高？听几个关键词感受一下（分布式状态管理、表单字段生命周期、路径系统、React Hooks、RxJS) <small>复杂本身不是好事情，但一定程度上也寓意着功能更强大</small>
3. 还有一些未解决的问题！（2.0 就是解决这些）




### 为什么不是 antd Form 或者 next Form?
**它们更接近原生的方式，封装程度不高，功能不够强大**

1. 当表单复杂起来之后，它们的性能很差
设计模式决定了它们都不能从根本上解决问题。
本质是: **React 单向数据流决定的。子组件的重绘，依赖父组件的重绘，受控于父组件**

2. 逻辑和 UI 耦合严重，逻辑太过分散，维护成本高
当表单中某个字段的值为 A 值，显示另一个字段。这种逻辑大家应该都写过吧
以及分散在各处的 `onChange ｜ onBlur | onSubmit` 等处理函数

3. 组件间表单通讯成本太高，我们项目中为此还引入了 `eventEmitter`

4. 定位不同。antd Form 或 next Form 是**组件级别**的定位，Formily 是**框架级别**的定位



## What
当我们知道为什么的时候，就要多问是什么啦
本质是什么？重点是什么？实现方式是什么？



### Formily 是什么？
**是一款面向中后台 **复杂表单场景** 的表单解决方案**
[Formily 官网](https://formilyjs.org/#/bdCRC5/dzUZU8il)



那么什么是复杂场景？
@白玄 在 *Formily的前世今生* 中给到的定义为
> * 多：字段多，联动多，校验多，数据多
> * 杂：字段层次复杂，联动复杂，校验复杂，数据处理复杂
> * 难：异步联动，异步校验，异步数据处理
> * 紧：时间紧，任务重



### Formily 的核心设计理念
1. 单一职责
2. 函数式编程，纯函数，高阶函数

了解设计理念对我们有什么用？
* 设计理念会在物理层指导我们的文件目录划分，在逻辑层指导我们的编码方式
* 设计理念会反映在 api 中，有利于我们更好理解和使用api



### Formily 解决问题的几个核心要素？
**`JSON Schema(JSchema)` + `字段分布式管理` + `React EVA` + `Path`**
下面我们来尝试解释一下这几个名词的含义

JSON Schema(JSchema):
1. 标准化协议，易于理解
2. 适合表单，更多是数据，而非 UI
3. 适用在各种数据驱动场景，比如可视化搭建引擎中的组件配置器等

字段分布式管理:
先理解单向数据流：**数据同步靠根组件重绘来驱动，子组件重绘受根组件控制**
分布式管理就是：**数据同步靠根组件广播需要更新的子组件重绘，根组件只负责消息分发**
其实，前者跟后者还是有一定的相同之处的，比如根组件都是消息的分发中心，只不过分发的形式不一样，一个是靠组件树重绘来分发消息，一个是通过 pub/sub 来广播消息，让子组件自己重绘。数据流，还是一个中心化的数据管理流，只是分发的形式不一样，就这样的差别，却可以让整个 React 应用性能提升数倍。


React EVA (actions/effects): 
通过 `RxJS` 实现 **事件的收敛** 和 **内外通讯**

Path: 
表单路径系统，通讯的 *实际执行者*



### Formily 表单和字段状态
这里我们不需要太详细的关注具体的字段，只需要留个印象，看到它和普通表单的区别即可。后面我们还会再次介绍到这些东西



### Formily 的核心内容
* SchemaForm
* Field
* FormPath
* antions/effects



## Hou Use
当我们知道为什么，是什么的时候，我们就要步入实践阶段啦。
下一步就是怎么用？怎么用好？



### 整体结构感受
这里我们先整体感受下，使用 Formily 怎么写表单


### Schema 使用
Schema 的作用：
1. 通过 json-schema 的方式描述 数据结构+类型 (解决 定义表单的输入和输出定义 的问题）
2. 通过 x-* 这种拓展属性来描述 UI

列举一些常用的属性

### JSX Schema 编码示例

### JSON Schema 编码示例


### 表单联动
**表单联动是表单之所以复杂，性能之所以差，功能之所以难实现的重要问题！**
我们会多花点时间来理解这部分内容。
在 Formily 中
1. 任何联动都是从表单生命周期发起
2. 任何联动都需要一个路径来描述具体字段
3. 联动的目的是为了改变目标字段的状态
这是它的规则，我们按照规则来就可以发起属于我们的联动



#### 生命周期
生命周期的概念我们应该很熟悉，Formily 中生命周期参考借鉴了 React 的设计再结合原有组件的一些变化时机形成 Formily 的生命周期。

分布式管理的特性让 `表单` 和 `表单字段` 都有相同性质的生命周期

下面列出表单和字段常见的生命周期


#### 生命周期不够用？想自定义？
**Formily 满足你**
在能拿到 actions
```javascript
actions.dispatch('onProjectValueValidChange', 'gengdezhou');
```

在能拿到form实例的地方
```javascript
form.notify('onProjectValueValidChange', {
  name: '疯狂的拉斐尔',
  age: 18,
})
```

怎么使用这些自定义的事件流呢？
**就像订阅生命周期一样！**
```javascript
$('onProjectValueValidChange').subscribe((value) => {
  // do something such as
  console.log(value);
  // 这里的value, 就是我们自定义事件流的时候，携带的值
  // 'gengdezhou'
})
```


#### 对比 next Form
这里是一张截图


#### 性能优化
RxJS 给我们带来了更多可能，如果你愿意，性能优化就这么简单（防抖，去重）
下面这段代码是真实业务中的代码，只需要关注 打注释的两行。只是告诉大家借助 Formily + RxJS 性能优化是多么简单的一件事情。(至于下面 pipe 里面的内容，这是 RxJS 的内容，不是我们今天讲解的重点)
```javascript
$(ON_FIELD_CHANGE, 'ouCode')
  .pipe(
    map(fieldState => fieldState.value),
    distinctUntilChanged(), //  只有和上次的值不一致的时候，才会继续
    debounceTime(300), // 防抖 300ms
    switchMap(value => (value ? from(fetchSingleOuInfo(value)) : of([])))
  )
  .subscribe(list => {
    const data = list.map(item => ({ ...item, worker: item.workNo }));
    setFieldValue('saveList', data);
  });
```



#### 表单联动 - 一对多联动
```javascript
const useOneToManyEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('aa').subscribe(({ value }) => {
    setFieldState('*(bb,cc,dd)', state => {
      state.visible = value
    })
  })
}
```
上面代码什么意思呢？
当 aa: boolean 字段变化的时候，让 bb,cc,dd 字段显示或者隐藏。


#### 表单联动 - 多对一联动
```javascript
const useManyToOneEffects = () => {
  const { setFieldState } = createFormActions()
  onFieldValueChange$('bb').subscribe(({ value }) => {
    setFieldState('aa', state => {
      state.visible = value
    })
  })
  onFieldValueChange$('cc').subscribe(({ value }) => {
    setFieldState('aa', state => {
      state.value = value
    })
  })
}
```
上面代码什么意思呢？
当 bb: boolean 或者 cc 字段变化的时候，让 aa 的值为其变化的值



#### 难度升级说明
下面的代码用到了 RxJS。所以便有了如下 QA。目的是让大家明白 RxJS 和 Formily 之间的关系。

> Q: 不用 RxJS 可以吗？
> A: 可以，在 Formily 中不用 RxJS 一样可以解决我们遇到的问题

> Q: 你为什么用？
> A: 因为我稍微了解 RxJS，并且用了 RxJS 确实更方便。

> Q: 我想用，但是我不会 RxJS，怎么办？
> A: 学习 Formily 的时候，就先专心学习 Formily，如果对 RxJS 感兴趣后期再看。




#### 表单联动 - 难度升级1
下面这段代码这么像，有更好的写法吗？
```javascript
// 当 aa 值变化的时候，让 cc 的值为其变化的值
onFieldValueChange$('aa').subscribe(fieldState => {
  // do something like
  setFieldState('cc', state => {
    state.value = value
  })
})

// 当 bb 值初始化的时候，让
onFieldInit$('bb').subscribe(fieldState => {
  // do something like
  setFieldState('cc', state => {
    state.value = value
  })
})
```


它来了!
```javascript
merge(onFieldValueChange$('aa'), onFieldInit$('bb')).subscribe(fieldState => {
   // do something like
  setFieldState('cc', state => {
    state.value = value
  })
})
```
**解释说明：**
`merge` 是 RxJS 中一个合并类操作符，我们可以理解为逻辑上的 or。
现在是不是有点明白了。






#### 表单联动 - 难度升级2
现有需求如下：
> 实时计算 A占的百分比 = A的数量/总数
> 细则如下：
> 当两个都有值的时候，才开始计算。当其中一个值变化的时候，要实时计算出 A所占的百分比


```javascript
// 当总数和个数都发生过变化（有值）的情况下，实时计算出 百分比
$(
  LifeCycleTypes.ON_FIELD_VALUE_CHANGE,
  '*(total,number)'
).subscribe(() => {
  const total = getFieldValue('total');
  const number = getFieldValue('number');
  if (!total || !number) {
     actions.setFieldValue("percentage", 0);
  }
  const percentage = total ? (number/total) * 100 : 0;
  actions.setFieldValue("percentage", percentage);
});
// 可能有细节还需要调整，但思路就是这样
```
说明：
利用 Formily 的路径系统，匹配多个路径。这样可以监听它们的变化
然后分别获取各自的值
后面就是取值和赋值逻辑
缺点：我可以监听两个值，然后，我却不能同时拿到我监听的值的最新值，所以还需要在手动获取一遍，
如何改进：请看下面的示例




它来了，它来了!
```javascript
// 当总数和个数都发生过变化（有值）的情况下，实时计算出 百分比
combineLatest(
  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "total"),
  $(LifeCycleTypes.ON_FIELD_VALUE_CHANGE, "number"),
  (total, number) => [total.value, number.value || 0 ]
).subscribe(([total, number]) => {
  const percentage = total ? (number/total) * 100 : 0;
  actions.setFieldValue("percentage", percentage);
});
```
说明：
`combineLatest` 是 RxJS 提供的合并类操作符



### 校验
Formily 内置了很多字段校验，
可以通过如下方式使用
```javascript
userId: {
  'x-component': 'Select',
  'x-component-props': COMMON_SELECT_PROPS,
  title: '人员',
  required: true,
  'x-rules': {
    required: true,
    max: 20,
    whitespace: true,
    message: '错误提示信息',
  },
}
```

自定义校验
```javascript
const atLeastOne = value => {
  if (!Array.isArray(value) || value.length < 1) {
    return '至少一条数据';
  }
  return '';
};


userId: {
  'x-component': 'Select',
  'x-component-props': COMMON_SELECT_PROPS,
  title: '人员',
  equired: true,
  'x-rules': {
    validator: atLeastOne
  },
}
```