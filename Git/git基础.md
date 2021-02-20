# Git基础
`Git` 是一个版本控制软件
[toc]


## 一些命令
| 命令                     | 使用场景                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| git init                 | git init 把普通文件变成由git托管的文件                       |
| git show commitId | 查看某一个commit的具体改动 |
| git diff | 进行比对 |
| git rm --cached test.md  | 1.已经提交了test.md文件，但是这个文件的性质是git不需要但是本地需要，类似的典型文件还有 node_modules<br/>2.新增了一个文件 并执行了add命令，这时可以使用这个命令 |
| git mv oldname  new name | 给文件修改名称                                               |
| git log                  | 获取日志，参数有 -p(变动)、 -1 (最近一次)、--name-only(哪个文件变动)、--name-status(文件变动的状态，是增加还是及修改) |
| git commit --amend       | 修改最新一次的提交信息                                       |



## stash
使用场景：你正在修改a分支，但是由于一些特殊的原因，不得不切换到b分支，但是现在a分支的还没有修改完成，不应该提交。但是不提交就不能切换到b分支

解决方法：是用stash相关的命令

| 命令           | 说明/场景      |       示例     |
| ----------------| -----------|-----------------|
| `git stash`        | 暂存起来       | `git stash` <br/> `git stash save "暂存的内容说明"`  |
| `git stash list`    | 获取暂存列表    |                 |
| `git stash apply stash@{0}` | 恢复暂存区      |                 |
| `git stash drop stash@{0}`     | 删除第一个暂存区 |                 |
| `git stash show`    | 查看stash内容 | `git stash show ` -> 显示 stash 差异总结 <br/> `git stash show -p` -> 显示完整的差异 <br/> `git stash show stash@{0} -p` -> 显示具体某个stash的差异   |




## reset的用法

常用在 执行了add操作，并且执行了commit 操作之后，没执行push操作，想撤销commit的时候

| 参数        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| **-- soft** | 不删除工作空间改动代码，撤销commit，不撤销git add . (这个安全常用) |
| **-- hard** | 删除工作空间改动代码，撤销commit，撤销git add .              |

注意完成这个操作后，就恢复到了上一次的commit状态。

| 命令                       | 说明                |
| -------------------------- | ------------------- |
| git reset --hard commit_id | 回退到commit_id版本 |
| git reset --hard head^     | 回退到上一版本      |
| git reset --hard head~1    | 回退到上一或者n版本 |
| git reflog                 | 查看所有版本        |



## tag 

版本号

| 命令         | 说明         |
| ------------ | ------------ |
| git tag      | 获取标签列表 |
| git tag v1.0 | 打标签       |


## 参考
* [阿里巴巴前端技术官网规范](https://f2e.alibaba-inc.com/markdown?spm=a2o8t.11089562.0.0.7d076654j0cg8Q&gitlab=f2e-specs%2Fstyle-guide%2F2.engineering%2F1.git.md#2-git-%E5%88%86%E6%94%AF%E5%91%BD%E5%90%8D%E8%A7%84%E7%BA%A6)
