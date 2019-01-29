const { prisma } = require("../generated/prisma-client");

const Query = {
  // This is for getting the current user logged in
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return prisma.user(
      {
        id: ctx.request.userId
      },
      info
    );
  },

  // Get one address
  readAddress(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return prisma.address(
      {
        id: args.id
      },
      info
    );
  }
};

module.exports = Query;
