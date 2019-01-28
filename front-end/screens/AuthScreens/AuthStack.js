import { createStackNavigator } from 'react-navigation';

import LoginScreenContainer from './LoginScreenContainer';
import SignupScreenContainer from './SignupScreenContainer';

export default createStackNavigator(
  {
    Login: LoginScreenContainer,
    Signup: SignupScreenContainer,
  },
  { initialRouteName: 'Login' }
);
