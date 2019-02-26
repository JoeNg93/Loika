import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import { CreditCardInput } from 'react-native-credit-card-input';
import { createOrder } from '../actions/user';

class PaymentMethodModal extends React.Component {
  state = {
    saveButtonEnabled: false,
    cardName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    buttonTitle: 'Pay',
  };

  onPaymentInputChange = formData => {
    if (!_.includes(formData.status, 'incomplete')) {
      const { name, number, expiry, cvc } = formData.values;
      this.setState({
        saveButtonEnabled: true,
        cardName: name,
        cardNumber: number,
        expirationDate: expiry,
        cvv: cvc,
      });
    }
  };

  onPressSavePaymentForm = async () => {
    this.setState({ saveButtonEnabled: false, buttonTitle: 'Processing...' });
    const { cardNumber, expirationDate, cvv } = this.state;
    const {
      shoppingCart,
      deliveryDayOfWeek,
      deliveryTime,
      billingAddress,
      shippingAddress,
    } = this.props;
    const subscriptionIds = shoppingCart.map(s => s.id);
    const billingAddressId = billingAddress.id;
    const shippingAddressId = shippingAddress.id;
    const total = shoppingCart.reduce(
      (prev, curr) => prev + curr.totalPrice,
      0
    );
    const paymentInfo = {
      cardNumber,
      cvv,
      expirationDate,
    };
    await this.props.createOrder({
      billingAddressId,
      shippingAddressId,
      deliveryDayOfWeek,
      deliveryTime,
      subscriptionIds,
      total,
      paymentInfo,
    });
    this.props.onPressCloseModal();
    this.props.onFinishPayment();
  };

  render() {
    return (
      <Modal animationType="fade" transparent visible={this.props.visible}>
        <View style={styles.popupBackground}>
          <View style={styles.popupContainer}>
            <Text style={styles.titleText}>Payment information</Text>
            <View style={{ width: '80%', height: '62%', marginTop: 12 }}>
              <CreditCardInput
                autofocus
                onChange={this.onPaymentInputChange}
                cardFontFamily={'raleway-semibold'}
                inputStyle={{
                  ...commonStyles.fontRalewayMedium,
                  ...commonStyles.black,
                  fontSize: 12,
                }}
                labelStyle={{
                  ...commonStyles.fontRalewaySemiBold,
                  ...commonStyles.black,
                  fontSize: 12,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.darkGrey,
                  marginTop: 20,
                  marginLeft: 0,
                }}
                cardScale={0.85}
                invalidColor={Colors.mediumCarmine}
                requiresName={true}
              />
            </View>
            <View style={styles.buttonGroupContainer}>
              <Button
                type={'outline'}
                title={'Cancel'}
                titleStyle={[
                  styles.buttonTitleDefaultStyle,
                  commonStyles.textMacaroniCheese,
                ]}
                buttonStyle={[
                  styles.buttonDefaultStyle,
                  styles.nonActiveButton,
                ]}
                onPress={this.props.onPressCloseModal}
              />
              <Button
                title={this.state.buttonTitle}
                titleStyle={styles.buttonTitleDefaultStyle}
                buttonStyle={[
                  styles.buttonDefaultStyle,
                  this.state.saveButtonEnabled
                    ? styles.activeButton
                    : styles.disabledButton,
                ]}
                onPress={this.onPressSavePaymentForm}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

PaymentMethodModal.propTypes = {
  visible: PropTypes.bool,
  onPressCloseModal: PropTypes.func,
  onFinishPayment: PropTypes.func,
};

PaymentMethodModal.defaultProps = {
  visible: true,
  onPressCloseModal: () => {},
  onFinishPayment: () => {},
};

const styles = StyleSheet.create({
  popupBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6);',
  },
  popupContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    height: '63%',
    width: '80%',
    paddingTop: 28,
    paddingHorizontal: 10,
    borderRadius: 16,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#878787',
    shadowOpacity: 0.25,
    borderTopWidth: 26,
    borderTopColor: '#6930b4',
  },
  titleText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textBlack,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    width: '82%',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  buttonTitleDefaultStyle: {
    ...commonStyles.fontRalewaySemiBold,
    fontSize: 14,
  },
  buttonDefaultStyle: {
    paddingVertical: 4,
    width: 102,
    borderRadius: 16,
  },
  activeButton: {
    backgroundColor: Colors.mediumCarmine,
  },
  disabledButton: {
    backgroundColor: Colors.darkGrey,
  },
  nonActiveButton: {
    borderColor: Colors.macaroniCheese,
    borderWidth: 1,
  },
});

const mapStateToProps = state => ({
  shoppingCart: state.checkout.shoppingCart,
  shippingAddress: state.checkout.shippingAddress,
  billingAddress: state.checkout.billingAddress,
  deliveryDayOfWeek: state.checkout.deliveryDayOfWeek,
  deliveryTime: state.checkout.deliveryTime,
});

export default connect(
  mapStateToProps,
  { createOrder }
)(PaymentMethodModal);
