import axios from 'axios';

import actionTypes from '../constants/actionTypes/subscription';
import { baseURL } from '../utils/envConfig';

export const getAllSubscriptions = () => async dispatch => {
  dispatch({ type: actionTypes.GET_SUBSCRIPTIONS_PENDING });

  try {
    const res = await axios.post(baseURL, {
      query: `
        query {
          readAllSubscriptions {
            title,
            shortDescription,
            longDescription,
            mealPrice,
            totalPrice,
            largeImage,
            thumbnailImage,
            size,
            tag
          }
        }
      `,
    });

    const allSubscriptions = res.data.data.readAllSubscriptions;
    dispatch({
      type: actionTypes.GET_SUBSCRIPTIONS_SUCCESS,
      payload: allSubscriptions,
    });

    return allSubscriptions;
  } catch (err) {
    console.log('ERROR getAllSubscriptions: ', err.response.data);
    dispatch({ type: actionTypes.GET_SUBSCRIPTIONS_FAIL });
    return null;
  }
};

export const setSelectedSubscription = subscription => {
  return { type: actionTypes.SET_SELECTED_SUBSCRIPTION, payload: subscription };
};
