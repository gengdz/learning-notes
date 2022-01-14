## 常用指令

* ls: 显示当前目录下的所有文件
  * ls -l (或者简写为写成ll): 以列表形式显示
  * ls -a 显示所有文件
  * ls -al 以列表形式显示所有文件
* pwd 显示当前的路径
* cd指令跳转到指定的目录 
  * cd .. 跳转到上一级目录
  * cd ~ 跳转到自己的家 
* clear 清屏 或者使用快捷键 (ctrl+L)
*  login 登录(说明:linux有两种界面一种是图形界面(shift+alt+F1)，一种是字符界面(shift+alt+(F2~F6) )
* logout 退出登录
* shutdown 关机
  * shutdown -h 10 10分钟之后关机
  * shutdown -r 10 10分钟之后重启
  * shutdown -k 10 10分钟之后提醒(只发出警告，不关机<闹钟>)
  * shutdown -c 取消关机 或者ctrl+c
* halt 立即关机
* reboot 立即重启
* su root 切换到超级管理员
* 查看进程 ps -ef | grep '要搜索的进程名'  --> ps -ef|grep node
* 详细查看进程 ps -aux|grep '要搜索的进程名'
* 杀死进程 1. kill PID  2.kill -s 9 PID
* 查找端口 netstat -a 或者netstat |grep 80




## 文件相关命令

### 文件夹快捷键

* 创建文件 mkdir 创建文件  -p 代表递归创建
* 删除文件 rmdir 删除文件  -p 代表递归删除

### 文件快捷键

* touch 创建文件
* rm 删除文件 -r 递归删除 -f 关闭删除确认

### 查找文件

* find 路径  -name  文件名  --> find e:/test -name aa

### 移动文件

* cp -vRp  文件/文件夹 目标路径
* mv -v 文件/文件夹 目标路径  还有一个作用 改名字 mv 旧名称 新名称

### 文件统计

* wc -c/l/w test.md    -c统计字节 -l 统计行号 -w 统计单词数

### grep搜索匹配行

grep [选项] <字符串> <源文件> 

* -n 显示统计的行号
* -c 显示一个匹配到多少个
* -i 忽略大小写

### 显示文件内容
* cat test.md 正序显示内容
* tac test.md 倒叙显示内容





## 接触到的命令

| 命令                              | 作用                                  |
| --------------------------------- | ------------------------------------- |
| curl baidu.com/ curl -v baidu.com | 发送请求，查看网站/查看请求和响应数据 |
| lsof -i:4444 | 查看端口号 |
| kill -9 PID | 杀死进程 |




