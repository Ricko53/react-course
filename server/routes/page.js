'use strict';

const Router = require('koa-router')
const PageController = require('../app/controllers/PageController')
const router = new Router()

// 公众号服务器认证
router.get('/user', PageController.userPage);
router.get('/user/courseList', PageController.userPage);
router.get('/user/destine', PageController.userPage);
router.get('/coach', PageController.userPage);

// Dashboard
router.get('/', PageController.loginPage);
router.get('/login', PageController.loginPage);
router.get('/dashboard', PageController.dashboard);
router.get('/dashboard/:rule', PageController.dashboard);


module.exports = router;