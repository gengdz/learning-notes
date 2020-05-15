# tmux配置
## tmux的几个概念
一个session下面可以有几个window，一个window可以分割几个pane。



### session


```bash
tmux set -g status-right '#[fg=white,bg=default,bright]%H:%M:%S %p#[default] #[fg=blue]%Y-%m-%d %a'
set -g status-right '#[fg=green,bg=default,bright]#(uptime) #[fg=white,bg=default]%l:%M:%S %p#[default] #[fg=blue]%Y-%m-%d%a'

```