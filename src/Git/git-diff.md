# git diff

NAME
git-diff - Show changes between commits, commit and working tree, etc

SYNOPSIS
git diff [<options>] [<commit>] [--] [<path>...]
git diff [<options>] --cached [--merge-base] [<commit>] [--] [<path>...]
git diff [<options>] [--merge-base] <commit> [<commit>...] <commit> [--] [<path>...]
git diff [<options>] <commit>...<commit> [--] [<path>...]
git diff [<options>] <blob> <blob>
git diff [<options>] --no-index [--] <path> <path>

## 常用示例

```bash
# 查看工作树中的更改
git diff HEAD

# 想查看在暂存区中的更改（即已经使用 git add 添加到暂存区的那些文件）
git diff --cached --stat

# 查看最近的两个 commit 之间的差异
git diff --stat HEAD^ HEAD
```
