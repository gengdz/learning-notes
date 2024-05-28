# git revert

使用 `git revert commitId` 来撤销某一次的操作。

作用的方式是通过新增一次提交来撤销某一次的操作，这种情况下 git 是继续往前走的。

## 撤销历史中的某一次的提交

```bash
git revert f95f15b;

# 历史提交如下
* 48233c8 - 会产生一次新的 commit
* 0a180e8 - 在这里执行 git revert
* 5c4c254
* f95f15b - 需要删除的目标 commit
* 8b7ae91
```

`git revert` 后面还有两个参数可以选择

```bash
--no-edit：执行时不打开编辑器，直接使用 Git 生成的信息进行提交
--no-commit：只抵消暂存区和工作区的文件变化，不会产生新的提交
```

可能有冲突，如果有冲突，需要解决冲突，然后可以

- `git add filePaht` 添加冲突的文件
- `git revert --continue` 继续走流程
- `git revert --abort` 取消操作

## 撤销多个连续的提交

```bash
git revert commitIdA..commitIdB
```

## 撤销一个 Merge Commit

```bash
git show g commit g Merge: f e
```

```bash
git revert -m 1 g
```
