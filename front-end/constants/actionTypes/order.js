import { getAsyncActionType } from '../../utils/redux';

const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';

export default {
  SET_SELECTED_ORDER,
  ...getAsyncActionType(CANCEL_ORDER),
};
