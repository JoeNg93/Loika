const { prisma } = require("../generated/prisma-client");

const Query = {
  // This is for getting the current user logged in
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    console.log(ctx.request.userId);
    if (!ctx.request.userId) {
      return null;
    }
    return prisma.user(
      {
        id: ctx.request.userId
      },
      info
    );
  }
};

module.exports = Query;
