import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Icon, Button, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';

import AddressForm from '../../../../components/AddressForm';
import AddressSummary from '../../../../components/AddressSummary';
import AddNewAddressModal from '../../../../components/AddNewAddressModal';
import CheckoutStepProgress from '../../../../components/CheckoutStepProgress';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';
import Layout from '../../../../constants/Layout';
import {
  setSelectedBillingAddress,
  setSelectedShippingAddress,
} from '../../../../actions/checkout';
import _ from 'lodash';

const width = Layout.window.width;

class ShippingAddressCheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Your address and contact',
    headerTransparent: true,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableHighlight style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight style={{ marginRight: 20 }}>
        <Icon name={'shopping-basket'} size={22} color={Colors.mediumCarmine} />
      </TouchableHighlight>
    ),
    headerTitleStyle: {
      ...commonStyles.fontRalewayBold,
      fontSize: 18,
    },
    headerStyle: {
      marginTop: 10,
    },
  };

  state = {
    addressModalVisible: false,
    sameAsShippingChecked:
      this.fetchBillingAddress && this.fetchBillingAddress.sameAsShipping,
  };

  componentDidMount() {
    if (_.isEmpty(this.props.billingAddress)) {
      this.props.setSelectedBillingAddress(this.props.user.billingAddress);
    }
    if (_.isEmpty(this.props.shippingAddress)) {
      this.props.setSelectedShippingAddress(this.props.user.shippingAddress[0]);
    }
  }

  addressIndex = 0;

  onAddressInputEndEditing = ({ type, value }) => {
    //Validate input here, then return error message to AddressForm
    console.log(`${type}: ${value}`);
  };

  renderAddressSummaryList = (addressList, hasSelectedButton = true) => {
    return addressList.map(addressDetails => (
      <View key={addressDetails.id} style={styles.addressSummaryContainer}>
        <AddressSummary
          id={addressDetails.id}
          name={addressDetails.name}
          phoneNumber={addressDetails.phoneNumber}
          shippingAddress={{
            address: addressDetails.street1,
            postCode: addressDetails.postcode,
            city: addressDetails.city,
          }}
          hasSelectedButton={hasSelectedButton}
          canEditAddress={true}
          isButtonSelected={addressDetails.id === this.props.shippingAddress.id}
          onPressSelectedButton={id => {
            const shippingAddress = this.props.user.shippingAddress.find(
              addr => addr.id === id
            );
            this.props.setSelectedShippingAddress(shippingAddress);
            if (this.state.sameAsShippingChecked) {
              this.props.setSelectedBillingAddress(shippingAddress);
            }
          }}
          onPressSaveAddressForm={() => {}}
        />
      </View>
    ));
  };

  getSelectedShippingAddress = () => {
    return this.props.user.shippingAddress[0];
  };

  openAddressModal = () => {
    this.setState({ addressModalVisible: true });
  };

  closeAddressModal = () => {
    this.setState({ addressModalVisible: false });
  };

  toggleSameAsShippingChecked = () => {
    this.setState(
      { sameAsShippingChecked: !this.state.sameAsShippingChecked },
      () => {
        let billingAddress;
        if (this.state.sameAsShippingChecked) {
          billingAddress = this.props.shippingAddress;
        } else {
          billingAddress = this.props.user.billingAddress || {};
        }
        this.props.setSelectedBillingAddress(billingAddress);
      }
    );
  };

  onPressConfirmAddress = () => {
    this.props.navigation.navigate('DeliveryScheduleCheckout');
  };

  renderBillingAddress = () => {
    // First scenario : When user has saved addresses
    if (!_.isEmpty(this.props.billingAddress)) {
      return this.renderAddressSummaryList([this.props.billingAddress], false);
    }
    // Second scenario: when user first make order and hasn't entered any address
    else {
      // Render address form if checkbox is unchecked, whereas hide address form when checkbox is checked
      if (!this.state.sameAsShippingChecked) {
        return (
          <View style={{ marginTop: 14 }}>
            <AddressForm
              onAddressInputEndEditing={this.onAddressInputEndEditing}
            />
          </View>
        );
      }
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <CheckoutStepProgress currentStep="1" />

          <View style={{ marginTop: 34 }}>
            <Text style={styles.titleText}>Shipping address</Text>
            {!_.isEmpty(this.props.user.shippingAddress) ? (
              <View>
                {this.renderAddressSummaryList(this.props.user.shippingAddress)}
                <Button
                  type={'clear'}
                  title={'Add new address'}
                  icon={<Icon name={'add'} size={18} color={Colors.darkGrey} />}
                  titleStyle={[styles.titleText, { marginLeft: 4 }]}
                  buttonStyle={{ alignItems: 'center' }}
                  containerStyle={styles.addNewAddressContainer}
                  onPress={this.openAddressModal}
                />
                <AddNewAddressModal
                  visible={this.state.addressModalVisible}
                  onPressCloseModal={this.closeAddressModal}
                  onPressSaveAddressForm={() => {}}
                />
              </View>
            ) : (
              <View style={{ marginBottom: 34 }}>
                <AddressForm
                  onAddressInputEndEditing={this.onAddressInputEndEditing}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.titleText}>Billing address</Text>
            <CheckBox
              title="Same as shipping address"
              checked={this.state.sameAsShippingChecked}
              onPress={this.toggleSameAsShippingChecked}
              size={16}
              textStyle={styles.checkBoxText}
              containerStyle={styles.checkBoxContainer}
              checkedColor={Colors.mediumCarmine}
              uncheckedColor={Colors.mediumCarmine}
            />
            {this.renderBillingAddress()}
          </View>
        </ScrollView>
        <View>
          <Button
            title={'Confirm address'}
            titleStyle={styles.mainButtonTitle}
            buttonStyle={styles.mainButtonStyle}
            onPress={this.onPressConfirmAddress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 70,
    paddingHorizontal: 20,
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressSummaryContainer: {
    marginTop: 14,
  },
  titleText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  addNewAddressContainer: {
    margin: 'auto',
    marginTop: 12,
    marginBottom: 14,
  },
  checkBoxText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
  },
  checkBoxContainer: {
    padding: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 12,
    backgroundColor: 'transparent',
    borderWidth: 0,
    zIndex: 100,
  },
  mainButtonStyle: {
    backgroundColor: Colors.mediumCarmine,
    width: width,
    height: 56,
  },
  mainButtonTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textWhite,
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
  shippingAddress: state.checkout.shippingAddress,
  billingAddress: state.checkout.billingAddress,
});

export default connect(
  mapStateToProps,
  { setSelectedBillingAddress, setSelectedShippingAddress }
)(ShippingAddressCheckoutScreen);
