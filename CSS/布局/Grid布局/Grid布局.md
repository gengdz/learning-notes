# Grid 布局

_Grid_ 布局即网格布局。比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层级关系。**是目前唯一一种 _CSS_ 二维布局**

[toc]

Grid 容器的属性还是有点多的，可以分为 _5_ 大类

1. `grid-template` 系列

   - grid-template-columns
   - grid-template-rows
   - grid-template-areas

2. `grid-gap` 系列

   - grid-column-gap
   - grid-row-gap

3. `place-items` 系列

   - justify-items
   - align-items

4. `place-content` 系列

   - justify-content
   - align-content

5. `grid-auto` 系列
   - grid-auto-columns
   - grid-auto-rows
   - grid-auto-flow

Grid 项目的属性，可以分为以下几类

1. grid-column、grid-row
2. grid-area
3. place-self

## 容器属性

### grid-template 系列

#### grid-template-columns、grid-template-rows

##### 划分行列

1. `fx`
   作为基本单位，相当于占整体的几分之几

```css
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver;
  display: grid;
  grid-template-rows: 1fx 2fx 1fx; // 多少行
  grid-template-columns: 1fx 2fx 1fx; // 多少列
}
```

2. `repeat`
   重复。 语法为: `repeat(重复次数, 重复值)` 。
   `repeat(3,33%)`: 表示重复三次，每个值都是 33%

```css
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: repeat(3, 33%); // 多少行
  grid-template-columns: repeat(3, 33%); // 多少列
}
```

3. `auto-fill` & `auto-fit`
   根据项目的宽度和栅格容器自动填充列。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

只有当容器足够宽，可以在一行容纳所有单元格，并且单元格宽度不固定的时候，才会有行为差异：auto-fill 会用空格子填满剩余宽度，auto-fit 则会尽量扩大单元格的宽度。

4. `minmax`
   可以指定最小或者最大值。用范围来决定实际大小。

```css
display: grid;
grid-template-rows: minmax(50px, 1fr);
grid-template-columns: 1fr;
```

5. `auto`
   使用 `auto` 让栅格获取所有剩余空间

##### 声明方式

1. 使用 repeat + fr
   `repeat(times,value)`，它接受两个参数，第一个参数表示重复多少次，第二个参数是需要重复的值。还可以 `repeat(3,10px 20px)` 表示重复三次，重复的值为 10px 20px;

```css
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: repeat(3, 1fr); // 多少行
  grid-template-columns: repeat(3, 1fr); // 多少列
}
// 解释说明: repeat(3,1fr) 表示重复三次，每个占用1份。 类似于 flex: 1
```

2. 基本声明 百分比

```css
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: 100px 100px 100px; // 多少行
  grid-template-columns: 60% 20% 20%; // 多少列
}
```

#### grid-template-areas

```css
grid-template: 60px 1fr 60px/60px 1fr;
grid-template-areas:
  'header header'
  'nav main'
  'footer footer';
```

使用的时候

```css
.item1 {
  grid-area: header;
}
```

```css
grid-template-areas:
  'header header'
  'nav main'
  'footer footer';

header {
  grid-area: header;
}
```

使用一个或多个 . 定义区域占位。

```css
grid-template-areas:
  'top . .'
  'top . .'
  'bottom bottom bottom';
```

#### grid-template

使用 `grid-template` 组合定义。它是下面三个属性的简写。

- grid-template-rows
- grid-template-columns
- grid-template-areas

```css
grid-template: repeat(3, 1fr) / repeat(4, 1fr);
grid-template: 60px 1fr 60px/60px 1fr;
```

---

使用小结：

- 在定义栅格容器的时候，可以指定宽高。相对的是：不指定容器的宽高，直接通过 `grid-template` 系列的属性来间接的声明容器。这两种方式可以用在不同的场景
- Grid 项目不需要指定宽高。因为已经在声明行列的时候，指明了项目的大小。

### grid-gap 系列

- 使用 `row-gap` 设置行间距
- 使用 `column-gap` 设置列间距
- 使用 `grid-gap | gap` 同时设置行和列间距

### place-items 系列

设置每个格子中的内容在格子中的对齐方式
这个属性的的使用场景：

> 我们先声明一个 宽为 800px， 高为 800px 的栅格容器。
> 再声明 3 行 3 列 的排布。
> 注意如果我们没有指定里面每个单元格的高度和宽度，那么默认拉伸，也就是说，内容会填充整个单元格。
> 如果我们想规定单元格的内容，在单元格内是怎么排布的话
> 我们就使用 place-items 来决定我们栅格元素中内容的位置。

`place-items` 是 `align-items` 和 `justify-items` 的简写

```css
place-items: <align-items> <justify-items>
place-items: center start;
```

**注意：属性的顺序，先是垂直方向，然后是水平方向**
属性值包括 `start | center | end | stretch | space-between | space-evenly | space-around `。

#### justify-items

`justify-items` 设置单元格内容的水平位置。默认为 `stretch`，也就是说默认是内容会在水平方向，铺满整个单元格。如果改变了这个值，那么会根据内容的多少，决定内容在单元格里的位置。

#### align-items

`align-items` 设置单元格内容的垂直位置。默认为 `stretch`。

### place-content 系列

设置整个栅格内容区域在容器中的对齐方式
这个属性的使用场景：

> 我们在一个 宽 1000px, 高 1000px 的页面作业。
> 然后声明了一个 宽为 800px， 高为 800px 的栅格容器。
> 这时候，页面是不是还有 宽度 200px， 高度 200px 的剩余空间。
> 我们就使用 place-content 来决定我们栅格容器的位置。

`place-content` 是 `align-content` 和 `justify-content` 的简写

```css
place-content: <align-content> <justify-content>;
```

**注意：属性的顺序，先是垂直方向，然后是水平方向**
属性值包括 `start | center | end | stretch | space-between | space-evenly | space-around `。

#### justify-content

`justify-content` 容器水平方向有额外空间时，分配方式

#### align-content

`align-content` 容器垂直方向有额外空间时，分配方式

### grid-atuo 系列

这个不是一个简写属性，只是都以 _grid-auto_ 开头，并且作用的对象差不多。所以放在一起了

#### grid-auto-rows 和 grid-auto-columns

在讲 `grid-auto-columns` 属性和 `grid-auto-rows` 属性之前，先来看看隐式和显式网格的概念
隐式和显式网格：显式网格指的是你在 `grid-auto-columns` 属性和 `grid-auto-rows` 属性中定义的行和列。如果你定了了两行，但是实际的行数超过了两行，那么网格就会在隐式网格中创建行和列。

假如有多余的网格（也就是上面提到的隐式网格），那么它的行高和列宽可以根据 `grid-auto-columns` 属性和 `grid-auto-rows` 属性设置。它们的写法和 `grid-template-columns` 和 `grid-template-rows` 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高(auto).

`grid-auto-columns` 与 `grid-auto-rows` 可以用来定义我们超出网格格数的隐式网格的大小。

```css
grid-auto-rows: 100px;

grid-auto-columns: 1fr;
grid-auto-columns: minmax(10px, auto);

.wrapper {
  display: grid;
  grid-template-columns: 200px 100px;
  /*  只设置了两行，但实际的数量会超出两行，超出的行高会以 grid-auto-rows 算 */
  grid-template-rows: 100px 100px;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

#### 栅格的流动

默认是从左到右，从上到下。
使用 `grid-auto-flow` 属性控制栅格的方向。
| 属性 | 说明 |
|-------|--------|
| column | 按列排序 |
| row | 按行排列 |

使用 **`dense`** 可以强制填充。比如设置了前面的元素之后有空间剩余，并且剩余空间足够后面的元素使用，那么后面的元素将会跑到前面。

## 项目属性

### grid-column、grid-row

`grid-row` 是 `grid-row-start | grid-row-end` 的简写
`grid-column` 是 `grid-column-start | grid-column-end` 的简写
也可以结合 _偏移量_ 进行使用

```css
/* 使用栅格线的编号，把元素放在栅格里面 */
grid-row: 2/4;
grid-column: 2/4;
```

```css
/* 结合 偏移量 使用 `span` 可以设置单元格占几个单元格。 */
grid-row: 1 / span 2;
grid-column: 1 / span 1;
```

### grid-area

`grid-area` 是 `grid-row` 和 `grid-column` 的简写。
需要搭配 `grid-template-areas` 使用。

```css
grid-area: grid-row-start/grid-column-start/grid-row-end/grid-column-end。;
```

```css
body {
  width: 100vw;
  heigh: 100vh;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}
header {
  grid-area: 2/2/3/3;
  background: #e67e22;
}
```

```css
grid-template-areas:
  'header header'
  'nav main'
  'footer footer';

header {
  grid-area: header;
}
```

### place-self

设置单元格里面的内容，在自己的格子中的对齐方式

语法如下：

```css
place-self: <align-self> <justify-self>;
```

**注意：属性的顺序，先是垂直方向，然后是水平方向**
属性值包括 `start | center | end | stretch | space-between | space-evenly | space-around `。

#### align-self

`justify-self` 元素在栅格中水平对齐方式

#### justify-self

`justify-self` 元素在栅格中水平对齐方式
