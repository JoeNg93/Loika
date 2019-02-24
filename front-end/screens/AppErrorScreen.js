import React from 'react';
import { StyleSheet,Text, View, Image } from 'react-native';
import commonStyles from '../constants/commonStyles';

class AppErrorScreen extends React.Component {
  async componentDidMount() {

  }

  render() {
    return (
      <View>
        <Text style={styles.oops}>
          Oops...
        </Text>
        <Image
          source={require('../assets/images/cancelDialogAsset.png')}
          style={styles.cancelDialogAsset}
        />
        <Text style={styles.errorMessage}>
          There is something wrong with our server. Please try again.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cancelDialogAsset: { 
    position: 'absolute',
    width: 186,
    height: 167,
    left: 116,
    top: 253,
  },
  oops: {
    position: 'absolute',
    width: 94,
    height: 36,
    left: 162,
    top: 176,
    ...commonStyles.fontRalewayRegular,
    fontWeight: '600',
    fontSize: 30,
    textAlign: 'center',
    ...commonStyles.textBlack,
  },
  errorMessage: {
    position: 'absolute',
    width: 301,
    height: 43,
    left: 60,
    top: 461,
    ...commonStyles.fontRalewayRegular,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    ...commonStyles.textBlack,
  }
});

export default AppErrorScreen;