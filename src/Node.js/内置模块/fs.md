# fs

> 不能直接手动鼠标创建吗，为啥要用命令：
>
> 文件系统的是为了自动化。当用户访问网站的情况。

`__dirname` 是 Node.js 中的一个全局变量，指的是当前模块文件所在的目录的绝对路径。

## fs.existsSync

function existsSync(path: fs.PathLike): boolean (+2 overloads)

Returns `true` if the path exists, `false` otherwise.

For detailed information, see the documentation of the asynchronous version of
this API: [exists](file:///Users/xingya/Documents/projects/vn/node_modules/.pnpm/%40types%2Bnode%4020.14.10/node_modules/%40types/node/fs.d.ts#L3476%2C5).

## fs.writeFile

fs.writeFile 写入文件内容。

文件目录是 相对于命令运行的工作目录

解决方法：`__dirname` 是全局变量 保存的是 所在文件的所在目录的绝对位置

## fs.appendFile

fs.appendFile 往文件追加内容。

## fs.createWriteStream

fs.createWriteStream 写入流对象

适用于频繁写入或者大文件写入。

Node 中换行。\r\n 换行

文件读取和这个类似

## fs.readFile

## fs.createReadStream

rs.on(data

rs.on(end

proces.memoryUsage() 查看该进程运行时内存使用情况。

### demo

文件复制

先读后写。可以采用普通的读取，也可以采用流式的读取。

rs.pip(ws)

## fs.rename

文件重命名和移动。

## fs.rm

## fs.unlink

删除文件。

## fs.mkdir

fs.mkdir make directory

修改 vscode 文件夹显示 compact folds

## fs.readdir

## fs.rmdir

fs.rmdir 删除文件夹

### fs.stat

查看文件或者目录的状态信息

常用来分析给定的路径是否是一个文件夹。

```javascript
const fs = require('fs');

const pathToCheck = '/your/path/here';

fs.stat(pathToCheck, (err, stats) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Is directory?', stats.isDirectory());
});
```
