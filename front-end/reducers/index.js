import { combineReducers } from 'redux';

import authReducer from './auth';
import subscriptionReducer from './subscription';
import checkoutReducer from './checkout';

export default combineReducers({
  auth: authReducer,
  subscription: subscriptionReducer,
  checkout: checkoutReducer,
});
