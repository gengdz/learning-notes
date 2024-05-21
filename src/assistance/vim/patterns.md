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
