'use strict';

const proxyFetch = require('../utils/proxyFetch')
const apiConfig = require('../../conf/apiConfig')

class PageController {
  static async userPage(ctx, next) {

    let uid = 9 //ctx.cookies.get('uid')

    let UserInfo = {}

    if (uid) {
      UserInfo = await proxyFetch(apiConfig.USER_INFO + `?id=${uid}`)
    } else {
      UserInfo.data = {}
    }

    await ctx.render('userPage', {
      modules: [ctx.assets.vendor, ctx.assets.userPage],
      userInfo: JSON.stringify(UserInfo.data)
    })
  }

  static async loginPage(ctx, next) {

    await ctx.render('dashboardPage', {
      modules: [ctx.assets.vendor, ctx.assets.loginPage],
    })
  }

  static async dashboard(ctx, next) {

    await ctx.render('dashboardPage', {
      modules: [ctx.assets.vendor, ctx.assets.adminPage],
    })
  }

}

module.exports = PageController;