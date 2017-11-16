'use strict';

const Router = require('koa-router')
const PageController = require('../app/controllers/PageController')
const router = new Router()

// 公众号服务器认证
router.get('/', PageController.userPage);
router.get('/courseList', PageController.userPage);
router.get('/destine', PageController.userPage);


module.exports = router;