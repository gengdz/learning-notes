# WeakMap

* 键名必须是对象
* WeakMap 对键名是弱引用的，键值是正常引用



## 垃圾回收

WeakMap 的键名对象不会增加引用计时器，如果一个对象不被引用了会自动删除。

当垃圾回收时因为对象被删除，这时WakeMap也就没有记录了



## 所有操作

因为是弱引用，所以 JS 规定只有以下方法

* `has(key)`
* `get(key)`
* `set(key,value)`
* `delete(key)`

