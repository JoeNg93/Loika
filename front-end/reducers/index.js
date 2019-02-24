import { combineReducers } from 'redux';

import authReducer from './auth';
import subscriptionReducer from './subscription';
import checkoutReducer from './checkout';
import orderReducer from './order';

export default combineReducers({
  auth: authReducer,
  subscription: subscriptionReducer,
  checkout: checkoutReducer,
  order: orderReducer,
});
