'use strict';

const Router = require('koa-router')
const ApiController = require('../app/controllers/ApiController')
const router = new Router({
        prefix: '/api'
      })

router.get('/test', ApiController.test);

module.exports = router;