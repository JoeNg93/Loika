export const getAsyncActionType = actionType => {
  const pendingAction = actionType + '_PENDING';
  const successAction = actionType + '_SUCCESS';
  const failAction = actionType + '_FAIL';
  return {
    [pendingAction]: pendingAction,
    [successAction]: successAction,
    [failAction]: failAction,
  };
};
