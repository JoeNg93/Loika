import { getAsyncActionType } from '../../utils/redux';

const ADD_SHIPPING_ADDRESS = 'ADD_SHIPPING_ADDRESS';
const ADD_ORDER = 'ADD_ORDER';

export default {
  ...getAsyncActionType(ADD_SHIPPING_ADDRESS),
  ...getAsyncActionType(ADD_ORDER),
};
