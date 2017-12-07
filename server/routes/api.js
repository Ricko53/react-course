'use strict';

const Router = require('koa-router')
const ApiController = require('../app/controllers/ApiController')
const router = new Router({
        prefix: '/api'
      })

router.get('/test', ApiController.test);

router.get('/v1/*', ApiController.proxy);
router.post('/v1/*', ApiController.proxy);

router.get('/checkInfo', ApiController.hasToken, ApiController.checkInfo);

module.exports = router;