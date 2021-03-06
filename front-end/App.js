import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import store from './store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/cart.png'),
        require('./assets/images/meat.png'),
        require('./assets/images/mixed.png'),
        require('./assets/images/emptyBox.png'),
        require('./assets/images/vegan.png'),
        require('./assets/images/slide1.png'),
        require('./assets/images/slide2.png'),
        require('./assets/images/slide3.png'),
        require('./assets/images/slide4.png'),
        require('./assets/images/cancelDialogAsset.png'),
        require('./assets/images/orderSuccess.png'),
        require('./assets/images/orderError.png'),
        require('./assets/images/Loika.png'),
        require('./assets/images/splash.png'),
        require('./assets/images/facebook.png'),
        require('./assets/images/google.png'),
        require('./assets/images/twitter.png'),
        require('./assets/images/profilePic.png'),
        require('./node_modules/react-native-credit-card-input/images/card-back.png'),
        require('./node_modules/react-native-credit-card-input/images/card-front.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
        'raleway-semibold': require('./assets/fonts/Raleway-SemiBold.ttf'),
        'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
