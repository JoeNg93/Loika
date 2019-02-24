import axios from 'axios';
import { AsyncStorage } from 'react-native';

import actionTypes from '../constants/actionTypes/order';
import { baseURL } from '../utils/envConfig';

export const setSelectedOrder = order => {
  return { type: actionTypes.SET_SELECTED_ORDER, payload: order };
};

export const cancelOrder = orderId => async dispatch => {
  dispatch({ type: actionTypes.CANCEL_ORDER_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await axios.post(
      baseURL,
      {
        query: `
        mutation {
          cancelOrder(orderId: "${orderId}") {
            cancelDate
          }
        }
      `,
      },
      { headers: { Authorization: accessToken } }
    );

    const { cancelDate } = res.data.data.cancelOrder;
    dispatch({
      type: actionTypes.CANCEL_ORDER_SUCCESS,
      payload: { id: orderId, cancelDate },
    });
  } catch (err) {
    console.log('ERROR cancelOrder: ', err.response.data);
    dispatch({ type: actionTypes.CANCEL_ORDER_FAIL });
  }
};

export const changeOrderDeliverySchedule = (
  orderId,
  deliveryDayOfWeek,
  deliveryTime
) => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_ORDER_DELIVERY_SCHEDULE_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await axios.post(
      baseURL,
      {
        query: `
        mutation {
          changeOrderDeliverySchedule(
            orderId: "${orderId}",
            deliveryDayOfWeek: "${deliveryDayOfWeek}",
            deliveryTime: "${deliveryTime}"
            ) {
            id
          }
        }
      `,
      },
      { headers: { Authorization: accessToken } }
    );

    dispatch({
      type: actionTypes.CHANGE_ORDER_DELIVERY_SCHEDULE_SUCCESS,
      payload: { id: orderId, deliveryDayOfWeek, deliveryTime },
    });
  } catch (err) {
    console.log('ERROR changeOrderDeliverySchedule: ', err.response.data);
    dispatch({ type: actionTypes.CHANGE_ORDER_DELIVERY_SCHEDULE_FAIL });
  }
};
