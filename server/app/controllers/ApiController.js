'use strict';

const jwt = require('jsonwebtoken')
const proxyFetch = require('../utils/proxyFetch')

const BaseController = require('./BaseController')
// const logger = require('../utils/logger').logger('ApiController')
const ResponseJson = require('../constant/ResponseJson')

class ApiController extends BaseController {

  // 测试
  static async test(ctx, next) {
    const order = ctx.query.order;

    switch(order) {
      case 'get_token':

        let info = {
          userId: '10001',
        }

        let token = jwt.sign(info, global.config.secret, {
          expiresIn: '10h'
        })

        ctx.cookies.set('token', token)

        ctx.body = ResponseJson.formatJson(ResponseJson.code.success, {
          token: token
        })

        break;
      default: 
        ctx.body = ResponseJson.formatJson(ResponseJson.code.success, {})
        break;
    }

    return next
  }

  // 验证 token 中间件
  static async hasToken(ctx, next) {
    var token = ctx.request.body.token || ctx.request.query.token || ctx.request.headers['x-access-token'] || ctx.cookies.get('token')

    if (token) {
      jwt.verify(token, global.config.secret, function (err, decoded) {
        if (err) {
          ctx.body = ResponseJson.formatJson(ResponseJson.code.tokenExpired)

          return next        
        } else {
          ctx.decoded = decoded
        }
      })
    } else {
      ctx.body = ResponseJson.formatJson(ResponseJson.code.tokenMiss)

      return next
    }

    await next()
  }

  // proxy 代理请求
  static async proxy(ctx, next) {

    // '/api/v1/res' -> '/v1/res'
    // let url = global.config.apiProxy + ctx.request.url.split('/api')[1]

    let url = global.config.apiProxy + ctx.request.url.replace(/\/api/, '')

    let option = {
      method: ctx.request.method,
    }

    let res = await proxyFetch(url, option)

    ctx.body = res

    return next
  }

  static async checkInfo(ctx, next) {

    ctx.body = ResponseJson.formatJson(ResponseJson.code.success, ctx.decoded)

    return next
  }

}

module.exports = ApiController;