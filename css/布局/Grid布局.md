# Grid布局
*Grid* 布局即网格布局。比较擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层级关系。**是目前唯一一种 *CSS* 二维布局** 



## 声明容器

### 使用fr进行指定行列大小(重点)

fx作为基本单位，相当于占整体的几分之几

```css
// 所以可以使用 
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: 1fx 2fx 1fx; // 多少行
  grid-template-columns: 1fx 2fx 1fx; // 多少列
}
```



### 使用repeat+fr(重点，进阶使用)

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



### 基本声明(一般不会用)

```css
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: 100px 100px 100px; // 多少行
  grid-template-columns: 100px 100px 100px; // 多少列
}

```



### repeat+百分比

```css
// 解释说明: repeat(3,33%) 表示重复三次，每个值都是 33%
article {
  width: 300px;
  height: 300px;
  border: soild 5px silver
  display: grid;
  grid-template-rows: repeat(3, 33%); // 多少行
  grid-template-columns: repeat(3, 33%); // 多少列
}

```



### minmax的使用
可以指定最小或者最大值。用范围来决定实际大小。
```css
display: grid;
grid-template-rows: minmax(50px,1fr);
grid-template-columns: 1fr;
```



### 组合定义
使用 `grid-template` 组合定义。它是下面三个属性的简写。
* grid-template-rows
* grid-template-columns
* grid-template-areas



### grid-auto-rows
作用对象是：所有栅格元素
作用是：调整栅格元素的行高。默认是: `auto`。意思是自适应。
我们也可以指定大小
```css
grid-auto-rows: 100px;
```



### grid-auto-columns
和上面的是一对。
作用对象是：所有栅格元素
作用是：调整栅格元素的宽度。
```css
grid-auto-columns: 1fr;
grid-auto-columns: minmax(10px, auto);
```




### 栅格的流动
默认是从左到右，从上到下。
使用 `grid-auto-flow` 属性控制栅格的方向。
|  属性  |  说明  |
|-------|--------|
|  column  |  按列排序  |
|  row  |  按行排列  |

使用 **`dense`** 可以强制填充。比如设置了前面的元素之后有空间剩余，并且剩余空间足够后面的元素使用，那么后面的元素将会跑到前面。



### 间距设置
* 使用 `row-gap` 设置行间距
* 使用 `column-gap` 设置列间距
* 使用 `gap` 同时设置行和列间距



## 元素定位

### 根据栅格线
使用栅格线的编号，把元素放在栅格里面。

```css
article div {
  grid-row-start: 2;
  grid-column-start: 2;
  grid-row-end:4;
  grid-column-end:4;
}
```



### 根据偏移量
使用 `span` 可以设置单元格占几个单元格。

```css
 grid-row-end: span 2;
```



### 元素定位简写
可以使用 `grid-row` 对 `grid-row-start | grid-row-end` 进行简写
可以使用 `grid-column` 对 `grid-column-start | grid-column-end` 进行简写
也可以结合 *偏移量* 进行使用

```css
grid-row: 2/4;
grid-column: 2/4;
```

```css
grid-row: 1/span 2;
grid-column: 1/span 1;
```



### grid-area

* `grid-area` 是 `grid-row` 和 `grid-column`的简写。
* 搭配`grid-template-areas`使用。

```css
grid-area: grid-row-start/grid-column-start/grid-row-end/grid-column-end。
```

```css
 body {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template: repeat(3, 1fr)/repeat(3, 1fr);
    }

    header {
        grid-area: 2/2/3/3;
        background: #e67e22;
    }
```

```css
 grid-template-areas: "header header"
        "nav main"
        "footer footer";

  header {
    grid-area: header;
  }
```



### 区域声明

使用`grid-template-areas`来定义区域。
```css
 grid-template-areas: "header header"
        "nav main"
        "footer footer";

  header {
    grid-area: header;
  }
```



#### 区域占位

使用一个或多个 . 定义区域占位。
```css
grid-template-areas: "top . ."
            "top . ."
            "bottom bottom bottom";
```



## 栅格对齐
属性值包括 `start | center | end | stretch | space-between | space-evenly | space-around `。
|  选项  |  说明  |  对象  |
|--------|-------|-------|
|  justify-items  |  栅格内所有元素的水平排列方式  |  栅格容器  |
|  align-items  |  栅格内所有元素垂直排列方式  |  栅格容器  |  
|  justify-content  | 容器水平方向有额外空间时，分配方式  |  栅格容器  |
|  align-content  |  容器垂直方向有额外空间时，分配方式  |  栅格容器  |
|  justify-self  |  元素在栅格中水平对齐方式  |  栅格元素  |
|  align-self  |  元素在栅格中垂直对齐方式  |  栅格元素  |



### 属性简写
**注意：属性的顺序，先是垂直方向，然后是水平方向**
控制所有栅格元素的对齐方式
```css
place-items: <align-items> <justify-items>
```

控制栅格的对齐方式
```css
place-content: <align-content> <justify-content>
```

控制单个元素的对齐方式
```css
place-self: <align-self> <justify-self>
```