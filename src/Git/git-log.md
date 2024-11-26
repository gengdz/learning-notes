# git 日志

## git log

### `--diff-filter`

过滤只选择已添加（A），已复制（C），已删除（D），已修改（M），已重命名（R），其类型（即常规文件，符号链接，子模块，...）已更改（T），已取消合并（U）未知（X）或已配对 Broken（B）。可以使用任何过滤字符的组合（包括无）。当、\*（全部或无）添加到组合中时，如果有任何文件与比较中的其他条件匹配，则选择所有路径；如果没有与其他标准匹配的文件，则不会选择任何内容。

此外，这些大写字母可以降低排除。例如 `--diff-filter=ad` 排除添加和删除的路径。

### `--auth`

作者

```bash
git log --auth="gengdz"
```

### `--graph`

图形化，有线条

```bash
git log --graph
```

### `--reverse`

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
git log --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'
```

### `--pretty`

- `%ad` author date
- `%an` author name 。%a author 相关的内容
- `%s` subject
- `%Cred` switch color to red
- `%Creset` reset color

```bash
git log --pretty=format:"%h %Cblue%ad %Creset | %Cgreen %s%Creset | <%an>" --date=format:"%Y-%m-%d %H:%M:%S"
```

## git shortlog

git-shortlog - Summarize 'git log' output

### options

- -s, --summary
  Suppress commit description and provide a commit count summary only.

- -e, --email
  Show the email address of each author.

- -n, --numbered
  Sort output according to the number of commits per author instead of author alphabetic order.

### 查看提交作者和提交次数

```bash
git shortlog -sen

git shortlog -sen | rg -v "不想看到的行"

# 只展示提交次数大于 3 的结果
git shortlog -sen | awk '$1 > 3'


# 只展示提交次数大于 3 的结果，并且只展示前 20 个
git shortlog -sen | awk '$1 > 3 && NR <= 20'

git shortlog -sen | awk '$1 > 3' | head -n 20

```

## 场景

### 代码统计

```bash
git log --author "星涯" --since "yesterday" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2 } END  { printf "added: %s, removed: %s\n", add, subs }'
# 上面的命令，如果值没有空格，那么可以不用加上双引号
git log --author 星涯 --since yesterday --pretty=tformat: --numstat | awk '{ add += $1; subs += $2 } END  { printf "added: %s, removed: %s\n", add, subs }'

# author 可以有多个
git log --author "星涯" --author "xx" --since='yesterday' --pretty=tformat: --numstat | awk '{ add += $1; subs += $2 } END  { printf "added: %s, removed: %s\n", add, subs }'

```
