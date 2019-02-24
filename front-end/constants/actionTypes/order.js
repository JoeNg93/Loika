import { getAsyncActionType } from '../../utils/redux';

const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';
const CHANGE_ORDER_DELIVERY_SCHEDULE = 'CHANGE_ORDER_DELIVERY_SCHEDULE';

export default {
  SET_SELECTED_ORDER,
  ...getAsyncActionType(CANCEL_ORDER),
  ...getAsyncActionType(CHANGE_ORDER_DELIVERY_SCHEDULE),
};
