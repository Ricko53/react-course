'use strict'

const fs = require('fs')
const path = require('path')

require('babel-register')

const xtpl = require('koa-xtpl')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const devEvn = process.env.NODE_ENV === 'development'

const config = require('./conf/config')
const router = require('./routes/router')

global.config = config
 
app.use(bodyParser())

if (devEvn) {
  let koaWebpack = require('koa-webpack-middleware')
  let devMiddleware = koaWebpack.devMiddleware
  let hotMiddleware = koaWebpack.hotMiddleware
  let clientConfig = require('../webpack.config.js')
  let clientCompiler = require('webpack')(clientConfig)
  clientConfig.output.filename = '[name].js'

  app.use(devMiddleware(clientCompiler, {
    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    publicPath: "/build/"
  }))
  app.use(hotMiddleware(clientCompiler))
  app.use(async (ctx,next) => {
    ctx.assets = assets([
      'userPage',
      'vendor',
    ])
    await next()
  })
  
  function assets (asset) {
    let assets = {}
    asset.forEach(i => assets[i] = {js: clientConfig.output.publicPath+`${i}.js`})
    return assets
  }
} else {
  app.use(async function(ctx, next){
    ctx.assets = require('../build/assets.json')
    await next()
  })
}

app.use(xtpl({
  root: config.views,
  cache: devEvn ? false : true
}))

router(app)

app.listen(config.port)
console.log(`app started at port ${config.port}...`)
