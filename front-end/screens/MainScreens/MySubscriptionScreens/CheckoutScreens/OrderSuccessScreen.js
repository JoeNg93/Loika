import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import commonStyles from '../../../../constants/commonStyles';
import Colors from '../../../../constants/Colors';

class OrderSuccessScreen extends React.Component {
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

  onPressMySubscription = () => {
    this.props.navigation.navigate('Home');
  };

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/images/orderSuccess.png')}
          style={{ height: 167, width: 186 }}
        />
        <Text style={styles.orderStatusTitle}>
          You order is accepted
        </Text>
        <Text style={styles.orderStatusSubtitle}>
          Your payment of 388,00 € has been successful
        </Text>
        <Button
          title={'Check your subscriptions'}
          titleStyle={styles.orderStatusBtnTitle}
          buttonStyle={styles.orderStatusBtnStyle}
          onPress={this.onPressMySubscription}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60
  },
  orderStatusTitle: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textBlack,
    fontSize: 22,
    marginBottom: 22,
    marginTop: 55,
  },
  orderStatusSubtitle: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 18,
    marginBottom: 70,
  },
  orderStatusBtnStyle: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 26,
    backgroundColor: Colors.mediumCarmine,
  },
  orderStatusBtnTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.white,
    fontSize: 16,
  },
});

export default OrderSuccessScreen;