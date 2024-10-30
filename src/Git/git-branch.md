# 分支

## 分支出现的意义？

分支就是保证 master 上始终是干净的，可运行的，可靠的代码，如果要新加功能的的话，如加入 bbs 功能或者 ask 功能的时候，这时候就需要用到分支

## Git 分支命名规范

新建分支的命名格式为：`{type}-{issue id}-{the-thing-you-do}/{version}`

- `type`：必需。就是 commit 规范中说明的那些
- `issue id`：非必需。相关 issue 的 id，没有无关，可以忽略
- `the-thing-you-do`: 非必需。分支内容说明
- `version`: 非必需。版本号

下面是符合规范的：

- `feat-ssr-prefetch`：新增 ssr prefetch 功能
- `fix-1379-component-insert-order`：修复 issue 1379 中提到的组件插入顺序 bug
- `revert-14218-memory-leak-on-unmount`：回退版本解决 issue 14218 提到的组件卸载时内存泄露的问题

说明：

- 该命名规范只针对新建的临时分支，其他常驻分支如 master develop 不受影响
- 在工程领域中为了区别发布资源的版本，往往还需要在分支中加入版本的信息。例如 DEF 平台中对于分支命名的要求为：`{prefix}/{semver}`
  `prefix`：用于简要描述迭代信息，命名遵循本节定义的 `{type}-{issue id}-the-thing-you-do` 规范
  `semver`：本次发布的迭代版本号，格式需要遵循 [semantic version](https://semver.org/lang/zh-CN/?spm=a2o8t.11089562.0.0.ea766654D5ovLk)
  比如以下格式都满足规范
  - `feat-TagInput/1.0.0`：新增 TagInput 功能，迭代版本号为 1.0.0
  - `fix-TagInput-style/1.0.0`：修复 TagInput 样式问题，迭代版本号为 1.0.0

## 分支常用命令

| 命令                                     | 说明/场景                           |
| ---------------------------------------- | ----------------------------------- |
| `git branch`                             | 查看分支                            |
| `git brahch -a`                          | 查看本地和远程分支                  |
| `git branch home`                        | 创建 `home` 分支                    |
| `git checkout home`                      | 切换分支                            |
| `git checkout -b home`                   | 创建并切换到 `home` 分支            |
| `git merge home`                         | 合并 `home` 分支到主分支            |
| `git merge origin/master`                | 合并远程主分支的代码到本地          |
| `git branch - d ask`                     | 删除 `ask` 分支                     |
| `git push origin --delete home`          | 删除远程的 `home` 分支              |
| `git branch -D ask`                      | 删除没有合并的 `ask` 分支           |
| `git branch --merged`                    | 查看已合并的分支                    |
| `git branch --no-merged`                 | 查看未合并的分支                    |
| `git rebase master` / `git merge master` | ( `git replace base` ) 更新分支代码 |

## 分支冲突

### 分支产生的原因？

两个分支都对同一个文件进行的改动，那么当先合并 home 分支的时候是没有冲突产生的，然后再合并 company 分支的时候就会产生冲突

### 解决方案

用一个编辑器打开代码，然后决定去和留

## 本地分支和远程分支关系

远程仓库的默认名称是 `origin`

> 本地分支和远程分支之间的关联关系：
>
> git remote -v
>
> git remote show origin

| 命令                                       | 用法                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| `git push -u origin home`                  | 创建远程 `home` 分支并和本地 `home` 分支联系起来                                 |
| `git push origin --delete home`            | 删除远程的 `home` 分支                                                           |
| `git pull origin home:home`                | 把远程的 `home` 分支的代码拉取到本地，<br />如果本地没有 `home` 分支那么自动创建 |
| `git checkout -b home origin/home`         | 在本地创建 `home` 分支并和远程的 `home` 分支联系起来                             |
| `git push -u origin home`                  | 1.创建远程 `home` 分支 2.将本地 `home` 代码推送到远程 `home`                     |
| `git branch --set-upstream-to=origin/home` | 把本地 `home` 分支和远程 `home` 分支相关联                                       |

> 说明：
>
> - `git pull` 的完整写法为 `git pull origin remotehome:home` 将远程的 home 分支拉取到本地的 home 分支
> - `git push` 的完整写法为 `git push origin localhome:home` 将本地的 home 分支推送到远程的 home 分支。第一个 localhome 为本地的 home ，第二个 home 为远程的 home

## git pull

强制覆盖本地分支代码：

```bash
git pull --force  《远程主机名》 《远程分支名》:《本地分支名》

<!-- 示例 -->
git pull --force origin master:daily/0.8.88
```

## 场景

切换分支：

```bash
git branch | fzf | xargs git checkout


git branch --remotes | rg -v 'origin/def_releases|origin/master' | fzf | sed 's|^ *origin/||' | xargs git checkout

# 默认情况下是以 sed 命令是以 / 作为分割符的
git branch --remotes | rg -v 'origin/def_releases|origin/master' | fzf | sed 's/^ *origin\///' | xargs git checkout
```
