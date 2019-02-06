import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import commonStyles from '../constants/commonStyles';

export default function TotalComponent({ price }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View>
        <Text style={styles.totalText}>TOTAL:</Text>
      </View>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          {price.toFixed(2).replace('.', ',')} {'\u20AC'}
        </Text>
        <Text style={styles.noteText}>*Total include VAT</Text>
      </View>
    </View>
  );
}

TotalComponent.propTypes = {
  price: PropTypes.number,
};

TotalComponent.defaultProps = {
  price: 0,
};

const styles = StyleSheet.create({
  totalText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textGrey,
    fontSize: 16,
  },
  totalPriceContainer: {
    marginLeft: 40,
    marginTop: -4,
  },
  totalPriceText: {
    ...commonStyles.textMediumCarmine,
    ...commonStyles.fontMontserratBold,
    fontSize: 30,
  },
  noteText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
    marginTop: 6,
  },
});
