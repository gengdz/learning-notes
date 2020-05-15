# tmux配置
## tmux的几个概念
一个session下面可以有几个window，一个window可以分割几个pane。



### session
一、新建会话
```bash
tmux new -s sessionName
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