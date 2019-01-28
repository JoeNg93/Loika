import React from 'react';
import LoginScreen from './LoginScreen';

export default class LoginScreenContainer extends React.Component {
  onPressLogin = () => {
    console.log('LOGIN');
  };

  onPressSignup = () => {
    console.log('Go to Sign Up Screen');
    this.props.navigation.navigate('Signup');
  };

  render() {
    return (
      <LoginScreen
        onPressSignup={this.onPressSignup}
        onPressLogin={this.onPressLogin}
      />
    );
  }
}
