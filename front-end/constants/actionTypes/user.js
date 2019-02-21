import { getAsyncActionType } from '../../utils/redux';

const ADD_SHIPPING_ADDRESS = 'ADD_SHIPPING_ADDRESS';
const ADD_ORDER = 'ADD_ORDER';
const UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS';

export default {
  ...getAsyncActionType(ADD_SHIPPING_ADDRESS),
  ...getAsyncActionType(ADD_ORDER),
  ...getAsyncActionType(UPDATE_SHIPPING_ADDRESS),
};
