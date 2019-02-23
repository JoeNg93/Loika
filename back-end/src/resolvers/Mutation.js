const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../generated/prisma-client');
const stripe = require('../stripe');

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
      permissions: { set: ['USER'] },
    });
    // create JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
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
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
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
      throw new Error('You must be logged in to do that!');
    }

    // 2. Create a new address
    const address = await prisma.createAddress({
      ...args,
    });

    // 3. Updated user data address
    if (args.isBillingAddress) {
      await prisma.updateUser({
        where: {
          id: ctx.request.userId,
        },
        data: {
          billingAddress: {
            connect: {
              id: address.id,
            },
          },
        },
      });
    } else {
      await prisma.updateUser({
        where: {
          id: ctx.request.userId,
        },
        data: {
          shippingAddress: {
            connect: {
              id: address.id,
            },
          },
        },
      });
    }

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
        id: args.id,
      },
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
      throw new Error('You must be logged in to do that!');
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId,
    });

    const hasPermissions = user.permissions.some(permission =>
      ['ADMIN'].includes(permission)
    );
    if (!hasPermissions) {
      throw new Error("You don't have permission to do that!");
    }
    // 3. Create a new subscription
    const subscription = await prisma.createSubscription({
      ...args,
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
      throw new Error('You must be logged in to do that!');
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId,
    });
    const hasPermissions = user.permissions.some(permission =>
      ['ADMIN'].includes(permission)
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
        id: args.id,
      },
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
      throw new Error('You must be logged in to do that!');
    }

    // 2. Check if user is ADMIN
    const user = await prisma.user({
      id: ctx.request.userId,
    });
    const hasPermissions = user.permissions.some(permission =>
      ['ADMIN'].includes(permission)
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
      throw new Error('You must be logged in to do that!');
    }
    // 2. Query the users current cart

    const [existingCartItem] = await prisma.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    });

    // 3. Check if that item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      // It means the item is already in cart
      return prisma.updateCartItem({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
    }

    // 4. If its not, create a new CartItem for that user!
    return prisma.createCartItem({
      user: {
        connect: { id: userId },
      },
      item: {
        connect: { id: args.id },
      },
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
      id: args.id,
    });

    const user = await prisma.cartItem({ id: cartItem.id }).user();
    // 2. Make sure we found an item
    if (!cartItem) throw new Error('No cart item found!');
    // 3. Make sure they own that cart item
    if (user.id !== ctx.request.userId) {
      throw new Error('That cart item is not yours.');
    }
    // 4. Delete that cart item
    return prisma.deleteCartItem({
      id: args.id,
    });
  },

  /**
   * Order thingy
   */

  /**
   * Create a new order
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   */
  async createOrder(parent, args, ctx) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in to complete this order.');
    }

    const userFragment = `
      fragment user on User {
        id
        name
        email
        billingAddress {
          address
          city
          postcode
          country
        }
        shippingAddress {
          city
          postcode
          country
        }
        cart {
          id
        }
      }
    `;

    const user = await prisma.user({ id: userId }).$fragment(userFragment);

    // 2. recalculate the total for the price
    const userWithCartItems = `
      fragment userWithCartItems on CartItem {
        id
        quantity
        item {
          id
          title
          shortDescription
          longDescription
          totalPrice
          mealPrice
          thumbnailImage
          largeImage
        }
      }
    `;

    let cartItems = await prisma
      .user({ id: userId })
      .cart()
      .$fragment(userWithCartItems);
    const amount = cartItems.reduce(
      (tally, cartItem) => tally + cartItem.item.totalPrice * cartItem.quantity,
      0
    );

    // 3. Create the stripe charge (turn token into $$$)
    const charge = await stripe.charges.create({
      amount,
      currency: 'EUR',
      source: args.token,
    });

    // 4. Convert the CartItems to OrderItems
    const orderItems = cartItems.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });

    // 5. create the Order
    const order = await prisma.createOrder({
      user: { connect: { id: userId } },
      items: { create: orderItems },
      billingAddress: {
        create: {
          isBillingAddress: true,
          address: user.billingAddress.address,
          city: user.billingAddress.city,
          postcode: user.billingAddress.postcode,
          country: user.billingAddress.country,
        },
      },
      shippingAddress: {
        create: {
          isBillingAddress: false,
          address: user.shippingAddress.address,
          city: user.shippingAddress.city,
          postcode: user.shippingAddress.postcode,
          country: user.shippingAddress.country,
        },
      },
      deliveryTime: args.deliveryTime,
      deliveryDayOfWeek: args.deliveryDayOfWeek,
      paymentDate: new Date().toISOString(),
      total: amount,
      charge,
    });

    // 6. Clean up - clear the users cart, delete cartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await prisma.deleteManyCartItems({
      id_in: cartItemIds,
    });

    // 7. Return the Order to the client
    return order;
  },

  /**
   * Cancel order
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   */
  async cancelOrder(parent, args, ctx) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in to cancel orders.');
    }

    // 2. Check if the selected subscription is available
    const oldOrder = await prisma
      .user({ id: userId })
      .orders({ id: args.orderId });
    if (!oldOrder) {
      throw new Error('Could not find this order.');
    }

    // 3. Set the cancel date to today.
    const order = await prisma.updateOrder({
      data: {
        cancelDate: new Date().toISOString(),
      },
      where: {
        id: oldOrder.id,
      },
    });

    // 4. Return the order
    return order;
  },
};

module.exports = Mutations;
