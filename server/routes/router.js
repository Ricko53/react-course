'use strict';

// const logger = require('../app/utils/logger').logger('router');

module.exports = function (app) {

    // 注册路由
    app.use(require('./api').routes());
    app.use(require('./wx').routes());

    // 错误及404处理
    app.use(async function (ctx, next){
        try {
          await next()
        } catch (error) {
          // logger.error(error.stack);
        }
    })

};