import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import PropTypes from 'prop-types';

export default function SubscriptionBox({
  orderID,
  orderDate,
  orderPrice,
  isActive,
}) {
  return (
    <View
      style={[
        styles.boxContainer,
        isActive ? styles.boxActive : styles.boxInactive,
      ]}
    >
      <Image
        source={require('../assets/images/slide4.png')}
        style={styles.image}
      />

      <View style={styles.mainTextContainer}>
        <Text style={styles.orderDate}>Date: {orderDate}</Text>
        <Text style={styles.orderID}>Order ID: #{orderID}</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.orderPrice}>{orderPrice} €</Text>

      <TouchableOpacity style={styles.arrowIcon}>
        <Icon name={'arrow-forward'} size={21} color={Colors.macaroniCheese} />
      </TouchableOpacity>
    </View>
  );
}

SubscriptionBox.propTypes = {
  orderDate: PropTypes.string,
  orderID: PropTypes.number,
  orderPrice: PropTypes.number,
  isActive: PropTypes.bool,
};

SubscriptionBox.defaultProps = {
  orderDate: '',
  orderPrice: 0,
  isActive: true,
};

const styles = StyleSheet.create({
  boxContainer: {
    marginBottom: 21,
    width: 347,
    height: 90,
    borderRadius: 11,
		paddingHorizontal: 20,

    backgroundColor: Colors.white,
    borderBottomWidth: 4,

    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxActive: {
    borderColor: Colors.macaroniCheese,
  },
  boxInactive: {
    borderColor: Colors.lightGrey,
  },
  image: {
    height: 53,
    width: 71,
    marginBottom: 18,
    marginTop: 16,
  },
  mainTextContainer: {
    marginBottom: 26,
    marginTop: 26,
    marginLeft: 20,
  },
  orderID: {
    ...commonStyles.fontRalewayRegular,
    ...commonStyles.textGrey,
    fontSize: 12,
    marginTop: 5,
  },
  orderDate: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textBlack,
    fontSize: 12,
  },
  divider: {
    borderColor: '#E1E1E1',
    height: 25,
    borderWidth: 0.75,
    marginHorizontal: 14,
    marginTop: 31,
    marginBottom: 30,
  },
  orderPrice: {
    ...commonStyles.fontMontserratBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 16,
    marginTop: 35,
    marginBottom: 34,
  },
  arrowIcon: {
    marginLeft: 14,
  },
});
