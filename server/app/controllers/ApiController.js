'use strict';

const BaseController = require('./BaseController')
// const logger = require('../utils/logger').logger('ApiController')
// const Redis = require('../utils/redis')

class ApiController extends BaseController {

  // 测试
  static async test(ctx, next) {
    const order = ctx.query.order;
    // logger.info('test order: ' + order);

    switch(order) {
      case 'redis_clear': 
        // var keys = await Redis.keys('wechat_jssdk_server_*');
        // logger.trace(keys);
        // for(let i = 0; i < keys.length; i++) {
        //   await Redis.del(keys[i]);
        // }
        break;
      case 'redis_keys':
        // var keys = await Redis.keys('*');
        // this.body = keys;
        break;
      default: 
        ctx.body = 'success'
        break;
    }
  }
}

module.exports = ApiController;