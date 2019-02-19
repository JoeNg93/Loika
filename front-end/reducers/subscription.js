import actionTypes from '../constants/actionTypes/subscription';

const INITIAL_STATE = {
  allSubscriptions: [],
  // Current subscription that is on view in MySubscriptionScreen
  selectedSubscription: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        allSubscriptions: payload,
        selectedSubscription: payload.length > 0 ? payload[0] : {},
      };
    case actionTypes.SET_SELECTED_SUBSCRIPTION:
      return { ...state, selectedSubscription: payload };
    default:
      return state;
  }
};
