# patterns

## 按模式匹配及按原义匹配

### 界定单词的边界

用 < 与 > 符号表示单词定界符。因此，将查找命令改为 `/\v<the><CR>`，类似于 js 中的 `\b`

### 界定匹配的边界

使用 `\zs` 和 `\ze` 。

使用示例

hello ＼zsworld 匹配 可以做到搜索匹配的是 hello world 但替换是替换 world。类似于 js 的（?>hello）world

hello＼ze world 匹配 可以做到搜索匹配的是 hello world 但替换是替换 hello。类似于 js 的 hello(?=world)

## 查找

`/lang/e<CR>` 进行查找，该命令会像我们期望的那样，将光标置于查找匹配的结尾

### `:verbose`

查找映射来源（:verbose map） 如果你想查看某个映射的定义及其来源（即在哪个 脚本或配置文件中定义），可以使用 `:verbose map <key>`命令。

例如，要查找<leader>ww 映射的详 情， 你可以输入： `:verbose nmap <leader>ww` 这里 nmap 表示查找正常模式（normal mode） 下的映射，你也可以使用 vmap（可视模 式）、j imap （插入模式） 等， 具体取决于你想查询的 上下文。

查找命令或选项的设置来源（:verbose set） 如果你想知道某个选项（setting）的当前值及它是如 何被设置的， 可以使用 :verbose set <option> 。例 如，查询 backupdir 的设置来源： `:verbose set backupdir`

### `gn`

作用是：进入面向字符的可视模式，并选中下一处匹配

我自己的理解：1.跳转到下一个搜索选中的内容。2.选中内容

使用场景

gn 非常适合在替换一些文本时可以与其他 Vim 命令结合使用：

你可以使用 `cgn` 命令来更改（替换）下一个搜索模式匹配的字符串。此命令会删除匹配的字符串，并进入插入模式，使你能够输入替代文本。

重复执行上一次对 gn 执行的操作可以通过 Vim 的重复操作命令 . 来完成。

gn 是 Vim 中功能强大的文本对象之一。文本对象是指：w，b, a 等

使用示例

```bash
/foo(true)   " 搜索文本中的 'foo(true)'
cgnbar(false) " 将第一个匹配的 'foo(false)' 更改为 'bar(false)'。如果用 ciw 就会导致只修改 foo 为 bar 的情况
.      " 将找到的下一个 'foo' 也更改为 'bar'
.      " 再重复这个操作，直到所有的 'foo' 都被更改
```
