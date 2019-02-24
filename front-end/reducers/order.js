import actionTypes from '../constants/actionTypes/order';

const INITIAL_STATE = {
  selectedOrder: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: payload,
      };
    case actionTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        selectedOrder: {
          ...state.selectedOrder,
          cancelDate: payload.cancelDate,
        },
      };
    default:
      return state;
  }
};
