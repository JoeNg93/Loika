const bcrypt = require("bcryptjs");
const { prisma } = require("../generated/prisma-client");

const Mutations = {
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

    return user;
  },

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
    // 3. Return the user
    return user;
  }
};

module.exports = Mutations;
