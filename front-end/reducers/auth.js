import actionTypes from '../constants/actionTypes/auth';

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
    default:
      return state;
  }
};
