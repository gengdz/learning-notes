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



## 分支

### 分支出现的意义？

分支就是保证 master上始终是干净的，可运行的，可靠的代码，如果要新加功能的的话，如加入 bbs 功能或者 ask 功能的时候，这时候就需要用到分支

### 分支常用命令

| 命令                                | 说明/场景                        |
| ----------------------------------- | -------------------------------- |
| `git branch`                        | 查看分支                         |
| `git brahch -a`                       | 查看本地和远程分支               |
| git branch home                     | 创建 home 分支                   |
| git checkout home                   | 切换分支                         |
| git checkout -b home                | 创建并切换到home分支             |
| git merge home                      | 合并home分支到主分支             |
| git branch - d ask                  | 删除ask分支                      |
| git branch -D ask                   | 删除没有合并的ask分支            |
| git branch --merged                 | 查看已合并的分支                 |
| git branch --no-merged              | 查看未合并的分支                 |
| git rebase master/ git merge master | (git replace base)  更新分支代码 |

### 分支冲突

#### 分支产生的原因？

两个分支都对同一个文件进行的改动，那么当先合并home分支的时候是没有冲突产生的，然后再合并company分支的时候就会产生冲突

#### 解决方案

用一个编辑器打开代码，然后决定去和留

### 本地分支和远程分支关系

远程仓库的默认名称是 `origin`

> 本地分支和远程分支之间的关联关系：
>
> git remote -v 
>
> git remote show origin

| 命令                                                         | 用法                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1. git push -u origin home<br> 2. git push --set-upstream origin test<br> 3. git branch --set-upstream-to=origin/company company | 创建远程home分支并和本地home分支联系起来                     |
| git push origin --delete home                                | 删除远程的home分支                                           |
| git pull origin home:home                                    | 把远程的home分支的代码拉取到本地，<br />如果本地没有home分支那么自动创建 |
| git checkout -b home origin/home                             | 在本地创建home分支并和远程的home分支联系起来                 |
| git push -u origin home                                      | 1.创建远程home分支 2.将本地home代码推送到远程home            |
| git branch –-set-upstream-to=origin/home                     | 把本地home分支和远程home分支相关联                           |

> 说明：
>
> * git pull 的完整写法为 `git pull origin remotehome:home` 将远程的home分支拉取到本地的home分支
> * git push 的完整写法为 `git push origin localhome:home` 将本地的home分支推送到远程的home分支。第一个localhome为本地的home，第二个home为远程的home 



## git pull

强制覆盖本地分支代码：
```bash
git pull --force  <远程主机名> <远程分支名>:<本地分支名>

<!-- 示例 -->
git pull --force origin master:daily/0.8.88
```



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
