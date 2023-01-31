# 从零开始配置 vim

## 改键
分两步走：
1. Mac 键盘设置切换上一个输入法为：`<Ctrl-Option-Command-0>`。
2. 在 `karabiner element` 的配置项 `～/.config/karabiner/karabiner.json` 中配置如下内容：
    ```json
      {
        "description": "单击shift切换输入法",
        "manipulators": [
            {
                "from": {
                    "key_code": "left_shift"
                },
                "to": [
                    {
                        "key_code": "left_shift"
                    }
                ],
                "to_if_alone": [
                    {
                        "key_code": "0",
                        "modifiers": [
                            "left_control",
                            "left_option",
                            "left_command"
                        ]
                    }
                ],
                "type": "basic"
            },
            {
                "from": {
                    "key_code": "right_shift"
                },
                "to": [
                    {
                        "key_code": "right_shift"
                    }
                ],
                "to_if_alone": [
                    {
                        "key_code": "0",
                        "modifiers": [
                            "left_control",
                            "left_option",
                            "left_command"
                        ]
                    }
                ],
                "type": "basic"
            }
        ]
      }
    ```



## 配置文件
neovim 想要加载 vimscript 配置。可以将文件放在：`~/.config/nvim/init.vim`
neovim 想要加载 lua 配置，可以将文件放在：`~/.config/nvim/init.lua` 中。



## set 语句
```bash
set attribute
```



### 设置布尔值
```bash
vim set number 
vim set number!

# 查看当前使用的值
vim set number?
```



### 设置键值对
```bash
set key=value
```



### lua 设置

#### 使用 neovim 提供的全局函数进行设置
1. 设置全局属性
    * `vim.api.nvim_set_option()`：设置值
    * `vim.api.nvim_get_option()`：获取值
2. 设置窗口相关属性
    * `vim.api.nvim_win_set_option()`：设置值
    * `vim.api.nvim_win_get_option()`：获取值
2. 设置缓冲区相关属性
    * `vim.api.nvim_buf_set_option()`：设置值
    * `vim.api.nvim_buf_get_option()`：获取值

使用示例：`vim.api.nvim_set_option('number', true)`



#### 使用元访问器进行设置
**作用域**
* `vim.o`：普通作用域
* `vim.g`：全局作用域
* `vim.b`：缓冲区作用域 
* `vim.w`：窗口作用域



**配置项**
* `vim.o`：普通作用域
* `vim.bo`：缓冲区配置项（buffer-options)
* `vim.wo`：窗口配置项


一些配置
```bash
vim.o.syntax = "enable"
vim.o.number = true
```



## 快捷键绑定
### 常见控制键的表示方式：
* `Ctrl` 键对应 `<c>` 
* `esc` 键对应 `<esc>` 
* `alt` 键对应 `<a>` 
* `shift` 键对应 `<shift>` 
* `space` 键对应 `<space>` 
* `backspace` 键对应 `<bs>` 
* `Enter` 键对应 `<cr>` 
* `f1` 到 `f12` 对应 `<f1>` 到 `<f12>` 
* 其他键 `<Left>`  `<Rigth>`  `<Home>`  `<End>`    

这些功能功能键与普通字母做配合时，将字母键放入到 `<>` 中，并以 `-` 和功能键做分割，比如：`:map <c-d> dd` 将 `<Ctrl + d>` 映射为 `dd`。
当然有时为了可读性，可以将功能键用大些字母表示，例如：`<C-d>` 就表示 `<Ctrl + d>`


### 多模式下的映射
* `nmap` 普通模式下的快捷键
* `vmap` visual 模式下的快捷键
* `imap` 插入模式下的快捷键
* `cmap` 命令行模式下的快捷键



## 键盘映射
### 删除映射
可以使用`nunmap` 来删除一条快捷键映射。如 `nunmap dd` 

un 系列命令还有
* map 对应 unmap
* imap 对应 iunmap


### 非递归映射
* nmap -> nnoremap
* imap -> inoremap
* vmap -> vnoremap
* cmap -> cnoremap
就是在原来的基础上添加 nore 作为非递归版本。



### lua 配置
neovim 定义了一系列的函数帮助我们定义、获取和删除快捷键
* `vim.api.nvim_set_keymap`：设置快捷键
* `vim.api.nvim_get_keymap`：获取快捷键
* `vim.api.nvim_del_keymap`：删除快捷键

`vim.api.nvim_set_keymap` 的定义如下：
`nvim_set_keymap({mode},{lhs},{rhs},{*opts})`

* `mode` 是模式。
* `lhs` 对应着一个键位，就是我们想映射的键位。如果是空字符，表示要禁用这个快捷键。相当于通过 `:map` 传入 `<NOP>`。 
* `rhs` 对应着将要执行的命令，是 `:map` 的第二个参数。
* `opts` 代表映射的其他属性。常见的如：`noremap` 表示禁止递归，`slient` 表示执行命令时不回显内容。


#### 访问 vim 内部变量的方式
* 使用函数的方式
* 使用元访问器。

使用元访问器会更加简便，对应的元访问器为 `vim.g`。所以我们可以使用`vim.g.mapleader = " "` 来设置。



### 键盘映射技巧


### 快速编辑 vimrc 文件
* 变量 `$MYVIMRC` 代表当前 vim 使用的配置文件的路径。
针对 neovim 来说，如果你使用init.vim 作为配置文件，那么它的值就是 `~/.config/nvim/init.vim`。如果你用 `init.lua` 作为配置文件，那么它的值就是 `~/.config/nvim/init.lua` 。只要你的配置写的位置是正确的，使用它总能对应上。
* `source` 命令。使对应的配置文件生效。

这样我们就可以快速定义快捷键了。
```bash
vim.api.nvim_set_keymap("n", "<leader>co", ":vs $MYVIMRC<CR>", {silent = true, noremap = true})
vim.api.nvim_set_keymap("n", "<leader>cs", ":source $MYVIMRC<CR>:q<CR>", {silent = true, noremap = true})
```



## 本地设置和全局设置
set 是做全局选项。
setlocal 可以设置当前被打开缓冲区的选项。

vimscript 中统一使用 setlocal 来设置本地选项。但是在 lua 中，对窗口值和缓冲区值进行了区分。并且定义了。
* `vim.api.nvim_buf_set_option` 来设置缓冲区值。
* `vim.api.nvim_win_set_option` 来设置窗口值。

number 是一个窗口值，我们可以在配置文件中加上一句 `vim.api.nvim_win_set_option(0, 'number', true)` 将0号窗口设置为显示行号。




## 缩写
基本用法：命令中输入 `:iabbrev mian main` 就会做到自动纠正。
iabbrev 是 `i+ abbrev` 合成的一条命令。

利用这个功能可以做到代码片段的能力。


lua 目前没有集成关于缩写的功能，可以使用 vim.cmd 直接执行vim命令





## 自动命令
从编程的角度来看，自动命令有点类似于事件响应，或者回调函数之类。当外部发生某些事件的时候，自动执行事先定义好的一组命令。

定义一个自动命令的格式如下:
`:autocmd type pattern cmd`
* autocmd: 自动命令以 autocmd 关键字开始，它的作用类似与 js 中定义函数时使用的 function 关键字
* type: 触发该命令的事件类型
* pattern: 事件的过滤，根据不同的事件类型有不同的含义
* cmd : 将要执行的命令


使用示例：
> 打开新文件的时候就创建
> * `:autocmd BufNewFile * w`


> 自动格式化 .html 文件
> * `:autocmd BufReadPost,BufWritePre *.html normal gg=G`


解其他的事件，可以使用 `:help autocmd-events`

还有一个很常用的 type 叫做 FileType 事件
取消 HTML 自动换行的代码做一个改写，改写成使用 FileType
```bash
:autocmd FileType html setlocal nowrap
```

根据不同的语言，定义一个快捷键快速添加注释
```bash
:autocmd FileType python nnoremap <buffer> <localleader>c I#<esc> 
:autocmd FileType javascript nnoremap <buffer> <localleader>c I//<esc>
```

结合之前介绍过的本地缩写的定义，针对不同的文件类型定义不同的缩写
```bash
:autocmd FileType c iabbrev <buffer> main int main(int argc, char* argv[]) 
:autocmd FileType python iabbrev <buffer> main if __name__ == "__main__":
```



### 自动命令组
使用关键字 augroup 来创建一个自动命令组。

分组
```lua
augroup testgrp 
    autocmd BufWrite * echom "hello1" 
    autocmd BufWrite * echom "hello2"
augroup END
```

使用 `autocmd!` 来清除同一组之前的命令。

```lua
augroup testgrp 
    autocmd!
    autocmd BufWrite * echom "hello3"
augroup END
```

### 改进自动加载配置文件的操作
利用自动命令，可以做到配置文件被保存了，就自动加载。
```bash
:augroup NVIMRC 
:    autocmd! 
:    autocmd BufWritePost init.vim source % 
:augroup END
```


### 使用 lua 添加自动命令组
使用新版 neovim api 在 neovim0.7 版本以后，我们可以使用下列 api 来创建并使用自动命令组
* `vim_create_augroup({name}, {*opts})`: 创建自动命令组，如果创建成功，返回自动命令组的id
* `nvim_create_autocmd({event}, {*opts})`：创建自动命令。

`nvim_create_augroup` 传递一个自动命令组的名称，另外它可以接受一个 table 作为属性值，目前属性值可以传入一个 clear 的布尔值，相当于是否执行 autocmd! 。
`nvim_create_autocmd` 第一个参数是一个或者多个事件字符串组成的 table，它的含义与 autocmd 中的事件相同，用的字符串也相同。第二个参数是一个表示属性的 table。常用的有:
* group: 所属自动命令组
* pattern: autocmd中的 pattern部分
* callback: 一个lua的回调函数，当事件发生时，调用该回调函数
* command : 该字段可以填入一个 vim 命令的字符串，相当于 autocmd 中的 command 部分

在 0.7 以前的版本中无法通过上述 api 来创建自动命令。但是它提供了执行 vim 命令的接口。我们可以使用 vim.cmd 来执行 vim 命令。它接收一个字符串参数，该字符串表示将要执行的 vim 命令。可以使用引号括起来，但是需要对其中的特殊字符进行转义。也可以使用 [[]] 来括起来，此时就不需要进行转义了。使用上述函数我们可以很轻松的实现上面的功能

```lua
vim.cmd[[
  augroup NVIMRC
    autocmd!
    autocmd BufWritePost init.lua source %
    autocmd BufReadPost init.lua set path+=**/*
  augroup END
]]

```


## 快捷键配置
### lua 模块加载
使用 `require("basic")` 的方式进行模块的加载




## 











