import { AsyncStorage } from 'react-native';
import axios from 'axios';

import actionTypes from '../constants/actionTypes/auth';
import { baseURL } from '../utils/envConfig';

export const signIn = (email, password) => async dispatch => {
  dispatch({ type: actionTypes.SIGN_IN_PENDING });

  try {
    const res = await axios.post(baseURL, {
      query: `
        mutation {
          signin(email: "${email}", password: "${password}")
        }
      `,
    });

    const accessToken = res.data.data.signin;
    await AsyncStorage.setItem('accessToken', accessToken);
    dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: accessToken });

    return accessToken;
  } catch (err) {
    console.log('ERROR signIn: ', err.response.data);
    dispatch({ type: actionTypes.SIGN_IN_FAIL });
    return null;
  }
};

export const fetchTokenFromStorage = () => async dispatch => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  dispatch({
    type: actionTypes.FETCH_TOKEN_FROM_STORAGE,
    payload: accessToken,
  });
  return accessToken;
};

export const getUserProfile = () => async dispatch => {
  dispatch({ type: actionTypes.GET_USER_PROFILE_PENDING });
  const accessToken = await AsyncStorage.getItem('accessToken');
  console.log('TCL: accessToken', accessToken);

  try {
    const res = await axios.post(
      baseURL,
      {
        query: `
        query {
          me {
            id,
            billingAddress {
              id,
              name,
              phoneNumber,
              city,
              country,
              postcode,
              address
            },
            email,
            name,
            orders {
              billingAddress {
                id,
                name,
                phoneNumber,
                city,
                country,
                postcode,
                street1
              },
              deliveryDayOfWeek,
              deliveryTime,
              paymentDate,
              shippingAddress {
                id,
                name,
                phoneNumber,
                city,
                country,
                postcode,
                address
              },
              total
            },
            shippingAddress {
              id,
              name,
              phoneNumber,
              city,
              country,
              postcode,
              address
            }
          }
        }
      `,
      },
      { headers: { Authorization: accessToken } }
    );

    const userInfo = res.data.data.me;
    console.log('TCL: userInfo', userInfo);
    dispatch({ type: actionTypes.GET_USER_PROFILE_SUCCESS, payload: userInfo });

    return userInfo;
  } catch (err) {
    console.log('ERROR - getUserProfile', err.response.data);
    dispatch({ type: actionTypes.GET_USER_PROFILE_FAIL });
    return null;
  }
};
