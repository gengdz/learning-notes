// import * as R from 'ramda'
import React from 'react'
import { render } from 'react-dom'

// import './index.less';
console.log('webpack文件从这里开始打包')
console.log('现在我做了修改')

const test = () => {
    console.log('这是es6的语法')
}
test()

// const showHello = R.join('hello')
// console.log(showHello("webpack"))
console.log('aaaa'.includes('a'))
console.log('bbbbbbbbbbb')

let url = ''
if (DEV == 'dev') {
    url = '开发环境'
} else {
    url = '生产环境'
}

console.log('url:', url)
console.log('url:', url)


render(
    <h1>JSX</h1>, document.getElementById("root")
)


/**
 * 发送ajax请求
 */


// 这里默认访问的是8080端口
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/user', true)

xhr.onload = () => {
    console.log(xhr.response)
}
// xhr.send();
