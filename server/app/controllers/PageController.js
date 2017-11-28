'use strict';

class PageController {
  static async userPage(ctx, next) {

    await ctx.render('userPage', {
      modules: [ctx.assets.vendor, ctx.assets.userPage],
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