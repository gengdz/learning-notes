# React中性能优化

## React.memo

说明：只能使用再函数式组件中，类似于class组件中的 **PureComponent**，作用是性能优化。

用法：`export default React.memo(ProjectCard);`

实际测试效果：

ProjectCard组件在使用了React.memo之后，当列表页面刷新的时候，该组件只加载了**pageSize 次**，如果不使用memo的话，页面加载的数量大大增加。

