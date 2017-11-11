'use strict'

const fs = require('fs')
const path = require('path')

require('babel-register')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const config = require('./conf/config')
const router = require('./routes/router'),

global.config = config
 
app.use(bodyParser())

router(app)

app.listen(config.port)
console.log(`app started at port ${config.port}...`)
