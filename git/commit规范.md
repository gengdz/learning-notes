# commit规范
commit是有一定的规范的。

每次提交 Commit message 都包括三个部分：
* *Header* (必需的)
* *Body*
* *Footer* 
```html
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```



## Header
(1) type
**type** 用来说明 commit 的类型，只能使用以下7个标示。**必需**
* feat: 新功能（feature)
* fix: 修补bug
* chore: 项目工程方面的改动，代码逻辑并未产生任何变化  <small>阿里前端规范给出的解释</small> 。(构建过程或者辅助工具的变动)
* refactor: 重构代码或其他优化举措（不是新增功能，也不是修改bug的代码改动）
* style: 对代码的格式化改动，代码逻辑并未产生任何变化
* docs: 文档（documentation)
* test: 增加测试

(2) scope
**scope** 用来说明 commit 影响的范围，比如数据层、控制层、视图层等等。**可选**

(3) subject
**subject是** commit 目的的简短描述，不超过50个字符。**必需**
* 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
* 第一个字母小写
* 结尾不加句号（.）


## 示例
```bash
feat(page): 新增xx功能
chore(*): 升级webpack的版本
chore(utils): 删除没用到的函数
```
