# git clean

## NAME

git-clean - Remove untracked files from the working tree

## SYNOPSIS

git clean [-d] [-f] [-i] [-n] [-q] [-e <pattern>] [-x | -X] [--] [<pathspec>...]

## DESCRIPTION

Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.

Normally, only files unknown to Git are removed, but if the -x option is specified, ignored files are also removed. This can, for example, be useful to remove all build products.

If any optional <pathspec>... arguments are given, only those paths that match the pathspec are affected.

## Options

## 用法

删除所有未被跟踪的文件和目录

```bash
git clean -df
```
