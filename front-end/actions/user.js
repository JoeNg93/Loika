import { AsyncStorage } from 'react-native';
import axios from 'axios';

import actionTypes from '../constants/actionTypes/user';
import { baseURL } from '../utils/envConfig';

export const addShippingAddress = address => async dispatch => {
  dispatch({ type: actionTypes.ADD_SHIPPING_ADDRESS_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log('TCL: accessToken', accessToken);

  try {
    // const res = await axios.post(
    //   baseURL,
    //   {
    //     query: `
    //     query {
    //       me {
    //         id,
    //         billingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         },
    //         email,
    //         name,
    //         orders {
    //           billingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           deliveryDayOfWeek,
    //           deliveryTime,
    //           paymentDate,
    //           shippingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           total
    //         },
    //         shippingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         }
    //       }
    //     }
    //   `,
    //   },
    //   { headers: { Authorization: accessToken } }
    // );

    dispatch({
      type: actionTypes.ADD_SHIPPING_ADDRESS_SUCCESS,
      payload: address,
    });
  } catch (err) {
    console.log('ERROR - addShippingAddress', err.response.data);
    dispatch({ type: actionTypes.ADD_SHIPPING_ADDRESS_FAIL });
  }
};

export const addOrder = order => async dispatch => {
  dispatch({ type: actionTypes.ADD_ORDER_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log('TCL: accessToken', accessToken);

  try {
    // const res = await axios.post(
    //   baseURL,
    //   {
    //     query: `
    //     query {
    //       me {
    //         id,
    //         billingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         },
    //         email,
    //         name,
    //         orders {
    //           billingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           deliveryDayOfWeek,
    //           deliveryTime,
    //           paymentDate,
    //           shippingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           total
    //         },
    //         shippingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         }
    //       }
    //     }
    //   `,
    //   },
    //   { headers: { Authorization: accessToken } }
    // );

    dispatch({
      type: actionTypes.ADD_ORDER_SUCCESS,
      payload: order,
    });
  } catch (err) {
    console.log('ERROR - addOrder', err.response.data);
    dispatch({ type: actionTypes.ADD_ORDER_FAIL });
  }
};

export const updateShippingAddress = (id, addressInfo) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_SHIPPING_ADDRESS_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log('TCL: accessToken', accessToken);

  try {
    // const res = await axios.post(
    //   baseURL,
    //   {
    //     query: `
    //     query {
    //       me {
    //         id,
    //         billingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         },
    //         email,
    //         name,
    //         orders {
    //           billingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           deliveryDayOfWeek,
    //           deliveryTime,
    //           paymentDate,
    //           shippingAddress {
    //             id,
    //             name,
    //             phoneNumber,
    //             city,
    //             country,
    //             postcode,
    //             street1
    //           },
    //           total
    //         },
    //         shippingAddress {
    //           id,
    //           name,
    //           phoneNumber,
    //           city,
    //           country,
    //           postcode,
    //           street1
    //         }
    //       }
    //     }
    //   `,
    //   },
    //   { headers: { Authorization: accessToken } }
    // );

    dispatch({
      type: actionTypes.UPDATE_SHIPPING_ADDRESS_SUCCESS,
      payload: { ...addressInfo, id },
    });
  } catch (err) {
    console.log('ERROR - addOrder', err.response.data);
    dispatch({ type: actionTypes.UPDATE_SHIPPING_ADDRESS_FAIL });
  }
};
