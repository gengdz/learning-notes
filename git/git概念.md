### git 基础概念
| 名称 | 含义 |
| --- | --- |
| repositories| 仓库，有几个开源项目就有几个仓库|
| star| 收藏|
| fork | 复制克隆别人的项目，该fork的项目是独立存在的|
| pull request | 克隆别人的项目，做了修改之后发起更新请求|
| watch | 关注(会在第一时间收到你关注的项目更新的)|
| issue | 问题讨论区|

### git 工作区域

| 名字   | 描述     | 命令|
| ------ | -------- |----|
| 工作区 | 开发环境 | git status|
| 暂存区 |   暂存已经修改的最后统一添加到git仓库中       | git add、  |
| git repository |   最终确定的文件保存到仓库中,别人才可以看到       |git commit -m '提交描述'、 |

### 常用的命令

| 命令                     | 使用场景                                                     |
| ------------------------ | ------------------------------------------------------------ |
| git init                 | git init 把普通文件变成由git托管的文件                       |
| git rm --cached test.md  | 1.已经提交了test.md文件，但是这个文件的性质是git不需要但是本地需要，类似的典型文件还有 node_modules<br/>2.新增了一个文件 并执行了add命令，这时可以使用这个命令 |
| git mv oldname  new name | 给文件修改名称                                               |
| git log                  | 获取日志，参数有 -p(变动)、 -1 (最近一次)、--name-only(哪个文件变动)、--name-status(文件变动的状态，是增加还是及修改) |
| git commit --amend       | 修改最新一次的提交信息                                       |
| git reset head           | 编辑了文件并执行了add操作之后，后悔了，这时候就可以使用这个命令把文件从暂存区撤回 |
| git checkout -- test.md  | 编辑了文件并执行了add操作之后，后悔了，想恢复成git远程仓库的版本放弃自己的修改的场景 |

### tag 

版本号一样的东西

命令有两个：

* git tag 获取标签列表
* git tag v1.0 打标签



 ### 分支

#### 分支出现的意义？

分支就是保证master上始终是干净的，可运行的，可靠的代码，如果要新加功能的的话，如加入bbs功能或者ask功能的时候，这时候就需要用到分支

#### 常用命令

| 命令                   | 说明/场景             |
| ---------------------- | --------------------- |
| git  branch            | 查看分支              |
| git branch home        | 创建 home 分支        |
| git checkout home      | 切换分支              |
| git checkout -b home   | 创建并切换到home分支  |
| git merge home         | 合并home分支到主分支  |
| git branch - d ask     | 删除ask分支           |
| git branch --merged    | 查看已合并的分支      |
| git branch --no-merged | 查看未合并的分支      |
| git branch -D ask      | 删除没有合并的ask分支 |

#### 分支冲突

##### 分支产生的原因？

两个分支都对同一个文件进行的改动，那么当先合并home分支的时候是没有冲突产生的，然后再合并company分支的时候就会产生冲突

##### 解决方案

用一个编辑器打开代码，然后决定去和留

#### stash

使用场景：你正在修改a分支，但是由于一些特殊的原因，不得不切换到b分支，但是现在a分支的还没有修改完成，不应该提交。但是不提交就不能切换到b分支

解决方法：是用stash相关的命令

| 命令                          | 说明/场景        |
| ----------------------------- | ---------------- |
| git stash                     | 暂存起来         |
| git stash list                | 获取暂存列表     |
| git stash apply \<?stash@{0}> | 恢复暂存区       |
| git stash drop  stash@{0}     | 删除第一个暂存区 |
| git stash pop                 | 恢复并删除暂存区 |





