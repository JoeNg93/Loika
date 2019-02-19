import { combineReducers } from 'redux';

import authReducer from './auth';
import subscriptionReducer from './subscription';

export default combineReducers({
  auth: authReducer,
  subscription: subscriptionReducer,
});
