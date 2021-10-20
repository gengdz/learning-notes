# git rebase
git rebase 的作用是让我们的提交记录非常干净且简洁，利用好 rebase 可以让我们排查问题，版本回退等非常便捷。
[toc]



## 作用
* 变基
* 合并多个 commit `git rebase -i`
* 复制，粘贴 commit



## 使用场景
1. 创建一个 dev 分支，主分支发生改变，已经往前移动了，这时候，如果直接合并分支的代码就会产生合并线，使用 `git rebase` 让记录呈现出一条非常干净的线呢
2. 合并多个 commit `git rebase -i`
3. 将一段 commit 粘贴到另一个分支上 `git rebase [startpoint]  [endpoint] --onto [branchName]`



## 注意事项
1. <mark>**绝对不要在公共开发分支执行 git rebase，会引起很多问题**</mark>
2. <mark>**执行 rebase 的分支都是自己的本地分支，并且没有推送到远程版本库(没执行 push 操作)**</mark>



## 基本用法
rebase 可以理解为 replace base，他可以实现的功能就是移动分支的位置到当前的主分支位置。这时候再进行合并就不会产生合并线。
 
使用流程：
1. 切到 dev 分支，使用 `git pull --rebase origin master`
2. 切换到 master 分支，执行 `git merge dev`
3. 然后执行 `git push` 操作，把 master 分支的代码推送到远程 


```bash
git pull = git fetch + git merge 
git pull --rebase = git fetch + git rebase

# 在 dev 分支上拉取 master 分支的代码
git pull origin master 

# 在 dev 分支上拉取 master 分支的代码,使用 rebase 的方式
git pull --rebase origin master
```

如果在 rebase 的过程中发生了冲突，可以按照一下方式解决冲突
> 1. 解决一个冲突
> 2. 执行 `git add 冲突文件名`
> 3. `git rebase —-continue` 或者 `git rebase --skip`
> 4. `git push` 或者 `git push --force`
> 5. 任何时候都可以执行 `git rebase —abort`，来终止 rebase 操作




## 合并多个commit
```bash
git rebase -i  (startpoint)  [endpoint]
```
其中 `-i` 是 `--interactive`，即弹出交互式的界面让用户编辑完成合并操作。`(start, end]` 指定了一个编辑区间，如果不指定 `end`，那么该区间的终点默认是 *当前分支 HEAD 所指向的 commit*。

合并时用到命令如下：
> pick(p): 保留该 commit
> reword(r): 保留该 commit，但是要修改该 commit 的注释
> edit(e): 保留该 commit，但我要停下来修改该提交（不仅仅是修改注释）
> squash(s): 将该 commit 和 前一个 commit 合并
> fixup(f): 将该 commit 和前一个 commit 合并，但我不要保留该提交的注释信息
> exec:(x): 执行 shell命令
> drop(d): 我要丢弃该 commit 

然后我们一顿操作下来发现我们进入了一个临时分支（从 dev 分支切出来的临时分支）！！！
这个问题怎么解决呢？现在我们基于这个临时分支新建一个分支 temp, 然后我们再切回我们的 dev 分支，执行 `git rebase temp`。即可解决问题

如果想合并到上一次的改动中，或者修改上一次改动的 commit 使用 `git commit --amend` 即可

总结：
* 这次合并多个 commit，主要用到的命令是：`git rebase -i [startpoint] [endpoint]`。
* 合并完成之后，会进入一个临时分支。需要在 dev 分支上 rebase 这个临时分支。 
* 我们可以通过 `git log` 命令，查看提交的记录。



## 复制多个 commit 到另一个分支
使用到的命令是：
```bash
git rebase (startpoint) [endpoint] --onto [branchName]
```
**前开后闭**

实战操作，我们想把 dev 分支的 90bc0045b-5de0da9f2 复制到 master 分支
```bash
# 1.在 dev 分支执行如下命令 注意编辑区间为 前开后闭
git  rebase   90bc0045b^   5de0da9f2   --onto master


# 2.执行 git rebase 命令之后，我们发现当前的 HEAD 处于游离状态。 显示为 `de9998bd`。
# 这时候 HEAD 指向是对的，但是 master 分支的指向是不对的
# 所以需要 master 分支指向设置为当前 HEAD 指向即可
git checkout master
git reset --hard headCommitId
# 在本例中就是 执行 git reset --hard de9998bd
```