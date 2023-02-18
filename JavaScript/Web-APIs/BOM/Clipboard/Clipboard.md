# Clipboard API 实现剪切板操作

目前一共三种方式实现剪切板操作
* `document.execCommand()` 
* `navigator.clipboard.xx()`
* copy 事件和 paste 事件



## execCommand

```javascript
const inputElement = document.querySelector('#input');
inputElement.select();
document.execCommand('copy');

const pasteText = document.querySelector('#output');
pasteText.focus();
document.execCommand('paste');
```

这些方法都是同步的。

缺点：
* 由于是同步操作，如果数据量大，会造成页面的卡顿
* 它只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。



## Clipboard API

使用条件：
只有 HTTPS 协议的页面和 localhost 才能使用这个 API。
调用时需要明确获得用户的许可。弹窗提醒用户是否要允许。

特点：
* 都是异步方法。
* 可以复制任意内容（包括图片等）



用法
* Clipboard.readText() 读取剪贴板里面的文本数据。
* Clipboard.read() 读取剪切板中的数据
* Clipboard.write() 将内容写入到剪切板
* Clipboard.writeText() 将文本内容写入到剪切板。


```javascript
const text = await navigator.clipboard.readText();
navigator.cliboard.read();
```



## copy 和 paste 事件
```javascript
// 将用户放入剪贴板的文本，转为大写。
const source = document.querySelector('.source');
source.addEventListener('copy', (event) => {
  const selection = document.getSelection();
  event.clipboardData.setData('text/plain', selection.toString().toUpperCase());
  event.preventDefault();
});
```

```bash
* Event.clipboardData.setData(type, data)：修改剪贴板数据，需要指定数据类型。
* Event.clipboardData.getData(type)：获取剪贴板数据，需要指定数据类型。
* Event.clipboardData.clearData([type])：清除剪贴板数据，可以指定数据类型。如果不指定类型，将清除所有类型的数据。
* Event.clipboardData.items：一个类似数组的对象，包含了所有剪贴项，不过通常只有一个剪贴项。
```
