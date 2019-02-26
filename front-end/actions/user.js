import { AsyncStorage } from 'react-native';
import axios from 'axios';

import actionTypes from '../constants/actionTypes/user';
import { baseURL } from '../utils/envConfig';

export const addShippingAddress = addressInfo => async dispatch => {
  dispatch({ type: actionTypes.ADD_SHIPPING_ADDRESS_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await axios.post(
      baseURL,
      {
        query: `
        mutation {
          createAddress(
            name: "${addressInfo.name}",
            address: "${addressInfo.address}",
            country: "Finland",
            city: "${addressInfo.city}",
            phoneNumber: "${addressInfo.phoneNumber}",
            postcode: ${addressInfo.postcode},
            isBillingAddress: false) {
            id,
            name,
            address,
            country,
            city,
            phoneNumber,
            postcode
          }
        }
      `,
      },
      { headers: { Authorization: accessToken } }
    );

    const { createAddress } = res.data.data;
    const addressId = createAddress.id;
    dispatch({
      type: actionTypes.ADD_SHIPPING_ADDRESS_SUCCESS,
      payload: createAddress,
    });

    return addressId;
  } catch (err) {
    console.log('ERROR - addShippingAddress', err.response.data);
    dispatch({ type: actionTypes.ADD_SHIPPING_ADDRESS_FAIL });
  }
};

export const createOrder = ({
  billingAddressId,
  shippingAddressId,
  deliveryDayOfWeek,
  deliveryTime,
  subscriptionIds,
  total,
  paymentInfo,
  cardNumber,
  expirationDate,
  cvv,
}) => async dispatch => {
  dispatch({ type: actionTypes.ADD_ORDER_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');
  let subscriptionIdsString = '';
  subscriptionIdsString += '[';
  for (let subscriptionId of subscriptionIds) {
    subscriptionIdsString += `"${subscriptionId}",`;
  }
  subscriptionIdsString =
    subscriptionIdsString.substr(0, subscriptionIdsString.length - 1) + ']';

  console.log(subscriptionIdsString);

  let query;
  if (paymentInfo) {
    const { cardNumber, expirationDate, cvv } = paymentInfo;
    query = `
      mutation {
        createOrder(
          billingAddressId: "${billingAddressId}",
          shippingAddressId: "${shippingAddressId}",
          deliveryDayOfWeek: "${deliveryDayOfWeek}",
          deliveryTime: "${deliveryTime}",
          subscriptionIds: ${subscriptionIdsString},
          total: ${total},
          cardNumber: "${cardNumber}",
          expirationDate: "${expirationDate}",
          cvv: "${cvv}"
        ) {
          id,
          deliveryDayOfWeek,
          deliveryTime,
          paymentDate,
          cancelDate,
          shippingAddress {
            id,
            name,
            phoneNumber,
            city,
            country,
            postcode,
            address
          },
          total,
          items {
            id,
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
      }
    `;
  } else {
    query = `
      mutation {
        createOrder(
          billingAddressId: "${billingAddressId}",
          shippingAddressId: "${shippingAddressId}",
          deliveryDayOfWeek: "${deliveryDayOfWeek}",
          deliveryTime: "${deliveryTime}",
          subscriptionIds: ${subscriptionIdsString},
          total: ${total}
        ) {
          id,
          deliveryDayOfWeek,
          deliveryTime,
          paymentDate,
          cancelDate,
          shippingAddress {
            id,
            name,
            phoneNumber,
            city,
            country,
            postcode,
            address
          },
          total,
          items {
            id,
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
      }
    `;
  }

  try {
    const res = await axios.post(
      baseURL,
      {
        query,
      },
      { headers: { Authorization: accessToken } }
    );

    const { createOrder } = res.data.data;
    dispatch({
      type: actionTypes.ADD_ORDER_SUCCESS,
      payload: createOrder,
    });
  } catch (err) {
    console.log('ERROR createOrder: ', err.response.data);
    dispatch({ type: actionTypes.ADD_ORDER_FAIL });
  }
};

export const updateShippingAddress = (id, addressInfo) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_SHIPPING_ADDRESS_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await axios.post(
      baseURL,
      {
        query: `
        mutation {
          updateAddress(
            id: "${id}",
            name: "${addressInfo.name}",
            address: "${addressInfo.address}",
            city: "${addressInfo.city}",
            phoneNumber: "${addressInfo.phoneNumber}",
            postcode: ${addressInfo.postcode}) {
            id,
            name,
            address,
            country,
            city,
            phoneNumber,
            postcode
          }
        }
      `,
      },
      { headers: { Authorization: accessToken } }
    );

    dispatch({
      type: actionTypes.UPDATE_SHIPPING_ADDRESS_SUCCESS,
      payload: res.data.data.updateAddress,
    });
  } catch (err) {
    console.log('ERROR - updateShippingAddress', err.response.data);
    dispatch({ type: actionTypes.UPDATE_SHIPPING_ADDRESS_FAIL });
  }
};
