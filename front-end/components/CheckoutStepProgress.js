import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from '../constants/commonStyles';
import colors from '../constants/Colors';

export default function CheckoutStepProgress({ currentStep }) {
  _checkCurrentStep = (elementStep, elem) => {
    if (elementStep > currentStep) {
      switch (elem) {
        case 'divider':
          return styles.greyDivider;
        case 'circle':
          return styles.greyCircle;
        case 'text':
          return styles.greyProgressText;
      }
    }
  };

  return (
    <View style={styles.topProgressBar}>
      <View style={styles.progressStepContainer}>
        <View style={[styles.circle, this._checkCurrentStep('1', 'circle')]}>
          <Image
            style={styles.icon}
            source={require('../assets/images/address.png')}
          />
        </View>
        <Text
          style={[styles.progressText, this._checkCurrentStep('1', 'text')]}
        >
          Address
        </Text>
      </View>

      <View style={[styles.divider, this._checkCurrentStep('2', 'divider')]} />

      <View style={styles.progressStepContainer}>
        <View style={[styles.circle, this._checkCurrentStep('2', 'circle')]}>
          <Image
            style={styles.icon}
            source={require('../assets/images/delivery.png')}
          />
        </View>
        <Text
          style={[styles.progressText, this._checkCurrentStep('2', 'text')]}
        >
          Delivery time
        </Text>
      </View>

      <View style={[styles.divider, this._checkCurrentStep('3', 'divider')]} />

      <View style={styles.progressStepContainer}>
        <View style={[styles.circle, this._checkCurrentStep('3', 'circle')]}>
          <Image
            style={styles.icon}
            source={require('../assets/images/confirm.png')}
          />
        </View>
        <Text
          style={[styles.progressText, this._checkCurrentStep('3', 'text')]}
        >
          Confirm
        </Text>
      </View>
    </View>
  );
}

CheckoutStepProgress.propTypes = {
  currentStep: PropTypes.oneOf(['1', '2', '3']),
};

CheckoutStepProgress.defaultProps = {
  currentStep: '1',
};

const styles = StyleSheet.create({
  topProgressBar: {
    marginTop: 20,
    minWidth: 353,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 23,
    width: 23,
    borderRadius: 311,
    backgroundColor: colors.mediumCarmine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greyCircle: {
    backgroundColor: colors.darkGrey,
  },
  icon: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
  progressText: {
    ...commonStyles.fontRalewaySemiBold,
    marginLeft: 5,
    fontSize: 10,
    color: colors.mediumCarmine,
  },
  greyProgressText: {
    color: colors.darkGrey,
  },
  divider: {
    marginRight: 14,
    marginLeft: 14,
    flex: 1,
    borderColor: colors.black,
    borderWidth: 0.5,
    margin: 5,
  },
  greyDivider: {
    borderColor: colors.darkGrey,
  },
});
