# 从零开始配置vim

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








