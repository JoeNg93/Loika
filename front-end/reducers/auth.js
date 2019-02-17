import actionTypes from '../constants/actionTypes/auth';

const INITIAL_STATE = {
  accessToken: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.FETCH_TOKEN_FROM_STORAGE:
      return { ...state, accessToken: payload };
    default:
      return state;
  }
};
