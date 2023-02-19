# PowerShell 

## 命令说明：

1. 命令的构成是 Get-EventLog [-LogName] <string> [[-InstanceId] <long[]>]  [<CommonParameters>]
2. 可以通过 get-名词 -？ 的方式查看参数 (命令后面加上 -?)
3. 命令大小写不敏感
4. 是带提示的。Get-Stor什么的，然后按 Tab键 就可以自动感知带有Get-Stor前缀的命令了,多次按进行切换

## 常用命令：

* get-名词  如(get-content、get-childItem、 get-help、 get-date、 get-service)
* clear
* 进入 c: 回车即可。进入d: 回车即可
* cd 加地址 即可进入相应地址
* ls 当前文件目录
* pwd 当前文件路径
* cd.. 回到上一级目录
* mkdir 新建一个文件夹
* rmdir 删除一个文件夹
* new-item aa.md 新建一个文件
* rm : 删除文件/文件夹
* cp 文件/文件夹 目标路径
* mv  文件/文件夹 目标路径    还有一个作用 改名字 mv 旧名称 新名称
* cat test.md 正序显示内容
* tac test.md 倒叙显示内容
* rm -rf fileName/folder 删除文件或者文件夹。r 递归 f 强制

