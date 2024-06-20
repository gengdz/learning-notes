# Linux 操作系统

[toc]

## 概述

### 计算机组成部分

计算机由两个部分组成：

- 硬件（CPU、内存、硬盘、显卡、网卡....)
- 软件

### 操作系统是什么

操作系统是软件的一类。

主要是协助用户调度硬件工作，充当用户和计算机硬件之间的桥梁

### Linux 系统组成

- 系统内核
- 系统级应用程序

- 内核提供最核心的功能，如： 调度 CPU、调度内存、调度文件系统、调度网络通讯、调度 IO 等
- 系统级引用程序，可以理解为出场自带程序，可供用户快速上手操作系统，如：文件管理器、任务管理器、图片查看、音乐播放

## 基础命令

### 目录结构

```bash
/
├── Applications
├── Library
├── System
├── Users
├── Volumes
├── bin
├── cores
├── dev
├── etc -> private/etc
├── home -> /System/Volumes/Data/home
├── opt
├── private
├── sbin
├── tmp -> private/tmp
├── usr
└── var -> private/var
```

<details>
  <summary>目录说明</summary>
  <p>

- / （根目录）
  所有文件和目录的起点，是整个文件系统的根。

- /bin
  存放基本用户命令的二进制文件，如常用的 shell 命令（ls, cp, mv 等）。

- /sbin
  存放系统管理命令的二进制文件，仅供管理员使用，如 init, fdisk, ifconfig 等。

- /boot
  存放启动加载器需要的文件及内核，如 vmlinuz, initrd 等。

- /dev
  包含设备文件，每个文件代表一个设备（如硬盘，光驱，USB 设备）。

- /etc
  存放系统配置文件和脚本，如网络配置文件、服务配置文件等。

- /home
  用户家目录，按用户账号分别存放，如用户 user1 的目录为/home/user1。

- /lib
  存放系统运行所需的共享库文件和内核模块。

- /media
  临时挂载点，用于可移动媒体设备（光盘，U 盘等）。

- /mnt
  临时挂载的文件系统，通常由管理员手动创建挂载点。

- /opt
  可选的应用程序包目录，用于安装附加软件包。

- /proc
  虚拟文件系统，提供系统运行时信息，如系统信息和进程信息。比如/proc/cpuinfo。

- /root
  超级用户（root）的家目录。与普通用户的家目录不同，通常位于/下而不是/home 下。

- /run
  存放系统运行时信息，如系统启动以来的数据文件。

- /srv
  存放服务相关的数据文件，如 Web 服务、FTP 服务等提供的数据。

- /sys
  另一个虚拟文件系统，提供设备和系统信息，与/proc 类似。

- /tmp
  临时文件存储目录，系统和应用程序运行时可用的临时文件。

- /usr
  用户层次的程序和数据文件，包含许多子目录，如 bin, lib, share 等，用于存放共享数据的二进制文件、库文件等。

  在 Linux 系统中， usr 目录是“Unix System Resources"或者"Unix Software Resources"的缩写，而非”user"。这个目录的作用是存放系统中大多数非系统管理程序、库文件、文档和其它与系统用户直接相关 的文件。
  具体来说， usr 目录包含如下主要内容：

  1. /usr/bin ：存放用户可执行的二进制文件，这些 通常是系统自带的或者通过包管理器安装的应用程 序。
  2. /usr/lib：包含程序运行所需的共享库文件。
  3. /usr/include ：存放 C/C++等编程语言的头文 件， 用于程序编译时引用。
  4. /usr/share ：包含不特定于机器硬件的架构的共 享数据文件，如错误消息文本、帮助文档、图标 等。
  5. /usr/local ：这是一个约定的目录，用于存放用 户自行编译安装的软件，即不是由系统发行版的包 管理系统安装的软件。这样可以避免在系统升级时 影响到这些自安装的软件。

- /var
  变量文件，如日志文件、锁文件、邮件存放目录等。内容随时会发生变化。
  </p>

</details>

### 命令的一般格式

```bash
command [options]… [parameter]…
command [options] [parameter]
```

具体说明：

1. command： 表示命令的名称，如 ls

2. option：控制命令的行为。可以有长短两种选项：

- 长选项：用 – 引导，后面跟完整的单词，如 --help
- 短选项：用 - 引导，后面跟单个的字符， 如 -a
  - 多个短选项可以组合使用，例如： -h -l -a == -hla，但是长选项不能组合使用，如 --help 后面就不能再跟另外一个单词了。
  - option 也可以有自己的参数，注意：选项与选项之间，选项与参数之间，参数与参数之间必须有空格！

3. parameter：命令的参数。多用于命令的指向目标

在 linux 中，命令的选项和参数所使用的符号也有相应的含义：

| 符号 | 含义                         |
| ---- | ---------------------------- | ------------------ |
| []   | 表示方框里的内容是可选的。   |
| <>   | 表示尖括号里面的内容必须提供 |
| a    | b                            | 二选一，或多选一。 |
| …    | 前面的内容可重复出现多次。   |
|      |                              |

以.开头的文件和文件夹默认会被隐藏，加上 -a 可以显示

### pwd： print work directory

### mkdir: make directory

-p 自动创建不存在的父目录

### touch 创建文件。表示轻轻触摸，只修改文件状态，不修改内部内容

### rm 命令可用于删除文件、文件夹

rm, unlink – remove directory entries

#### SYNOPSIS

rm [-f | -i] [-dIRrvWx] file ...
unlink [--] file
rm [-r -f]参数 1 参数 2 ......参数 N

#### DESCRIPTION

The rm utility attempts to remove the non-directory type files
specified on the command line. If the permissions of the file do
not permit writing, and the standard input device is a terminal,
the user is prompted (on the standard error output) for
confirmation.

- 同 cp 命令一样，-r 选项用于删除文件夹
- -f 表示 force，强制删除（不会弹出提示确认信息）
- 普通用户删除内容不会弹出提示，只有 root 管理员用户删除内容会有提示，所以一般普通用户用不到-f 选项

参数 1、参数 2、….…...、参数 N 表示要删除的文件或文件夹路径，按照空格隔开

### which 搜索系统命令的位置 并返回第一个搜索结果

which – locate a program file in the user's path

#### SYNOPSIS

which [-as] program ...

#### DESCRIPTION

The which utility takes a list of command names and searches the
path for each executable file that would be run had these commands
actually been invoked.

### whereis 查看可执行文件，源代码文件，手册页，给定的命令的位置

### find 路径 --name test

### grep 关键字 文件地址

### tail 查看文件尾部内容 tail -num 文件地址

### ip 命令

`ip` 命令是 Linux 系统中一个强大的网络配置工具，属于 `iproute2` 软件包的一部分，设计用于替代传统的网络管理工具，如 `ifconfig` 和 `route`。以下是关于 `ip` 命令的几个关键方面：

基本语法

```bash
ip [ OPTIONS ] OBJECT { COMMAND | help }
```

其中：

- `OPTIONS` 是全局选项，比如 `-f` 指定地址族，`-s` 显示统计数据。
- `OBJECT` 指定操作的对象，如 `link`（网络接口）、`address`（地址）、`route`（路由）等。
- `COMMAND` 是针对特定对象的操作，如 `show`（显示）、`add`（添加）、`del`（删除）等。

例子

- **显示所有接口信息**：`ip addr show`
- **给 eth0 接口配置 IP 地址**：`ip addr add 192.168.1.10/24 dev eth0`
- **添加一条默认路由**：`ip route add default via 192.168.1.1`

## 用户和权限

### root

超级管理员用户

### su

su 命令就是用于账户切换的系统命令，其来源英文单词：Switch User

语法： su[-]【用户名】

- `-` 符号是可选的，表示是否在切换用户后加载环境变量 建议带上
- 参数：用户名，表示要切换的用户，用户名也可以省略，省略表示切换到 root

说明：

- 切换用户后，可以通过 exit 命令退回上一个用户，也可以使用快捷键：`ctrl+d`
- 使用普通用户，切换到其它用户需要输入密码，如切换到 root 用户
- 使用 root 用户切换到其它用户，无需密码，可以直接切换

### sudo

可以让一条普通命令带有 root 权限

语法：sudo 其它命令

需要以 root 用户执行 visudo 命令，增加配置方可让普通用户有 sudo 命令的执行权限

#### 为普通用户配置 sudo 认证

1. 切换到 root 用户，执行 `visudo` 命令，会自动通过 vi 编辑器打开：/etc/sudoers

2. 在文件的最后添加：

```bash
xingya ALL=(ALL) NOPASSWD: ALL
```

其中最后的 `NOPASSWD:ALL` 表示使用 sudo 命令，无需输入密码

### 用户和用户组

权限控制级别：

- 用户组权限
- 用户权限

#### 用户组相关命令

需要在 root 用户下执行

| 命令     | 作用       | 使用        |
| -------- | ---------- | ----------- |
| groupadd | 添加用户组 | groupadd xy |
| groupdel | 删除用户组 | groupdel xy |

#### 用户相关命令

需要在 root 用户下执行

##### useradd

useradd 命令用于添加用户

```bash
useradd [-g ] [-d] 用户名
```

- -g 指定 group 如果不指定那么会自动创建同名组

```bash
useradd -g xy xy1
```

##### userdel

userdel 命令用于删除用户

```bash
userdel [-r] 用户名
```

- -r 删除用户名和 HOME 目录

```bash
userdel -r xy1
```

##### usermod

C
usermod 命令用于修改用户

```bash
usermod -aG 用户组 用户名
```

将指定的用户加入到指定的组

```bash
usermod -aG xy xy1
```

##### id

查看用户信息，所在的组

```bash
id 【用户名】
```

##### getent

```bash
getent passwd

getent group

```

## 实用操作

### `<C-d>`

- 退出当前账户
- 退出某些特定程序的专属页面 如： python

### histroy

历史命令

```bash
history
```

#### 使用 `!命令前缀`，自动匹配上次的命令。

使用场景：最近刚执行的几个命令

```bash
!user
```

#### `C-r`

输入内容，去匹配历史命令

### 键盘移动

- C-Left 左边一个单词
- C-Right 右边一个单词
