# git log

### `--diff-filter`

过滤只选择已添加（A），已复制（C），已删除（D），已修改（M），已重命名（R），其类型（即常规文件，符号链接，子模块，...）已更改（T），已取消合并（U）未知（X）或已配对 Broken（B）。可以使用任何过滤字符的组合（包括无）。当、\*（全部或无）添加到组合中时，如果有任何文件与比较中的其他条件匹配，则选择所有路径；如果没有与其他标准匹配的文件，则不会选择任何内容。

此外，这些大写字母可以降低排除。例如 `--diff-filter=ad` 排除添加和删除的路径。

### `git --auth`

作者

```bash
git log --auth="gengdz"
```

### `--graph`

图形化，有线条

```bash
git log --graph
```

### `git --reverse`

倒序显示 commit

### `--diff-filter`

查看删除文件的 commits

```bash
git log --diff-filter=D --summary --oneline --graph
```

恢复被删除的文件

```bash
# 先查找在那个 commit 中删除的
git log --diff-filter=D --summary --oneline --graph

# 拿到 commitId 之后，从改次提交的上一次中恢复文件
git checout commitId^ 这是文件的路径.md
```

统计代码总行数

```bash
git log  --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

## git shortlog
