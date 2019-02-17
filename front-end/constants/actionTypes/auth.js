import { getAsyncActionType } from '../../utils/redux';

const SIGN_IN = 'SIGN_IN';
const FETCH_TOKEN_FROM_STORAGE = 'FETCH_TOKEN_FROM_STORAGE';

export default {
  ...getAsyncActionType(SIGN_IN),
  FETCH_TOKEN_FROM_STORAGE,
};
