'use strict';

const BaseController = require('./BaseController')
// const logger = require('../utils/logger').logger('WxController')
const Util = require('../utils/util')
const WxConfig = require('../constant/WxConfig')
const WxService = require('../service/WxService')

class WxController extends BaseController {

  // 公众号服务器认证
    static async service(ctx, next) {
      const params = (ctx.method.toLowerCase() === 'post') ? ctx.req.body : ctx.query
      const signature = params.signature // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
      const timestamp = params.timestamp // 时间戳
      const nonce = params.nonce // 随机数
      const echostr = params.echostr // 随机字符串
      const result = WxService.checkSignature(WxConfig.token, signature, timestamp, nonce);

        if(result) {
            // 来自于微信服务器
            // logger.info('getService ok. echostr:' + echostr);
            ctx.body = echostr; // 验证
        } else {
            // logger.warn('not weixin server!');
            ctx.body = 'not weixin server!';
        }
    }

    // [GET]获取前端config注入所需参数
    static async config(ctx, next) {
      const params = ctx.query
      const signatureUrl = params.url
      const nonceStr = Util.getNonceStr(WxConfig.nonceStrNum) // 生成指定数量的随机字符串
      const timestamp = new Date().getTime().toString().substr(0, WxConfig.timestampNum) // 生成签名的时间戳
      const jsonpCallback = params.callback // jsonp回调函数

      const outputStr = await WxService.config(signatureUrl, nonceStr, timestamp)

      // logger.trace(`outputStr: ${outputStr}`);

      if(jsonpCallback) {
          ctx.body = jsonpCallback + '(' + outputStr + ')';
      } else {
        ctx.body = outputStr;
      }
    }

    /**
     * OAuth2.0网页授权，页端直接访问
     * @param [GET] dest - 回调地址
     * @param [GET] openid - 页端授过权后，手动保存openid到localStorage，下次请求的时候带上就不用再授权了
     * @param [GET] scope - scope设置类型，默认为snsapi_userinfo，即获取用户基本信息，若params.scope=snsapi_base，则只能获取openid，并且进行用户无感知授权跳转
     */
    static async auth(ctx, next) {
      const host = ctx.headers['host']
      const protocol = ctx.protocol || 'http'
      const dest = ctx.query.dest
      const scope = ctx.query.scope ? ctx.query.scope : 'snsapi_userinfo'
      const openId = ctx.query.openid || ctx.cookies.get(WxConfig.cookieOpenId)

      const url = await WxService.auth(host, protocol, dest, scope, openId)

      ctx.redirect(url);
    }

    // 微信网页授权，步骤2（auth步骤后微信自动回调过来的）
    static async auth2(ctx, next) {
      const dest = ctx.query.dest || '' // 回调到前端的地址
      const code = ctx.query.code //若用户禁止授权，则重定向后不会带上code参数，仅会带上state参数
      const state = ctx.query.state

      const url = await WxService.auth2(dest, code, state, ctx)

      ctx.redirect(url);
    }
}

module.exports = WxController;