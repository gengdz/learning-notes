# Markdown

资料

- [markdownguide](https://www.markdownguide.org/basic-syntax/)

## 图

[mermaid](http://mermaid.js.org/intro/)

## `:::xxx`

```markdown
:::info

:::
```

:::info

这是是一些重要的信息

:::

## 解锁表情

emoji

<https://gist.github.com/rxaviers/7360908>

特点是：

- 通过下划线连接单词：a_b

```markdown
:smile:
```

:smile: :iphone:

## 表格对齐

```markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |
```

## 删除线

```markdown
~~需要删除的内容~~
```

~~需要删除的内容~~

## 下划线

```markdown
++下划线++
```

++下划线++

## 代办事项

```markdown
- [ ] 未办事件
- [x] 已办事件
```

- [ ] 待办
- [x] 已处理

## 脚注

```markdown
<!-- 1. 定义脚注 -->

在这段文字后添加一个脚注[^footnote]。

<!-- 2. 脚注实现 -->

[^footnote]: 这里是脚注的内容。
```

在这段文字后添加一个脚注[^footnote]。
[^footnote]: 这里是脚注的内容。

> footnote 可以是任意英文字符； 脚注的内容可以放在文章的任意位置（一般放最后）。

## 打空格的方式

> [具体的可以看这里](https://www.jianshu.com/p/31eade263e7a)

- `&emsp;` &emsp;它叫“全角空格”，全称是 **Em Space**，其占据的宽度正好是 1 个中文宽度，而且基本上不受字体影响。
- `&ensp; ` &ensp; 它叫“半角空格”，全称是 **En Space**，其占据的宽度正好是 1/2 个中文宽度，而且基本上不受字体影响。
- `&nbsp;`&nbsp;它叫不换行空格，全称是 **No-Break Space**，该空格占据宽度受字体影响明显而强烈。

## 生成目录

使用 `[toc]`

## 间隔线

使用 `---` 三个减号来实现

## 链接

```markdown
[描述文字](链接的地址)
```

## 插入图片的方式

```markdown
![描述文字](链接的地址)
```

![蓝 1|center|200*200](https://files.mdnice.com/blue.jpg)

## 横屏滑动幻灯片

通过`<![](url),![](url)>`这种语法设置横屏滑动滑动片，具体用法如下：
<![蓝 1](https://files.mdnice.com/blue.jpg),![绿 2](https://files.mdnice.com/green.jpg),![红 3](https://files.mdnice.com/red.jpg)>
