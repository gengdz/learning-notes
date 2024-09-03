# Modes

## Normal Mode

## Insert Mode

## Visual Mode

## Command-Line Mode

1. `:!command` 用于执行一个外部命令 command。

   请看一些实际例子：
   `:!ls`- 用于显示当前目录的内容。
   `:!rm FILENAME` - 用于删除名为 FILENAME 的文件。

2. `:w FILENAME` 可将当前 VIM 中正在编辑的文件保存到名为 FILENAME 的文
   件中。

3. v motion `:w FILENAME` 可将当前编辑文件中可视模式下选中的内容保存到文件
   FILENAME 中。

4. `:r FILENAME` 可提取磁盘文件 FILENAME 并将其插入到当前文件的光标位置
   后面。

5. `:r !dir` 可以读取 dir 命令的输出并将其放置到当前文件的光标位置后面。

```bash

:r !sed -n '20,30p' /Users/xingya/Documents/projects/personal/learning-notes/src/assistance/vim/vim.md

# 读取命令的一部分行
:r !man cp | col -b | sed -n '20,30p'

```
