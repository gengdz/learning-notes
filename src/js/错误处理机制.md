# js中的错误处理

## Error实例对象

```javascript
const err = new Error('出错了')
err.message	// 出错了
```

实例对象的属性：

- **message**：错误提示信息
- **name**：错误名称（非标准属性）
- **stack**：错误的堆栈（非标准属性）



## 原生错误类型

**Error** 实例对象是最一般的错误类型，在它的基础上，js还定义了其他6中错误对象。也就是说，存在 **Error**的6个派生对象

### SyntaxError 对象

`SyntaxError` 对象是解析代码时发生的语法错误。

```javascript
// 变量名错误
var 1a;
// Uncaught SyntaxError: Invalid or unexpected token

// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```



### ReferenceError 对象

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

```javascript
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined
```



### RangeError 对象

`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

```javascript
// 数组长度不得为负数
new Array(-1)
// Uncaught RangeError: Invalid array length
```



### TypeError 对象

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。

```javascript
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```



### URIError 对象

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

```javascript
decodeURI('%2')
// URIError: URI malformed
```



### EvalError 对象

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。



## 自定义异常

如果是es5可以使用function和原型的方式自定义一个异常，如果是es6可以使用class和extends来实现

```javascript
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```



## try...catch

try对可能出错的地方进行捕获，然后，在catch中处理，`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```javascript
try {
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);
// 111
// 222
```



## finally

就是不管发生错误或者没发生错误，finally都会执行

```javascript
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

