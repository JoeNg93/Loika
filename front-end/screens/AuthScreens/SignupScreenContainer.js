import React from 'react';
import SignupScreen from './SignupScreen.js';

export default class SignupScreenContainer extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    return <SignupScreen />;
  }
}
