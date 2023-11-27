# git reset

`git reset` 会回到某个 commit。会**丢弃掉某个提交 _之后_ 的所有提交**

`git reset` 的原理是：让最新提交的指针回到某个时间点前，这个时间点之后的提交都从历史中消失。

## 参数和命令

| 参数        | 说明                                                                 |
| ----------- | -------------------------------------------------------------------- |
| **-- soft** | 不删除工作空间改动代码，撤销 commit，不撤销 git add . (这个安全常用) |
| **-- hard** | 删除工作空间改动代码，撤销 commit，撤销 git add .                    |

注意完成这个操作后，就恢复到了上一次的 commit 状态。

| 命令                       | 说明                  |
| -------------------------- | --------------------- |
| git reset --hard commit_id | 回退到 commit_id 版本 |
| git reset --hard head^     | 回退到上一版本        |
| git reset --hard head~1    | 回退到上一或者 n 版本 |
| git reflog                 | 查看所有版本          |

## 使用

```bash
* cf49755 - (HEAD -> master, origin/master, origin/HEAD) chore(Git): 需要撤销的提交 test-d (2 分钟前) <gengdz>
* e6177a2 - chore(Git): 需要撤销的提交 test-c (2 分钟前) <gengdz>
* 3cb9852 - chore(Git): 需要撤销的提交 test-b (3 分钟前) <gengdz>
* 8017c4c - chore(Git): 需要撤销的提交 test-a (4 小时前) <gengdz>
* 48233c8 - Revert "feat(Git): 需要删掉的测试文件" (4 小时前) <gengdz>
```

1. 撤销到 test-b。舍弃 test-c、test-d

   ```bash
   git reset --hard 3cb9852
   ```

2. 撤销完之后，想要还原回来

   ```bash
   git reflog
   git reset --hard cf49755
   ```

3. 如果想删除 test-b 别的都保留应该怎么做？
   这时候使用 `git revert` 或者 `git rebase` 的 drap 功能
