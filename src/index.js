import * as R from 'ramda'

import './index.less';
console.log('webpack文件从这里开始打包')
console.log('现在我做了修改')

const test = () => {
    console.log('这是es6的语法')
}
test()

const showHello = R.join('hello')
console.log(showHello("webpack"))