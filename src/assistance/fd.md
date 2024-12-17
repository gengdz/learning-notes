# fd

FD(1) General Commands Manual FD(1)

NAME
fd - find entries in the filesystem

SYNOPSIS

```bash
  fd [-HIEsiaLp0hV] [-d depth] [-t filetype] [-e ext] [-E exclude] [-c when] [-j num] [-x cmd] [pattern] [path...]
```

DESCRIPTION
fd is a simple, fast and user-friendly alternative to find(1).

       By default fd uses regular expressions for the pattern. However, this
       can be changed to use simple glob patterns with the '--glob' option.

       By default fd will exclude hidden files and directories, as well as any
       files that match gitignore rules or ignore rules in .ignore or
       .fdignore files.

## 常见用法

```bash

# 匹配 demo1.js demo-this.js
fd 'demo.*.js'

fd -g '*demo*.js'

fd -d2 'node|css'

fd -d1 motu -E some -E thing

fd -d1 *.md -x mv {} dest


fd -d1 -H -E .git -x cp -R {}  ../mini-demo

# 输出 src 目录下的所有文件
# -p --full-path
fd -tf -p src

# 查找所有文件，按大小筛选出 前 20
fd -tf -x du -h | sort -rh | head -n 20

# 查找 src 下所有文件，排除图片，按大小筛选出 前 20
fd -tf -p src -x du -h | rg -v '\.(jpg|png|gif)$' | sort -rh | head -n 20

fd -tf -p src -x du -h | rg -v -e 'jpg' -e 'png' -e 'gif' | sort -rh | head -n 20

# 查找 bak.tsx 文件 一定要加上" "
fd -tf -g "**/*bak.tsx"

# -p 和 -g 组合使用
fd -tf -p -g '**/src/**/*.md'
```
