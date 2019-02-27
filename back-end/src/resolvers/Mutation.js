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

    console.log(args);

    const {
      billingAddressId,
      shippingAddressId,
      deliveryDayOfWeek,
      deliveryTime,
      subscriptionIds,
      total,
      cardNumber,
      expirationDate,
      cvv,
    } = args;

    const user = await prisma.user({ id: userId });
    if (!user.paymentCustomerId) {
      // Create user payment info on Stripe
      const [expMonth, expYear] = expirationDate.split('/');
      const token = await stripe.tokens.create({
        card: {
          // Hard-coded test card number
          number: '4242424242424242',
          exp_month: Number(expMonth),
          exp_year: Number(expYear),
          cvc: cvv,
        },
      });

      console.log('Stripe token: ', token.id);

      const customer = await stripe.customers.create({
        email: user.email,
        source: token.id, // obtained with Stripe.js
      });

      console.log('Customer id: ', customer.id);
      await prisma.updateUser({
        where: { id: userId },
        data: { paymentCustomerId: customer.id },
      });
      user.paymentCustomerId = customer.id;
    }

    let orderItems = [];
    for (let subscriptionsId of subscriptionIds) {
      // Create order item
      const subscription = await prisma.subscription({ id: subscriptionsId });
      const orderItem = { ...subscription };
      delete orderItem.id;
      delete orderItem.createdAt;
      delete orderItem.updatedAt;
      orderItems.push(orderItem);
    }

    const boxNameToPlanIdMapper = {
      'Veggies Box': 'veggies_box_monthly',
      'Milk Box': 'milk_box_monthly',
      'Meaty Box': 'meaty_box_monthly',
    };
    const planIds = orderItems.map(o => ({
      plan: boxNameToPlanIdMapper[o.title],
    }));
    const subscription = await stripe.subscriptions.create({
      customer: user.paymentCustomerId,
      items: planIds,
    });

    const order = await prisma.createOrder({
      user: { connect: { id: userId } },
      items: { create: orderItems },
      billingAddress: {
        connect: {
          id: billingAddressId,
        },
      },
      shippingAddress: {
        connect: {
          id: shippingAddressId,
        },
      },
      deliveryTime: deliveryTime,
      deliveryDayOfWeek: deliveryDayOfWeek,
      paymentDate: new Date().toISOString(),
      total: total,
      paymentSubscriptionId: subscription.id,
    });

    order.shippingAddress = await prisma
      .order({ id: order.id })
      .shippingAddress();
    order.items = await prisma.order({ id: order.id }).items();

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
    const orders = await prisma
      .user({ id: userId })
      .orders({ where: { id: args.orderId } });
    const order = orders.length > 0 ? orders[0] : null;
    if (!order) {
      throw new Error('Could not find this order.');
    }

    // Cancel order on Stripe
    await stripe.subscriptions.del(order.paymentSubscriptionId);

    // 3. Set the cancel date to today.
    const updatedOrder = await prisma.updateOrder({
      data: {
        cancelDate: new Date().toISOString(),
      },
      where: {
        id: order.id,
      },
    });

    // 4. Return the order
    return updatedOrder;
  },

  async changeOrderDeliverySchedule(parent, args, ctx) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(
        'You must be signed in to change order delivery schedule.'
      );
    }

    // 2. Check if the selected order is available
    const orders = await prisma
      .user({ id: userId })
      .orders({ where: { id: args.orderId } });
    const order = orders.length > 0 ? orders[0] : null;
    if (!order) {
      throw new Error('Could not find this order.');
    }

    // 3. Update order delivery schedule
    const updatedData = { ...args };
    delete updatedData.orderId;
    const updatedOrder = await prisma.updateOrder({
      data: updatedData,
      where: {
        id: order.id,
      },
    });

    // 4. Return the order
    return updatedOrder;
  },

  async changeOrderShippingAddress(parent, args, ctx) {
    // 1. Query the current user and make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error(
        'You must be signed in to change order shipping address.'
      );
    }

    // 2. Check if the selected order is available
    const orders = await prisma
      .user({ id: userId })
      .orders({ where: { id: args.orderId } });
    const order = orders.length > 0 ? orders[0] : null;
    if (!order) {
      throw new Error('Could not find this order.');
    }

    // 3. Update order delivery schedule
    const updatedOrder = await prisma.updateOrder({
      data: {
        shippingAddress: {
          connect: {
            id: args.addressId,
          },
        },
      },
      where: {
        id: order.id,
      },
    });

    updatedOrder.shippingAddress = await prisma
      .order({ id: order.id })
      .shippingAddress();
    updatedOrder.billingAddress = await prisma
      .order({ id: order.id })
      .billingAddress();
    updatedOrder.items = await prisma.order({ id: order.id }).items();

    // 4. Return the order
    return updatedOrder;
  },
};

module.exports = Mutations;
