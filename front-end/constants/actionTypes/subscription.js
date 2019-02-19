import { getAsyncActionType } from '../../utils/redux';

const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';

export default { ...getAsyncActionType(GET_SUBSCRIPTIONS) };
