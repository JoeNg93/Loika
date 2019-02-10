import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'react-native-elements';

import commonStyles from '../constants/commonStyles';
import Colors from '../constants/Colors';

const ICON_SIZE = 14;

export default function ShippedToSummary({
  name,
  address,
  phoneNumber,
  deliveryDayOfWeek,
  deliveryTime,
  hasChangeButton,
  onPressChangeButton,
}) {
  return (
    <View style={styles.container}>
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
        <Text style={styles.personalInfoText}>{address}</Text>
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
      <View style={{ flexDirection: 'row', marginTop: 17 }}>
        <Icon name="date-range" color={Colors.mediumCarmine} size={ICON_SIZE} />
        <Text style={styles.personalInfoText}>
          {deliveryDayOfWeek}, around {deliveryTime}
        </Text>
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
  address: PropTypes.string,
  phoneNumber: PropTypes.string,
  deliveryDayOfWeek: PropTypes.string,
  deliveryTime: PropTypes.string,
  hasChangeButton: PropTypes.bool,
  onPressChangeButton: PropTypes.func,
};

ShippedToSummary.defaultProps = {
  name: '',
  address: '',
  phoneNumber: '',
  deliveryDayOfWeek: '',
  deliveryTime: '',
  hasChangeButton: false,
  onPressChangeButton: () => {},
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    backgroundColor: Colors.white,

    paddingVertical: 18,
    paddingHorizontal: 15,

    shadowColor: Colors.darkGrey,
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
  },
  thinLine: {
    borderColor: '#E1E1E1',
    height: 0.5,
  },
  personalInfoText: {
    marginLeft: 8,
    ...commonStyles.fontRalewayMedium,
  },
  changeText: {
    marginLeft: 63,
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textMacaroniCheese,
  },
});
