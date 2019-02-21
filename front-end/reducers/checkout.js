import actionTypes from '../constants/actionTypes/checkout';
import subscriptionActionTypes from '../constants/actionTypes/subscription';
import userActionTypes from '../constants/actionTypes/user';

const INITIAL_STATE = {
  selectedSubscription: {},
  shoppingCart: [],
  shippingAddress: {},
  billingAddress: {},
  deliveryDayOfWeek: '',
  deliveryTime: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case subscriptionActionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        selectedSubscription: payload.length > 0 ? payload[0] : {},
      };
    case actionTypes.SET_SELECTED_SUBSCRIPTION:
      return { ...state, selectedSubscription: payload };
    case actionTypes.ADD_SUBSCRIPTION_TO_CART:
      return { ...state, shoppingCart: [...state.shoppingCart, payload] };
    case actionTypes.REMOVE_SUBSCRIPTION_FROM_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          subscription => subscription.id !== payload
        ),
      };
    case actionTypes.CLEAN_CART:
      return {
        ...state,
        shoppingCart: [],
      };
    case actionTypes.SET_SELECTED_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: payload,
      };
    case actionTypes.SET_SELECTED_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case actionTypes.SET_DELIVERY_DAY_OF_WEEK:
      return {
        ...state,
        deliveryDayOfWeek: payload,
      };
    case actionTypes.SET_DELIVERY_TIME:
      return {
        ...state,
        deliveryTime: payload,
      };
    case userActionTypes.UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        shippingAddress:
          state.shippingAddress.id === payload.id
            ? payload
            : state.shippingAddress,
        billingAddress:
          state.billingAddress.id === payload.id
            ? payload
            : state.billingAddress,
      };
    default:
      return state;
  }
};
