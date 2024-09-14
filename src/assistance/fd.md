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
fd -d2 'node|css'
fd -d1 motu -E some -E thing

fd -d1 *.md -x mv {} dest
```
