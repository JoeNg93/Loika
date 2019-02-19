import actionTypes from '../constants/actionTypes/subscription';

const INITIAL_STATE = {
  allSubscriptions: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return { ...state, allSubscriptions: payload };
    default:
      return state;
  }
};
