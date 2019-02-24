import actionTypes from '../constants/actionTypes/auth';
import orderActionTypes from '../constants/actionTypes/order';
import userActionTypes from '../constants/actionTypes/user';

const INITIAL_STATE = {
  accessToken: '',
  user: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.FETCH_TOKEN_FROM_STORAGE:
      return { ...state, accessToken: payload };
    case actionTypes.GET_USER_PROFILE_SUCCESS:
      return { ...state, user: payload };
    case userActionTypes.ADD_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          shippingAddress: [...state.user.shippingAddress, payload],
        },
      };
    case userActionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          orders: [...state.user.orders, payload],
        },
      };
    case userActionTypes.UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          shippingAddress: state.user.shippingAddress.map(addr =>
            addr.id === payload.id ? payload : addr
          ),
        },
      };
    case orderActionTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          orders: state.user.orders.map(o => {
            if (o.id === payload.id) {
              o.cancelDate = payload.cancelDate;
            }
            return o;
          }),
        },
      };
    case orderActionTypes.CHANGE_ORDER_DELIVERY_SCHEDULE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          orders: state.user.orders.map(o => {
            if (o.id === payload.id) {
              o.deliveryTime = payload.deliveryTime;
              o.deliveryDayOfWeek = payload.deliveryDayOfWeek;
            }
            return o;
          }),
        },
      };
    default:
      return state;
  }
};
