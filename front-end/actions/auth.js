import { AsyncStorage } from 'react-native';
import axios from 'axios';

import actionTypes from '../constants/actionTypes/auth';
import { baseURL } from '../utils/envConfig';

export const signIn = (email, password) => async dispatch => {
  dispatch({ type: actionTypes.SIGN_IN_PENDING });

  const res = await axios.post(baseURL, {
    query: `
        mutation {
          signin(email: "${email}", password: "${password}")
        }
      `,
  });

  if ('errors' in res.data) {
    dispatch({ type: actionTypes.SIGN_IN_FAIL });
    return null;
  }

  const accessToken = res.data.data.signin;
  dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: accessToken });

  return accessToken;
};

export const fetchTokenFromStorage = () => async dispatch => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  dispatch({
    type: actionTypes.FETCH_TOKEN_FROM_STORAGE,
    payload: accessToken,
  });
  return accessToken;
};
