import React from 'react';
import { ImageBackground, AsyncStorage } from 'react-native';

export default class EntryScreen extends React.Component {
  async componentDidMount() {
    const skipOnboarding = await AsyncStorage.getItem('skipOnboarding');

    if (skipOnboarding === 'true') {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate('Onboarding');
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
