const { prisma } = require("../generated/prisma-client");

const Query = {
  // This is for getting the current user logged in
  async me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    let user = await prisma.user({
      id: ctx.request.userId
    });

    user.cart = await prisma.user({id: ctx.request.userId}).cart();
    user.orders = await prisma.user({id: ctx.request.userId}).orders();

    return user;
  },

  // Get one address
  readAddress(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return prisma.address({
      id: args.id
    });
  },

  /**
   * Subscriptions
   */

  /**
   * Read a subscriptions
   * Basically, everyone (guests or members) can see it.
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  readOneSubscription(parent, args, ctx, info) {
    return prisma.subscription({
      id: args.id
    });
  },

  /**
   * For now, return all the subscriptions we have
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  readAllSubscriptions(parent, args, ctx, info) {
    return prisma.subscriptions({});
  }
};

module.exports = Query;
