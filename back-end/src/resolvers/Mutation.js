const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../generated/prisma-client");

const Mutations = {
  /**
   * This is for user and authorization
   */

  /**
   * Sign up / register mutation
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async signup(parent, args, ctx, info) {
    // lower case
    const email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create user in db
    const user = await prisma.createUser(
      {
        email,
        password,
        name: args.name,
        permissions: { set: ["USER"] }
      },
      info
    );
    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30
    });

    // Return token only
    return token;
  },

  /**
   * Sign in / login mutation
   * @param {*} parent
   * @param {*} param1
   * @param {*} ctx
   * @param {*} info
   */
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    // 4. return token only
    return token;
  },

  /**
   * This is for address
   */

  /**
   * Create a new address for user
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async createAddress(parent, args, ctx, info) {
    // 1. Check if user logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    // 2. Create a new address
    const address = await prisma.createAddress(
      {
        ...args
      },
      info
    );

    return address;
  },

  /**
   * Update an address
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  updateAddress(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return prisma.updateAddress(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  /**
   * Delete address
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async deleteAddress(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the address
    const address = await prisma.address({ where }, `{ id user { id }}`);
    // 2. Check if they own that address
    const ownsAddress = address.user.id === ctx.request.userId;

    if (!ownsAddress) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Delete it!
    return prisma.deleteItem({ where }, info);
  },

  /**
   * For subscriptions
   */

  /**
   * Create a subscription
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async createSubscription(parent, args, ctx, info) {
    // 1. Check if user logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId
    });

    const hasPermissions = user.permissions.some(permission =>
      ["ADMIN"].includes(permission)
    );
    if (!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Create a new subscription
    const subscription = await prisma.createSubscription(
      {
        ...args
      },
      info
    );

    return subscription;
  },

  /**
   * Update one subscription
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async updateSubscription(parent, args, ctx, info) {
    // 1. Check if user logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId
    });
    const hasPermissions = user.permissions.some(permission =>
      ["ADMIN"].includes(permission)
    );

    if (!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Create a new subscription
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return prisma.updateSubscription(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  /**
   * Delete One Subscription
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async deleteSubscription(parent, args, ctx, info) {
    // 1. Check if user logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId
    });
    const hasPermissions = user.permissions.some(permission =>
      ["ADMIN"].includes(permission)
    );

    if (!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }

    const where = { id: args.id };
    // 1. find the subscription
    const subscription = await prisma.subscription({ where }, `{ id }`);
    // 2. Check if it does exist
    if (!subscription) {
      throw new Error(`Could not found the subsciption with id ${ args.id }.`);
    }

    // 3. Delete it!
    return prisma.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
