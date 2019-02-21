import { getAsyncActionType } from '../../utils/redux';

const SIGN_IN = 'SIGN_IN';
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const FETCH_TOKEN_FROM_STORAGE = 'FETCH_TOKEN_FROM_STORAGE';

export default {
  ...getAsyncActionType(SIGN_IN),
  ...getAsyncActionType(GET_USER_PROFILE),
  FETCH_TOKEN_FROM_STORAGE,
};
