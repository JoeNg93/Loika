import actionTypes from '../constants/actionTypes/checkout';

export const setSelectedSubscription = subscription => {
  return { type: actionTypes.SET_SELECTED_SUBSCRIPTION, payload: subscription };
};

export const setSelectedBillingAddress = address => {
  return { type: actionTypes.SET_SELECTED_BILLING_ADDRESS, payload: address };
};

export const setSelectedShippingAddress = address => {
  return { type: actionTypes.SET_SELECTED_SHIPPING_ADDRESS, payload: address };
};

export const addSubscriptionToCart = subscription => {
  return {
    type: actionTypes.ADD_SUBSCRIPTION_TO_CART,
    payload: subscription,
  };
};

export const removeSubscriptionFromCart = subscriptionId => {
  return {
    type: actionTypes.REMOVE_SUBSCRIPTION_FROM_CART,
    payload: subscriptionId,
  };
};

export const cleanCart = () => {
  return { type: actionTypes.CLEAN_CART };
};

export const setDeliveryDayOfWeek = dayOfWeek => {
  return { type: actionTypes.SET_DELIVERY_DAY_OF_WEEK, payload: dayOfWeek };
};

export const setDeliveryTime = time => {
  return { type: actionTypes.SET_DELIVERY_TIME, payload: time };
};
