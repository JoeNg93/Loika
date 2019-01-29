const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30
    });

    // Return token only
    return token;
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
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    // 4. return token only
    return token;
  },
};

module.exports = Mutations;
