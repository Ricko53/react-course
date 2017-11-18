'use strict';

class PageController {
  static async userPage(ctx, next) {

    await ctx.render('userPage', {
      modules: [ctx.assets.vendor, ctx.assets.userPage],
    })
  }
}

module.exports = PageController;