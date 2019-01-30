const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../generated/prisma-client");
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { userTokenDuration } = require('../configuration');

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
      expiresIn: userTokenDuration
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
      expiresIn: userTokenDuration
    });
    // 4. return token only
    return token;
  },

  /**
   * Make a request to reset user's password
   * @param {*} parent 
   * @param {*} args 
   * @param {*} ctx 
   * @param {*} info 
   */
  async requestReset(parent, args, ctx, info) {
    // 1. check if there is a user with that email
    const user = await prisma.user({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    // 3. Email them that reset token
    // or send notification
    // need to dicuss with team
    // TODO:

    // 4. Return the message
    return true;
  },

  /**
   * Now actually reset the password
   * @param {*} parent 
   * @param {*} args 
   * @param {*} ctx 
   * @param {*} info 
   */
  async resetPassword(parent, args, ctx, info) {
    // 1. check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Your Passwords don't match!");
    }
    // 2. check if its a legit reset token
    // 3. Check if its expired
    const [user] = await prisma.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired!');
    }
    // 4. Hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save the new password to the user and remove old resetToken fields
    const updatedUser = await prisma.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    // 6. Generate JWT
    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: userTokenDuration
    });
    // 8. return the new user
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
          id: args.id,
        },
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
  }
};

module.exports = Mutations;
