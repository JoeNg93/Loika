import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'react-native-elements';

import commonStyles from '../constants/commonStyles';
import Colors from '../constants/Colors';
import { dayOfWeekAbbrMapper } from '../utils/mapper';

const ICON_SIZE = 14;

export default function ShippedToSummary({
  name,
  shippingAddress,
  phoneNumber,
  deliveryDayOfWeek,
  deliveryTime,
  hasChangeButton,
  onPressChangeButton,
  containerWidth,
}) {
  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text
        style={[
          { marginBottom: 9 },
          commonStyles.fontRalewayBold,
          commonStyles.textMediumCarmine,
        ]}
      >
        {name}
      </Text>
      <Divider style={styles.thinLine} />
      <View style={{ flexDirection: 'row', marginTop: 17, marginBottom: 9 }}>
        <Icon name="place" color={Colors.mediumCarmine} size={ICON_SIZE} />
        <Text style={styles.personalInfoText}>
          {Object.values(shippingAddress).join(', ')}
        </Text>
      </View>
      <Divider style={styles.thinLine} />
      <View style={{ flexDirection: 'row', marginTop: 17, marginBottom: 9 }}>
        <Icon
          name="phone-iphone"
          color={Colors.mediumCarmine}
          size={ICON_SIZE}
        />
        <Text style={styles.personalInfoText}>{phoneNumber}</Text>
      </View>
      <Divider style={styles.thinLine} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 17,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="date-range"
            color={Colors.mediumCarmine}
            size={ICON_SIZE}
          />
          <Text style={styles.personalInfoText}>
            {dayOfWeekAbbrMapper[deliveryDayOfWeek]}, around {deliveryTime}
          </Text>
        </View>
        {hasChangeButton && (
          <TouchableOpacity onPress={onPressChangeButton}>
            <Text style={styles.changeText}>Change ></Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

ShippedToSummary.propTypes = {
  name: PropTypes.string,
  shippingAddress: PropTypes.shape({
    address: PropTypes.string,
    postcode: PropTypes.number,
    city: PropTypes.string,
  }),
  phoneNumber: PropTypes.string,
  deliveryDayOfWeek: PropTypes.string,
  deliveryTime: PropTypes.string,
  hasChangeButton: PropTypes.bool,
  onPressChangeButton: PropTypes.func,
  containerWidth: PropTypes.number,
};

ShippedToSummary.defaultProps = {
  name: '',
  shippingAddress: {},
  phoneNumber: '',
  deliveryDayOfWeek: '',
  deliveryTime: '',
  hasChangeButton: false,
  onPressChangeButton: () => {},
  containerWidth: 347,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    backgroundColor: Colors.white,

    paddingVertical: 28,
    paddingHorizontal: 22,

    shadowColor: Colors.darkGrey,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
  },
  thinLine: {
    borderColor: '#E1E1E1',
    borderWidth: 0.1,
  },
  personalInfoText: {
    marginLeft: 8,
    ...commonStyles.fontRalewayMedium,
  },
  changeText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textMacaroniCheese,
    fontSize: 12,
  },
});
