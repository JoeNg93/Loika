import React from 'react';
import { ImageBackground, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { fetchTokenFromStorage } from '../../actions/auth';

class EntryScreen extends React.Component {
  async componentDidMount() {
    const skipOnboarding = await AsyncStorage.getItem('skipOnboarding');
    const { navigation, fetchTokenFromStorage } = this.props;

    if (skipOnboarding === 'true') {
      const accessToken = await fetchTokenFromStorage();
      if (accessToken) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth');
      }
    } else {
      navigation.navigate('Onboarding');
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
}

export default connect(
  null,
  { fetchTokenFromStorage }
)(EntryScreen);
