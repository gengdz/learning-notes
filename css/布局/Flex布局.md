# Flex布局
[toc]

## 什么是Flex 布局？

Flex是 **flexible box**  的缩写,意思是***弹性盒模型布局***，具体开发来说就是程序员只要声明布局的行为即可，具体实现由浏览器完成。

它有两个定位：

1. 盒子  所以我们可以使用盒子的一切属性来进行控制它，比如 盒子打高度，宽度，边距等。
2. 弹性  我们通过 `display: flx` 的方式来生明，它是具有6个技能属性的盒子。并且能给盒子中的元素也带来一些进化属性，竖起来有6个技能属性。



## Flex的基本概念

1. 容器（盒子）
2. 项目（盒子里面的元素）
3. 主轴(*main axis*)： 默认是水平方向。
4. 交叉轴(*cross axis*)：（副轴）需要说明的是，任何时候都有两个轴。只不过多行显示的时候，有些属性才能生效。



## Flex API

1）容器的api有 `6` 个，他们分别是 

| <div style="width:100px">api名称</div> | 作用                                                         |
| -------------------------------------- | :----------------------------------------------------------- |
| flex-direction                         | 规定了主轴的方向 row(默认，水平) ，常用的还有column（竖直）  |
| flex-wrap                              | 规定了换行的方式  nowrap(默认不换行，如果超出来了，就让里面的元素变小点)，常用的还有 wrap（换行） |
| flex-flow                              | 是*flex-direction* 和*flex-wrap* 的简写 默认值为：row nowrap |
| justify-content                        | 规定了主轴的对齐方式:  flex-start、flex-end、center、 space-between(空格在中间)、space-around(空格在两边)、space-evenly(完全平分空格) |
| align-items                            | 规定了交叉轴的对齐方式(**适用于一行或者多行**)               |
| align-content                          | 规定了多行并且存在剩余空间时的对齐方式(**仅在多行的时候生效**)。<br/>这个属性就是说，这些行在交叉轴方向的显示方式（是聚在一起，还是分散在交叉轴的两端，还是等分空白）<br/> 默认在把元素拉伸，然后占满交叉轴，但这个默认值的优先级不高，如果设置了元素的宽高，那么拉伸效果将失效 |

2）元素的api也有 `6` 个，他们分别是

| <div style="width:80px">api名称</div> | 作用                                                         | 说明/注意项                                                  |
| :------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| order                                 | 规定了元素的排列顺序默认是0  数值越小越靠前                  | **默认是0，数字越小越靠前**                                  |
| flex-grow                             | 元素的放大比例，默认是0 (即使存在剩余空间,也不放大)          |                                                              |
| flex-shrink                           | 元素的缩小比例，默认为1 (如果空间不足将缩小)                 | **0代表，就是空间小也不缩小**                                |
| flex-basis                            | 主轴的基准尺寸。                                             | 优先级：max > flex-basis > width。如果同时设置了flex-basis = 100 和width =50，最终元素呈现出来的是100 |
| flex                                  | 是<br/>*flex-grow* 、<br/>*flex-shrink*、<br/>*flex-basis*<br/>的简写<br/>是 **`放大、缩小、基准尺寸` **的简写 | flex:auto(flex:1 1 auto)、<br/>flex:none(0 0 auto),<br/>flex:1(1 1 0%),<br/>flex 如果只有一个非零数字，则其代表的是flex-grow的值。即放大比例 flex <br/>如果只有一个百分比那么其代表的是flex-basis的值。<br>**优先使用这个属性** |
| align-self                            | 可以单独设置元素的align-items                                | 就是设置单个元素在交叉轴上的显示方式。<br/>比如说。可以让多行元素的普遍行为聚集在底部，然后让第一个元素，单独放在上面 |

补充：
行列之间的间距可以使用 `gap` 属性


## 说明

一个标签可以同时是一个弹性元素和弹性容器。例子如下

```css
 footer section h4 {
        flex: 0 0 50px;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        color: white;
    }

```



##主要的参考资料有：

* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
* [后盾人的弹性布局资料](http://houdunren.gitee.io/note/css/10%20弹性布局.html#微信公众号)



