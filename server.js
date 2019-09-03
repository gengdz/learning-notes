const express = require('express')
const app = express()


// 在服务端启动webpack，
// const middleware = require('webpack-dev-middleware')

// const webpack = require('webpack')

// const config = require('./webpack.config.js')

// const compiler = webpack(config)

// app.use(middleware(compiler))


app.get('/user', (req, res) => {
    res.json({ name: '耿德洲' })
})
app.listen(3000)