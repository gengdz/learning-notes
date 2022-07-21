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
vim.api.nvim_set_keymap("n", "<leader>ee", ":vs $MYVIMRC<CR>", {silent = true, noremap = true})
vim.api.nvim_set_keymap("n", "<leader>ss", ":source $MYVIMRC<CR>:q<CR>", {silent = true, noremap = true})
```



