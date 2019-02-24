import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import { boxNameToImageMapper } from '../utils/mapper';
import PropTypes from 'prop-types';

export default function SubscriptionBox({ subscriptionTitle, isActive }) {
  return (
    <View
      style={[
        styles.boxContainer,
        isActive ? styles.boxActive : styles.boxInActive,
      ]}
    >
      <Image
        source={boxNameToImageMapper[subscriptionTitle]}
        style={{ height: 72, width: 67 }}
      />
      <Text style={styles.subscriptionTitle}>{subscriptionTitle} Box</Text>
    </View>
  );
}

SubscriptionBox.propTypes = {
  subscriptionTitle: PropTypes.string,
  isActive: PropTypes.bool,
};

SubscriptionBox.defaultProps = {
  subscriptionTitle: '',
  isActive: true,
};

const styles = StyleSheet.create({
  boxContainer: {
    width: 140,
    height: 150,

    backgroundColor: Colors.white,
    borderBottomWidth: 4,

    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
  boxActive: {
    borderColor: Colors.macaroniCheese,
  },
  boxInActive: {
    borderColor: Colors.lightGrey,
  },
  subscriptionTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textBlack,
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: 18,
  },
});
