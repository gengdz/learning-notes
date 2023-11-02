## 常用指令

[toc]

- ls: 显示当前目录下的所有文件
  - ls -l （或者简写为写成 ll）: 以列表形式显示
  - ls -a 显示所有文件
  - ls -al 以列表形式显示所有文件
- pwd 显示当前的路径
- cd 指令跳转到指定的目录
  - cd .. 跳转到上一级目录
  - cd ~ 跳转到自己的家
- clear 清屏 或者使用快捷键 (ctrl+L)
- login 登录（说明：linux 有两种界面一种是图形界面(shift+alt+F1)，一种是字符界面(shift+alt+(F2~F6) )
- logout 退出登录
- shutdown 关机
  - shutdown -h 10 10 分钟之后关机
  - shutdown -r 10 10 分钟之后重启
  - shutdown -k 10 10 分钟之后提醒（只发出警告，不关机《闹钟》）
  - shutdown -c 取消关机 或者 ctrl+c
- halt 立即关机
- reboot 立即重启
- su root 切换到超级管理员
- 查看进程 ps -ef | grep '要搜索的进程名' --> ps -ef|grep node
- 详细查看进程 ps -aux|grep '要搜索的进程名'
- 杀死进程 1. kill PID 2.kill -s 9 PID
- 查找端口 netstat -a 或者 netstat |grep 80

## 文件相关命令

### 创建/删除文件夹

- 创建文件 mkdir 创建文件 -p 代表递归创建
- 删除文件 rmdir 删除文件 -p 代表递归删除

### 创建/删除文件

- touch 创建文件
- rm 删除文件 -r 递归删除 -f 关闭删除确认
- rm -rf 删除文件夹。

### 查找文件

- find 路径 -name 文件名 --> find e:/test -name aa

### 复制/移动文件

- cp -vRp 文件/文件夹 目标路径
- mv -v 文件/文件夹 目标路径 还有一个作用 改名字 mv 旧名称 新名称

### 文件统计

- wc -c/l/w test.md -c 统计字节 -l 统计行号 -w 统计单词数

### grep 搜索匹配行

grep 【选项】 《字符串》 《源文件》

- -n 显示统计的行号
- -c 显示一个匹配到多少个
- -i 忽略大小写

### 显示文件内容

- cat test.md 正序显示内容
- tac test.md 倒叙显示内容

## 接触到的命令

| 命令                              | 作用                                  |
| --------------------------------- | ------------------------------------- |
| curl baidu.com/ curl -v baidu.com | 发送请求，查看网站/查看请求和响应数据 |
| lsof -i:4444                      | 查看端口号                            |
| kill -9 PID                       | 杀死进程                              |

### cat

cat(concatenate and print files) 连接并打印文件

把文件内容输出到终端

```bash
cat ~/.zshrc
```

### ln

link 命令，创建一个链接。软链接、硬链接

```bash
ln [options] source target
```

- 第一个参数是源文件或目录的路径。这是你想要链接的文件或目录的位置。
- 第二个参数是目标路径。这是你希望链接创建在的位置。

例如，假设你有一个名为 file.txt 的文件，位于 /path/to/source/file.txt。你希望在 /path/to/target 目录下创建一个链接。

使用 link 命令的示例为：

```bash
ln -s /path/to/source/file.txt  /path/to/target
```

软链接

1. 以路径的形式存在，类似于 Windows 操作系统中的快捷方式
2. 可以跨文件系统，
3. 可以链接目录

硬链接：

1. 硬链接，以文件副本的形式存在。但不占用实际空间。
2. 不允许给目录创建硬链接
3. 硬链接只有在同一个文件系统中才能创建

### cp

复制文件或者目录

```bash
cp [options] source... directory
```

```bash
# 复制 package.json 文件到 dist 目录
cp package.json dist/

# 复制 test/ 目录到新目录 newtest
cp –r test/ newtest

```

### chmod

chmod (change mode) 更改文件或者目录的权限。

读（read）、写（write）和执行（execute）权限。

- `+r`：添加读权限。
- `+w`：添加写权限。
- `+x`：添加可执行权限。
- `-r`：移除读权限。
- `-w`：移除写权限。
- `-x`：移除可执行权限。

```bash
chmod +x a.js
```

### less

查看文本内容，它以交互式的方式显示文件内容，并允许用户在文件中进行搜索、浏览和导航。

原来有个编辑器叫做 more，less 是对 more 的改进和拓展，全称是 "less is more"

### pbcopy

作用是将文本和数据复制到剪切版中

pbcopy 本意是 pasteboard copy

> 这是 Mac 中特有的命令

用法如下

```bash
# 将文件内容复制到简介板
pbcopy < example.txt

# 将命令的输出结果复制到剪贴板：
ls | pbcopy

```

### pbpaste

作用是获取剪切板的内容

> 这是 Mac 中特有的命令

用法如下

```bash

# 将命令的输出结果复制到剪贴板：
ls | pbcopy && echo "$(pbpaste)"

```
