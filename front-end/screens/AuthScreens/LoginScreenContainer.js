import React from 'react';
import { connect } from 'react-redux';

import LoginScreen from './LoginScreen';
import { signIn } from '../../actions/auth';
import commonStyles from "../../constants/commonStyles";

class LoginScreenContainer extends React.Component {
  static navigationOptions = {
    headerTitle: '',
    headerBackTitle: null,
    headerTransparent: true,
    headerTitleStyle: {
      ...commonStyles.fontRalewayBold,
      fontSize: 18,
    },
    headerStyle: {
      marginTop: 10,
    },
  };

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
