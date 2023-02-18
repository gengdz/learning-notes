# Surfingkeys

是一个可以在 Chrome 中用 vim 的方式全键盘操作浏览器的 Chrome 插件。很适合熟悉 vim 的程序员。



## 鼠标点击

* `<Ctrl-h>` 触发元素的鼠标移入事件
* `<Ctrl-j>` 触发元素的鼠标移出事件
* `O` 打开文字中的超链接。


## 标签页

* zr 重置当前页面比例
* zi 放大页面（Zoom In）
* zo 缩小页面（Zoom Out）
* ;gt 收集包含特定关键词的标签到当前窗口
* ;gw 收集所有标签页到当前窗口



## 网页浏览

* ;U 编辑当前 URL 并刷新
* ;u 编辑当前 URL 并在新标签页打开



## 剪切板

* yv 复制指定文本
* ymv 复制多个指定文本



## 搜索栏
* go 在当前标签页打开网页
* oi 打开隐身模式
* Ctrl + n 下一项
* Ctrl + p 上一项



## 可视模式

* q 翻译光标下单词



## 插入模式

* 删除光标前的单词：`<Alt-w>`
* 删除光标后的单词：`<Alt-d>`



## 配置

* ;e 打开配置快捷键  
* :w 保存配置


```javascript
api.mapkey('<ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
api.map('gt', 'T');
api.map('<Ctrl-[>','<Esc>')
// an example to remove mapkey `Ctrl-i`j
api.unmap('<ctrl-i>');

api.map('K', 'R');
api.map('J', 'E');


api.addSearchAlias('z', '知乎', 'https://www.zhihu.com/search?type=content&q=', 's', null, function(response) {
    var res = JSON.parse(response.text);
    return res.map(function(r){
        return r.phrase;
    });
});
 
api.addSearchAlias('j', '掘金', 'https://juejin.cn/search?query=', 's', null, function(response) {
    var res = JSON.parse(response.text);
    return res.map(function(r){
        return r.phrase;
    });
});
 
// api.Hints.setCharacters('yuiophjklnm');

settings.hintAlign = "left";

api.Front.registerInlineQuery({
    url: function(q) {
        return `https://dict.youdao.com/w/eng/${q}/#keyfrom=dict2.index`;
    },
    parseResult: function(res) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(res.text, "text/html");
        var collinsResult = doc.querySelector("#collinsResult");
        var authTransToggle = doc.querySelector("#authTransToggle");
        var examplesToggle = doc.querySelector("#examplesToggle");
        if (collinsResult) {
            collinsResult.querySelectorAll("div>span.collinsOrder").forEach(function(span) {
                span.nextElementSibling.prepend(span);
            });
            collinsResult.querySelectorAll("div.examples").forEach(function(div) {
                div.innerHTML = div.innerHTML.replace(/<p/gi, "<span").replace(/<\/p>/gi, "</span>");
            });
            var exp = collinsResult.innerHTML;
            return exp;
        } else if (authTransToggle) {
            authTransToggle.querySelector("div.via.ar").remove();
            return authTransToggle.innerHTML;
        } else if (examplesToggle) {
            return examplesToggle.innerHTML;
        }
    }
});

```


