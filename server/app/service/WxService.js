'use strict';
const Querystring = require('querystring')
const jwt = require('jsonwebtoken')

const WxApi = require('../common/WxApi')
// const Redis = require('../utils/redis')
const logger = require('../utils/logger').logger('WxService')
const ResponseJson = require('../constant/ResponseJson')
const WxConfig = require('../constant/WxConfig')

class WxService {

  /**
   * 校验微信服务器签名
   * @param signature - 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
   * @param token - 授权TOKEN，在公众号管理页配置的
   * @param timestamp - 时间戳
   * @param nonce - 随机数
   *
   * @return 
   */
  static checkSignature(token, signature, timestamp, nonce) {
    return WxApi.checkSignature(token, signature, timestamp, nonce);
  }

  // [GET]获取前端config注入所需参数
  static config(signatureUrl, nonceStr, timestamp) {
    return new Promise((resolve, reject) => {
      if(!signatureUrl) {
        // logger.warn('Parameter Error');
        return resolve(ResponseJson.formatJson(ResponseJson.code.parameterError));
      }

        //get token from redis
        // Redis.get(WxConfig.redisKey.token)
        //   .then(token => {
        //         // get ticket from redis
        //         Redis.get(WxConfig.redisKey.ticket)
        //           .then(ticket => {
        //               let sign = WxApi.generateSignature(ticket, signatureUrl, nonceStr, timestamp);
        //               output(sign);
        //           })
        //           .catch(error => {
        //             // logger.trace('redis get nothing. key: ' + WxConfig.redisKey.ticket);
        //             output(null);
        //           });
        //   })
        //   .catch(error => {
        //     // logger.trace('redis get nothing. key: ' + WxConfig.redisKey.token);
        //       output(null);
        //   });

        function output(signature){
            let outputStr = '';
            if(signature) {
                outputStr = ResponseJson.formatJson(ResponseJson.code.ok, {
                    appId: WxConfig.appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature
                });
            } else {
                outputStr = ResponseJson.formatJson(ResponseJson.code.internalError, '');
            }

            resolve(outputStr);
        }
    });
  }

  static auth(host, protocol, dest, scope, openId) {
    return new Promise((resolve, reject) => {
      // 请求微信获取code，code用于换取access_token
      const codeLink = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + WxConfig.appId +
          '&redirect_uri=' + encodeURIComponent(protocol + '://' + host + '/wx/auth2?dest=' + encodeURIComponent(dest)) +
          '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect';

      if(openId) {

          console.log('have openId' + openId)
          // 已有openId，直接查找返回
          // logger.debug('[auth] has openId:' + openId);

          // Redis.get(WxConfig.redisKey.authAccessToken + openId)
          //   .then(strData => {
          //     // logger.trace('[auth] Redis.getAuthAccessToken ok. openId: ' + openId);
          //     // logger.trace(strData);

          //       (!strData) && (strData = "{}");
          //       let data = JSON.parse(strData);

          //       if(data.access_token) {
          //           // 检测access_token有效性
          //           WxApi.checkAuthAccessToken(data.access_token, data.openid)
          //             .then(ret => {
          //                   WxApi.getUserInfo(data.access_token, data.openid)
          //                     .then(info => {
          //                       // logger.trace('[auth] getUserInfo ok.');
          //                       // logger.trace(info);

          //                         let paramsStr = Querystring.stringify({userinfo: JSON.stringify(info)}),
          //                             op = dest.indexOf('?') >= 0 ? '&' : '?';

          //                         resolve(dest + op + paramsStr);
          //                     });
          //             })
          //             .catch(error => {
          //                 // logger.warn('[auth] checkAuthAccessToken failed.');
          //               resolve(codeLink);
          //             });
          //       } else {
          //           // logger.warn('[auth] access_token empty. openId: ' + openId);
          //           resolve(codeLink);
          //       }
          //   })
          //   .catch(error => {
          //     // logger.warn('[auth] Redis.getAuthAccessToken failed. openId: ' + openId);
          //     // logger.warn(error);

          //     resolve(codeLink);
          //   });

      } else {
        resolve(codeLink);
        // logger.warn('[auth] openId empty.');
      }
    });
  }

  static auth2(dest, code, state, ctx) {
    // logger.trace('[auth2] start. dest: ' + dest + ', code: ' + code + ', state: ' + state);

    return new Promise((resolve, reject) => {
      console.log('code' + code)

      WxApi.getAuthAccessToken(WxConfig.appId, WxConfig.secret, code)

        .then(data => {
          // logger.trace('[auth2] getAuthAccessToken ok.');
          // logger.trace(data);

          console.log('access_token' + data)

          // 最后一步，获取用户信息
          WxApi.getUserInfo(data.access_token, data.openid)
            .then(info => {
              // logger.trace('[auth2] getUserInfo ok.');
              // logger.trace(info);

              console.log(info)

              checkOpenIdAndSign(info, ctx)

              let paramsStr = Querystring.stringify({userinfo: JSON.stringify(info)}),
                  op = dest.indexOf('?') >= 0 ? '&' : '?';

              // 利用cookie保存用户openId
              // try {
              //   ctx.cookies.set(WxConfig.cookieOpenId, info.openid);
              //   logger.trace('[auth2] set cookie ok. ' + WxConfig.cookieOpenId + '=' + info.openid);
              // } catch(e) {
              //   logger.error('[auth2] set cookie failed. e:' + e);
              // }

              resolve(dest + op + paramsStr);
            })
            .catch(error => {
              logger.warn('[auth2] getUserInfo failed.');
              logger.warn(error);

              console.log('access_token error ' + error)


              let paramsStr = Querystring.stringify({userinfo:'{"error": "get wx getUserInfo fail", "errcode": ' + error.errcode + '}'}),
                  op = dest.indexOf('?') >= 0 ? '&' : '?';

              resolve(dest + op + paramsStr);
            });

          // 缓存refresh_token等结果
          // Redis.tryLock('save_' + WxConfig.redisKey.authAccessToken + data.openid, 3000)
          // Redis.tryLock(WxConfig.redisKey.authAccessToken + data.openid, 3000)
          //   .then(lock => {
          //       if(lock) {
          //           this.saveAuthAccessToken(data, WxConfig.refreshTokenExpire)
          //             .then(ret => {
          //               Redis.unlock(lock);
          //             })
          //             .catch(error => {
          //               Redis.unlock(lock);
          //             });
          //       }
          //   });

        })
        .catch(error => {
          logger.warn('[auth2] getAuthAccessToken failed.');
          logger.warn(error);

          console.log('error ' + error)

          //构造回调url
          let paramsStr = Querystring.stringify({userinfo:'{"error": "get wx access_token fail", "errcode": ' + error.errmsg + '}'}),
              op = dest.indexOf('?') >= 0 ? '&' : '?';

          resolve(dest + op + paramsStr);
        });
    });
  }

  static checkOpenIdAndSign (uinfo, ctx) {
    let info = {
      userId: '10001',
    }

    let token = jwt.sign(info, global.config.secret, {
      expiresIn: '10h'
    })

    try {
      ctx.cookies.set('token', token)
    } catch(e) {
      logger.error('[auth2] set cookie failed. e:' + e);
    }
  }

}

module.exports = WxService;

