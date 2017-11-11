'use strict';

const Router = require('koa-router')
const WxController = require('../app/controllers/WxController')
const router = new Router({
        prefix: '/wx'
      })

// 公众号服务器认证
router.get('/service', WxController.service);
router.post('/service', WxController.service);

router.get('/config', WxController.config);

router.get('/auth', WxController.auth);

router.get('/auth2', WxController.auth2);

module.exports = router;