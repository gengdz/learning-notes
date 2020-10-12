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
| git  branch                         | 查看分支                         |
| git brahch -a                       | 查看本地和远程分支               |
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
> * git push 的完整写法为 `git push origin localhome:home` 将本地的home分支推送到远程的home分支。第一个localhome为本地的home，第二个home为远程的home 
> * git pull 的完整写法为 `git pull origin remotehome:home` 将远程的home分支拉取到本地的home分支
> 



## stash

使用场景：你正在修改a分支，但是由于一些特殊的原因，不得不切换到b分支，但是现在a分支的还没有修改完成，不应该提交。但是不提交就不能切换到b分支

解决方法：是用stash相关的命令

| 命令                          | 说明/场景        |
| ----------------------------- | ---------------- |
| git stash                     | 暂存起来         |
| git stash list                | 获取暂存列表     |
| git stash apply \<?stash@{0}> | 恢复暂存区       |
| git stash drop  stash@{0}     | 删除第一个暂存区 |
| git stash pop                 | 恢复并删除暂存区 |



## gitconfig配置

### 查看和配置命令

* `git config -- global(local) —list`   查看全局或者是本地配置
* `git config --global(local) user(alias).email  1583751445@qq.com`

### 配置方式

* 一种是使用git 的全局配置，配置文件的位置在C:\Users\dezhougeng\.gitconfig 文件中，设置的方式有两种
  * 通过 `code .gitconfig` 打开配置界面，然后设置
  
  * 通过命令直接设置 `git config --global alias.s   status`
  
  * 目前的设置如下：
  
     ```javascript
      [alias]
      	a = add .
      	c = commit
      	s = status
      	l = log
      	b = branch
     ```
  
* 一种是使用系统进行配置。window下 配置文件在`C:\Users\dezhougeng\.bash_profile` 文件中。打开方式为 `code .bash_profile`；mac下配置文件在 `~/.zshrc`，打开方式为 `code .zshrc`

  * 目前的设置如下：

     ```javascript
     alias gs="git status"
     alias gc="git commit -m "
     alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit  "
     alias gb="git branch"
     alias ga="git add ."
     alias go="git checkout"
     ```



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



## git commit 说明
### Commit message的格式
每次提交 Commit message 都包括三个部分：*Header*, *Body* 和 *Footer* 。其中 *Header* 是必须的。
```html
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```



#### Header
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


#### 示例
```bash
feat(page): 新增xx功能
chore(*): 升级webpack的版本
chore(utils): 删除没用到的函数
```

## 场景化使用教程

### 场景一

小明同学新进入一家公司，他需要创建自己的远程分支和本地分支，进行开发，开发完之后删除自己的远程分支和本地分支，这时候他需要怎么做？

```bash
#克隆 创建分支
git clone
git checkout -b test

#写代码，并且提交
git add .
git commit -m '第一次提交'
git checkout master
git pull
git checkout test
git rebase master
git push --set-upstream origin test
git checkout master
git merge test
git push


```



**场景一遇到的问题如下**

1、首先他写了4个文件，但是只提交两个，当他使用 git rebase master的时候提示 Cannot rebase: You have unstaged changes. Please commit or stash them. 这个时候他选择使用stash

```bash
git stash

git stash apply stash@{0}
git stash drop stash@{0}
# 上面的apply和drop可以使用
git pop stash

git stash list

```

2、他想查看状态，并且查看哪些已经合并哪些没合并，查看分支状况

```bash
git status
git branch -a
git remote -v
git remote show origin
```

3、有个文件夹的名字写错了，他想重命名一下，同时重命名一下文件的名字

```bash
git mv test xiaoming
git mv xiaoming/a.md xiaoming/b.md
```



### 场景二

一、小明写了一些东西，这个时候还没提交，然后想把改的这些东西都撤销掉

```bash
# 新推出了git restore命令(推荐)
git restore aa.md

# 之前的方式是
git checkout --aa.md
```

二、小明已经执行了git add,然后他想撤销

```bash
# 新推出了git restore命令(推荐)
git restore --staged aa.md bb.md;

# 之前的方式
git reset head aa.md bb.md
```

三、小明执行了git commit操作，然后想撤销

```bash
#使用索引值的方式回退【推荐】
git reset --soft c9a62af(撤销成上一次就输入上一次的commitId,而不是刚commit的这次Id)

git reset --soft head^
```

四、小明执行了git push操作，就是说已经推送到远程，然后想撤回

```bash
#使用索引值的方式回退【推荐】
git reflog
git reset --soft c9a62af
git push origin test --force

git reset --soft head^
#或者使用
git reset --soft head~1
```



### 场景三

小明需要改一个bug，然后还有把这个修复，同步到别的分支这时候应该怎么做呢

```bash
git cherry-pick commitId
```



### 场景四

小明现在本地有一个项目代码，他想把这个代码上传到已经存在的GitHub仓库里面此时他需要怎么做呢？

```bash
# 添加远程仓库
git remote add origin https://github.com/gengdz/antd-course.git

# 更新远程仓库代码到本地
git pull origin master --allow-unrelated-histories

# 然后再执行push操作
git push -u origin master
```



### 场景五

小明修改了55个文件，这时候他需要提交其中的50个，有几个如a.js他不想提交，这时候他应该怎么做？
```bash
# 提交除了a.js以外的文件
git update-index --assume-unchanged 'a.js'

# 需要提交的文件处理完成之后，将a.js放出来
git update-index --no-assume-unchanged 'a.js'

```



### 批量删除本地分支

批量删除本地分支

```shell
git branch -a | grep -v -E 'master|develop' | xargs git branch -D
```

命令说明：

`grep -v -E 'master|develop’` 排除 `master | develop`。

-v 排除

-E 使用正则表达式

xargs 将前面的值作为参数传入 `git branch -D` 后面

