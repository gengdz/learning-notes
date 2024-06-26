# ripgrep

## 使用说明

- `man rg`
- [ripgrep 文档](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)
- [Rust 正则语法](https://docs.rs/regex/1.9.5/regex/#syntax)

## Option

```bash
rg '正则' javascript
```

特别说明：

- 在命令行使用 rg 时，搜索的内容使用**单引号**，这样就*不用转义双引号*了

### rg -g(--glob)

原意是 globbing 通配，专门用来匹配文件的。

用一个模式来匹配文件和文件夹

```bash
-g *.jsx "const"

-g "*.{js,md}" "vim"
```

`--glob=!{pnpm-lock.\*}`

- 代表任意数量的字符

在 ripgrep 中，--glob=!{pattern} 的语法表示排除匹配 pattern 的文件。

具体来说，!{pnpm-lock.\*} 表示排除文件名以 pnpm-lock. 开头的文件

### rg --iglob

-g 的 大小写不敏感模式

```bash
# args 插件
"正则" --iglob javascript/**

--iglob assistance/** "vim"
# args 不包含
--iglob !assistance/** "vim"

#
rg --iglob="assistance/**" "vim"
```

### rg -F

rg 默认使用正则进行搜索。可以使用 -F 将模式视为字面量字符串

```bash
rg -F '需要搜索的内容'
```

### rg -uu

默认 rg 会忽略 .gitignore 和隐藏文件，可以使用 -uu 来查询所有内容：

```bash
rg -uu 'word' .
```

### rg -e

使用 -e REGEX 来指定正则表达式

```bash
rg -e '*sql' -C2
```

使用场景：

多个搜索模式

但是当你需要使用多个搜索模式时，-e 选项就变得不可或缺：

```bash
rg -e "config.*maps.*lus" -e "another.*pattern"
```

在这种情况下，rg 会匹配 "config.*maps.*lus" 或 "another.\*pattern"，即只要有一个模式匹配即可。

### rg -w

查一个单词

### rg -t

查文件类型

```bash
rg -tjson 'rg'

```

### rg -l

只显示的路径，不显示具体匹配到的内容

```bash
rg -l 'const'
```

### rg -v

排除匹配的行

```bash
rg -v 'const'
```

-v, --invert-match

    This flag inverts matching. That is, instead of printing lines that match, ripgrep will print lines that don't match.

    Note that this only inverts line-by-line matching. For example, combining this flag with -l/--files-with-matches will emit files that contain any lines that do not match the patterns
    given. That's not the same as, for example, --files-without-match, which will emit files that do not contain any matching lines.

    This flag can be disabled with --no-invert-match.

### 其他

| option    | 作用                           | 示例      |
| --------- | ------------------------------ | --------- |
| rg -A NUM | (after)展示匹配后的 NUM 行     | `rg -A 2` |
| rg -B NUM | (before)展示匹配前的 NUM 行    | `rg -B 2` |
| rg -C NUM | (context)展示匹配前后的 NUM 行 | `rg -C 2` |

## ripgrep 配置

在 .ripgreprc 中配置

```bash

# Search hidden files and directories.
--hidden

# Searches case insensitively.
--smart-case

# 不搜索 .git 文件夹
--glob=!.git/*
# 不搜索 .*-lock 文件夹
--glob=!{*-lock.*}

--type-add
tsx:*.tsx

```
