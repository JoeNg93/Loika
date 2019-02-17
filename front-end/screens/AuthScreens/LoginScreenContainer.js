import React from 'react';
import { connect } from 'react-redux';

import LoginScreen from './LoginScreen';
import { signIn } from '../../actions/auth';

class LoginScreenContainer extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onPressLogin = async () => {
    const { email, password } = this.state;
    const { navigation, signIn } = this.props;

    const accessToken = await signIn(email, password);
    if (accessToken !== null) {
      navigation.navigate('Main');
    }
  };

  saveInput = (input = {}) => this.setState(input);

  render() {
    return (
      <LoginScreen
        onPressLogin={this.onPressLogin}
        saveInput={this.saveInput}
      />
    );
  }
}

export default connect(
  null,
  { signIn }
)(LoginScreenContainer);
