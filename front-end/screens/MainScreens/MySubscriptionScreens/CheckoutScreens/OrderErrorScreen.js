import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import commonStyles from '../../../../constants/commonStyles';
import Colors from '../../../../constants/Colors';

class OrderErrorScreen extends React.Component {
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

  onPressOrderSummary = () => {
    this.props.navigation.navigate('OrderSummary');
  };

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/images/orderError.png')}
          style={{ height: 186, width: 167 }}
        />
        <Text style={styles.orderStatusTitle}>
          Something wrong happens.
        </Text>
        <Text style={styles.orderStatusSubtitle}>
          There is something wrong with your order or payment. Please try again.
        </Text>
        <Button
          title={'Back to checkout'}
          titleStyle={styles.orderStatusBtnTitle}
          buttonStyle={styles.orderStatusBtnStyle}
          onPress={this.onPressOrderSummary}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
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

export default OrderErrorScreen;