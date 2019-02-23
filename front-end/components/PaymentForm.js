import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import PropTypes from 'prop-types';

const paymentFormType = {
  cardName: 'cardName',
  cardNumber: 'cardNumber',
  expiredDate: 'expiredDate',
  cvv: 'cvv',
};

export default function PaymentForm({ onPaymentInputEndEditing }) {
  return (
    <View>
      <TextField
        label={'Cardholder name'}
        textColor={Colors.black}
        fontSize={12}
        labelFontSize={10}
        lineWidth={0.5}
        activeLineWidth={1}
        tintColor={Colors.mediumCarmine}
        baseColor={Colors.mediumBlack}
        errorColor={Colors.mediumCarmine}
        inputContainerStyle={styles.inputContainer}
        labelTextStyle={styles.inputLabel}
        onEndEditing={event =>
          onPaymentInputEndEditing({
            type: paymentFormType.cardName,
            value: event.nativeEvent.text,
          })
        }
      />
      <TextField
        label={'Card number'}
        textColor={Colors.black}
        fontSize={12}
        labelFontSize={10}
        lineWidth={0.5}
        activeLineWidth={1}
        tintColor={Colors.mediumCarmine}
        baseColor={Colors.mediumBlack}
        errorColor={Colors.mediumCarmine}
        inputContainerStyle={styles.inputContainer}
        labelTextStyle={styles.inputLabel}
        onEndEditing={event =>
          onPaymentInputEndEditing({
            type: paymentFormType.cardNumber,
            value: event.nativeEvent.text,
          })
        }
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextField
          label={'Exp. Date (MM/YY)'}
          textColor={Colors.black}
          fontSize={12}
          labelFontSize={10}
          lineWidth={0.5}
          activeLineWidth={1}
          tintColor={Colors.mediumCarmine}
          baseColor={Colors.mediumBlack}
          errorColor={Colors.mediumCarmine}
          inputContainerStyle={styles.inputContainer}
          labelTextStyle={styles.inputLabel}
          containerStyle={styles.smallInputContainer}
          onEndEditing={event =>
            onPaymentInputEndEditing({
              type: paymentFormType.expiredDate,
              value: event.nativeEvent.text,
            })
          }
        />
        <TextField
          label={'CVC/CVV'}
          textColor={Colors.black}
          fontSize={12}
          labelFontSize={10}
          lineWidth={0.5}
          activeLineWidth={1}
          tintColor={Colors.mediumCarmine}
          baseColor={Colors.mediumBlack}
          errorColor={Colors.mediumCarmine}
          inputContainerStyle={styles.inputContainer}
          labelTextStyle={styles.inputLabel}
          containerStyle={styles.smallInputContainer}
          onEndEditing={event =>
            onPaymentInputEndEditing({
              type: paymentFormType.cvv,
              value: event.nativeEvent.text,
            })
          }
        />
      </View>
    </View>
  );
}

PaymentForm.propTypes = {
  onPaymentInputEndEditing: PropTypes.func,
};

PaymentForm.defaultProps = {
  onPaymentInputEndEditing: ({ type, value }) => {},
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: -8,
    paddingTop: 36,
    height: 58,
  },
  smallInputContainer: {
    width: '45%',
  },
  inputLabel: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.black,
  },
});
