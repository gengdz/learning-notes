#! /bin/bash

name="gengdezhou"
# echo $name
#
# array=('a' 'b' 'c')
#
# echo "第一个元素为：${array[1]}"
#
# echo "接收的参数 ${1} 、  ${2}"
#
# echo $#
# echo $*
#
# # echo "-- \$@ 演示 ---"
# # for i in "$@"; do
# # 	echo $i
# # done
#
# read "?请输入你的名字: " userName
#
# echo $userName

if [ -e $name ]; then
	echo "name is empty"
else
	echo "my name is $name"
fi

printUserInfo() {
	echo "user name is $USER"
	echo "user id is ${UID}"
}

printUserInfo
