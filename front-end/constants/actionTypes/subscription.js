import { getAsyncActionType } from '../../utils/redux';

const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';
const SET_SELECTED_SUBSCRIPTION = 'SET_SELECTED_SUBSCRIPTION';

export default {
  ...getAsyncActionType(GET_SUBSCRIPTIONS),
  SET_SELECTED_SUBSCRIPTION,
};
