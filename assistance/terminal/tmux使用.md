# tmux配置
## tmux的几个概念
一个session下面可以有几个window，一个window可以分割几个pane。



### session
一、分离对话
```bash
tmux detach
```


二、新建会话
```bash
tmux new -s sessionName
```

三、切换对话
```bash
tmux switch -t sessionName
```



#### window
一、新建window
```bash
tmux new-window -n windowName
```

二、window重命名
```bash
tmux rename-window newName
```

三、交换窗口的位置
```bash
# 比如我目前在 buffett窗口，我想让这个窗口和 `note` 窗口交换位置
tmux swap-window -t note
```

## 一些快捷键或者命令行
* 翻屏模式 `ctrl + b + [`。然后使用 *方向键* 或者使用 *pageUp, pageDown* 进行翻屏
* 退出翻屏模式 `q`
* 切换窗口 `ctrl + b + p/n`
* 最大化窗格：`ctrl + b + z`。
* 所有tmux命令：`tmux list-commands`



## tmux美化
```bash
# 设置对齐方式
tmux set-option -g status-justify centre

# 设置背景样式
tmux set -g status-bg '#477b79'

# 设置左边栏的宽度
tmux set -g status-left-length 100

# 设置右边栏的样式
tmux set -g status-right '#[fg=white,bg=default,bright]%H:%M:%S #[fg='#bdc3c7']%Y-%m-%d %a'

```