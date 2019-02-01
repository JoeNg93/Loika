const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../generated/prisma-client");

const Mutations = {
  /////////////////////////////////////////////////////////////////
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
  async signup(parent, args, ctx) {
    // lower case
    const email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create user in db
    const user = await prisma.createUser({
      email,
      password,
      name: args.name,
      permissions: { set: ["USER"] }
    });
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
  async signin(parent, { email, password }, ctx) {
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

  /////////////////////////////////////////////////////////////////
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
  async createAddress(parent, args, ctx) {
    // 1. Check if user logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    // 2. Create a new address
    const address = await prisma.createAddress({
      ...args
    });

    return address;
  },

  /**
   * Update an address
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  updateAddress(parent, args, ctx) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return prisma.updateAddress({
      data: updates,
      where: {
        id: args.id
      }
    });
  },

  /**
   * Delete address
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async deleteAddress(parent, args, ctx) {
    const where = { id: args.id };
    // 1. find the address
    const address = await prisma.address({ where }, `{ id user { id }}`);
    // 2. Check if they own that address
    const ownsAddress = address.user.id === ctx.request.userId;

    if (!ownsAddress) {
      throw new Error("You don't have permission to do that!");
    }

    // 3. Delete it!
    return prisma.deleteItem({ where });
  },

  /////////////////////////////////////////////////////////////////
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
  async createSubscription(parent, args, ctx) {
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
    const subscription = await prisma.createSubscription({
      ...args
    });

    return subscription;
  },

  /**
   * Update one subscription
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async updateSubscription(parent, args, ctx) {
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
    return prisma.updateSubscription({
      data: updates,
      where: {
        id: args.id
      }
    });
  },

  /**
   * Delete One Subscription
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async deleteSubscription(parent, args, ctx) {
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

    // 1. find the subscription
    const subscription = await prisma.subscription({ id: args.id });
    // 2. Check if it does exist
    if (!subscription) {
      throw new Error(`Could not found the subsciption with id ${args.id}.`);
    }

    // 3. Delete it!
    return prisma.deleteSubscription({ id: args.id });
  },

  /////////////////////////////////////////////////////////////////
  /**
   * Cart
   */

  /**
   * Add to cart
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async addToCart(parent, args, ctx) {
    // 1. Check if user logged in
    const userId = ctx.request.userId;
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    // 2. Query the users current cart

    const [existingCartItem] = await prisma.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id }
      }
    });

    // 3. Check if that item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      // It means the item is already in cart
      return prisma.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 }
      });
    }

    // 4. If its not, create a new CartItem for that user!
    return prisma.createCartItem({
      user: {
        connect: { id: userId }
      },
      item: {
        connect: { id: args.id }
      }
    });
  },

  /**
   * Remove item from cart
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   * @param {*} info
   */
  async removeFromCart(parent, args, ctx) {
    // 1. Find the cart item
    const cartItem = await prisma.cartItem({
      id: args.id
    });

    const user = await prisma.cartItem({ id: cartItem.id }).user();
    // 2. Make sure we found an item
    if (!cartItem) throw new Error("No cart item found!");
    // 3. Make sure they own that cart item
    if (user.id !== ctx.request.userId) {
      throw new Error("That cart item is not yours.");
    }
    // 4. Delete that cart item
    return prisma.deleteCartItem({
      id: args.id
    });
  }
};

module.exports = Mutations;
