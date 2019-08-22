## 常用指令

* ls: 显示当前目录下的所有文件
  * ls -l (或者简写为写成ll): 以列表形式显示
  * ls -a 显示所有文件
  * ls -al 以列表形式显示所有文件
* pwd 显示当前的路径
* cd指令跳转到指定的目录 
  * cd .. 跳转到上一级目录
  * cd ~ 跳转到自己的家 
* clear 清屏
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

## vim编辑器

说明：就是一个Linux系统下的记事本

进入方式是：vim

![vim编辑器模式](.\picture\vim编辑器模式.jpg)

一共有三种模式

* 命令模式：只能实现关键词搜索、复制，粘贴，删除 等功能
* 编辑模式：编辑文件的地方
* 末行模式：文件的保存，退出，文件切换

### 常用的快捷键

#### 打开文件

* vim test.md 打开这个文件
* vim + test.md 打开这个文件并将光标置于最后一行
* vim + n test.md 打开这个文件并将光标置于第n行
* vim + /string test.md 打开这个文件并高亮string 按 n 进行切换 
* vim test1.md test2.md 代表同时打开多个文件 
  * 末行模式下使用:next 或者:n 切换到下一个文件 使用:prev 切换到上一个文件

#### 命令模式

* yy 复制    nyy 从当前行开始复制n行
* p 粘贴  
* dd 删除 ndd 从当前行开始删除n行
* u撤销

#### 末行模式

* :set nu 显示行号
* :set nonu  取消显示行号
* /string 高亮string
* :noh 取消高亮
* num1,num3 co num4 把num1到num3的内容复制到num4的后面
* w 保存 w! 强制保存
* q退出 !q 强制退出
* wq保存并退出 !wq强制保存并退出

##### 补充

如果未保存则会生成.swap文件，这时候可以可以使用 rm test.swap 就会执行删除操作

### 文件和文件夹快捷键

##### 文件夹快捷键

* 创建文件 mkdir 创建文件  -p 代表递归创建
* 删除文件 rmdir 删除文件  -p 代表递归删除

##### 文件快捷键

* touch 创建文件
* rm 删除文件 -r 递归删除 -f 关闭删除确认

##### 移动文件

* cp -vRp  文件/文件夹 目标路径
* mv -v 文件/文件夹 目标路径  还有一个作用 改名字 mv 旧名称 新名称

##### 文件统计

* wc -c/l/w test.md    -c统计字节 -l 统计行号 -w 统计单词数

##### grep搜索匹配行

grep [选项] <字符串> <源文件> 

* -n 显示统计的行号
* -c 显示一个匹配到多少个
* -i 忽略大小写