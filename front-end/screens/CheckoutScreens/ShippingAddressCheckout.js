import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Icon, Button, CheckBox } from 'react-native-elements';
import AddressForm from '../../components/AddressForm';
import AddressSummary from '../../components/AddressSummary';
import AddNewAddressModal from '../../components/AddNewAddressModal';
import Colors from '../../constants/Colors';
import commonStyles from '../../constants/commonStyles';
import _ from 'lodash';

export default class ShippingAddressCheckout extends React.Component {
  state = {
    fetchShippingAddresses: [
      {
        name: 'Thanh Dang',
        shippingAddress: {
          address: 'Kotkantie 1',
          postCode: 90100,
          city: 'Oulu',
        },
        phoneNumber: '+3581233453232',
        isSelected: true,
      },
      {
        name: 'Robert Barker',
        shippingAddress: {
          address: 'Kajaanintie 38A',
          postCode: 90130,
          city: 'Oulu',
        },
        phoneNumber: '+3581233453232',
      },
    ],
    fetchBillingAddress: {
      name: 'Thanh Dang',
      shippingAddress: {
        address: 'Isokatu 32B',
        postCode: 90100,
        city: 'Oulu',
      },
      phoneNumber: '+3581233453232',
      sameAsShipping: false,
    },
    addressModalVisible: false,
    sameAsShippingChecked:
      this.fetchBillingAddress && this.fetchBillingAddress.sameAsShipping,
  };

  addressIndex = 0;

  onAddressInputEndEditing = ({ type, value }) => {
    //Validate input here, then return error message to AddressForm
    console.log(`${type}: ${value}`);
  };

  renderAddressSummaryList = (addressList, hasSelectedButton = true) => {
    return addressList.map(addressDetails => (
      <View key={this.addressIndex++} style={styles.addressSummaryContainer}>
        <AddressSummary
          {...addressDetails}
          hasSelectedButton={hasSelectedButton}
          canEditAddress={true}
          isButtonSelected={addressDetails.isSelected}
          onPressSelectedButton={() => {}}
          onPressSaveAddressForm={() => {}}
        />
      </View>
    ));
  };

  getSelectedShippingAddress = () => {
    return this.state.fetchShippingAddresses.filter(addressDetails => {
      return addressDetails.isSelected;
    });
  };

  openAddressModal = () => {
    this.setState({ addressModalVisible: true });
  };

  closeAddressModal = () => {
    this.setState({ addressModalVisible: false });
  };

  toggleSameAsShippingChecked = () => {
    this.setState({ sameAsShippingChecked: !this.state.sameAsShippingChecked });
  };

  renderBillingAddress = () => {
    // First scenario : When user has saved addresses
    if (!_.isEmpty(this.state.fetchBillingAddress)) {
      // Render saved billing address if checkbox is unchecked
      // Initial state for checkbox is decided if saved billing address is the same as saved shipping or not
      if (!this.state.sameAsShippingChecked) {
        return this.renderAddressSummaryList(
          [this.state.fetchBillingAddress],
          false
        );
      }
      // If checkbox is checked, always render the current selected shipping address
      else {
        if (!_.isEmpty(this.state.fetchShippingAddresses)) {
          return this.renderAddressSummaryList(
            this.getSelectedShippingAddress(),
            false
          );
        }
      }
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
    return (
      <ScrollView style={styles.mainContainer}>
        {/* Checkout Steps Here */}

        <View>
          <Text style={styles.titleText}>Shipping address</Text>
          {!_.isEmpty(this.state.fetchShippingAddresses) ? (
            <View>
              {this.renderAddressSummaryList(this.state.fetchShippingAddresses)}
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
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.mainBackground,
    marginTop: 60,
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
});
