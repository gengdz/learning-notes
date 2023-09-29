# git commit

## commit 规范

commit 是有一定的规范的。

每次提交 Commit message 都包括三个部分：

- _Header_ (必需的)
- _Body_
- _Footer_

```html
<type
  >(<scope
    >):
    <subject>
      // 空一行
      <body>
        // 空一行
        <footer></footer></body></subject></scope
></type>
```

### Header

(1) type **type** 用来说明 commit 的类型，只能使用以下 7 个标示。**必需**

- feat: 新功能（feature)
- fix: 修补 bug
- chore: 零碎、非功能性的任务的提交。比如，更新构建脚本，更新依赖库、项目工程方面的改动等。代码逻辑并未产生任何变化
- refactor: 重构代码或其他优化举措（不是新增功能，也不是修改 bug 的代码改动）
- style: 对代码的格式化改动，代码逻辑并未产生任何变化
- docs: 文档（documentation)
- test: 增加测试
- revert: 恢复之前的提交

(2) scope **scope** 用来说明 commit 影响的范围，比如数据层、控制层、视图层等等。**可选**

(3) subject **subject 是** commit 目的的简短描述，不超过 50 个字符。**必需**

- 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

### 示例

```bash
feat(page): 新增xx功能
chore(*): 升级webpack的版本
chore(utils): 删除没用到的函数
```

## commit 的时候不进行 eslint 校验

使用 `-n/--no-verify`

```bash
git commit --no-verify -c 'commit 信息'
```

## 修改 commit 的提交信息

1. 如果修改的是最后一次 commit
   ```bash
   git commit --amend --author="name <email.com>"
   ```
2. 如果不是最后一次 commit
   ```bash
   # 1. 进入到 rebase
   git rebase
   # 2. 对需要修改的 commit 用 e 标记
   # 3. 使用 git commit --amend --author
   git commit --amend --author="name <email.com>"
   ```
