# Flex布局

## 什么是Flex 布局？

Flex是 **flexible box**  的缩写,意思是***弹性布局***，具体开发来说就是程序员只要声明布局的行为即可，具体实现由浏览器完成。

## Flex的基本概念

* 容器
  * 主轴(*main axis*) 默认是水平反向
  * 交叉轴(*cross axis*)
* 项目(item)  



## Flex API

* 容器的api有 `6` 个，他们分别是 

  | api名称                                                      | 作用                                                         |
  | ------------------------------------------------------------ | :----------------------------------------------------------- |
  | flex-direction                                               | 规定了主轴的方向 row(默认) column                            |
  | flex-wrap                                                    | 规定了换行的方式 wrap nowrap(默认)                           |
  | flex-flow                                                    | 是*flex-direction* 和*flex-wrap* 的简写 默认值为：row nowrap |
  | <span style='white-space:nowrap'>justify-content&emsp;</span> | 规定了主轴的对齐方式(flex-start、flex-end、center、 space-between(空格在中间)、space-around(空格在两边)) |
  | align-items                                                  | 规定了交叉轴的对齐方式(**适用于一行或者多行**)               |
  | align-content                                                | 规定了多行(多根轴线)的对齐方式(**仅在多行的时候生效**)       |



* 项目的api也有 `6` 个，他们分别是

  | api名称                                                 | 作用                                                         | 说明/注意项                                                  |
  | :------------------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | order                                                   | 规定了项目的排列顺序默认是0  数值越小越靠前                  |                                                              |
  | <span style='white-space:nowrap'>flex-grow&emsp;</span> | 项目的放大比例，默认是0 (即使存在剩余空间,也不放大)          |                                                              |
  | flex-shrink                                             | 项目的缩小比例，默认为1 (如果空间不足将缩小)                 |                                                              |
  | flex-basis                                              | 项目的宽度                                                   | *如果同时设置了width,那么width将不生效*                      |
  | flex                                                    | 是<br/>*flex-grow* 、<br/>*flex-shrink*、<br/>*flex-basis*<br/>的简写 | flex:auto(flex:1 1 auto)、<br/>flex:none(0 0 auto),<br/>flex:1(1 1 0%),<br/>flex 如果只有一个非零数字，则其代表的是flex-grow的值。即放大比例 flex <br/>如果只有一个百分比那么其代表的是flex-basis的值。 |
  | align-self                                              | 可以单独设置项目的align-items                                |                                                              |



