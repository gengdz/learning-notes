# fzf

fzf is an interactive filter program for any kind of list.

It implements a "fuzzy" matching algorithm, so you can quickly type in patterns with omitted characters and still get the results you want.

## fzf 的工作方式

1. 通过标准输入向 fzf 提供文本行
2. fzf 启动一个交互式终端界面，您可以在其中使用模糊匹配算法缩小列表范围
3. 当您最终做出选择时，fzf 会将其打印到标准输出

## 使用

| 命令  | 作用                                             |
| ----- | ------------------------------------------------ |
| `C-r` | 历史中搜索                                       |
| `C-t` | 搜索当前文件夹中的内容                           |
| `Tab` | 多选                                             |
| `A-c` | 列出当前文件夹下的目录，选择后会直接进入该文件夹 |

可以使用 `vi C-t` 的方式使用 vim 打开

## 快捷键

这些快捷键可能不止可以在 fzf 下使用

eof：End of File
作用: 表示文件结束符或输入结束符。

| Action            | 快捷键                               | 说明             |
| ----------------- | ------------------------------------ | ---------------- |
| `backward-char`   | `ctrl-b`                             |                  |
| `backward-word`   | `alt-b`, `shift-left`, `ctrl-left`   |                  |
| `delete-char/eof` | `ctrl-d`                             | 删除光标下的字符 |
| `forward-char`    | `ctrl-f`                             |                  |
| `forward-word`    | `alt-f`, `shift-right`, `ctrl-right` |                  |
| `kill-word`       | `alt-d`                              | 删除光标后的单词 |
