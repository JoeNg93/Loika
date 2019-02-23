import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import AddressForm from './AddressForm';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import { addShippingAddress } from '../actions/user';

class AddNewAddressModal extends React.Component {
  state = {
    saveButtonEnabled: false,
    name: '',
    address: '',
    postcode: '',
    city: '',
    phoneNumber: '',
  };

  onAddressInputEndEditing = ({ type, value }) => {
    //Validate input here, then return error message to AddressForm
    console.log(`${type}: ${value}`);
    this.setState({ [type]: value });
    //Validate form to see if save button should be enabled
    if (this.validateForm()) {
      this.setState({ saveButtonEnabled: true });
    }
  };

  validateForm = () => {
    // Check if all form input is filled (not empty)
    return true;
  };

  onPressSaveAddressForm = () => {
    const { name, address, postcode, city, phoneNumber } = this.state;
    const newAddress = {
      name,
      address,
      city,
      phoneNumber,
      postcode: Number(postcode),
      id: Math.random().toString(36),
    };
    this.props.addShippingAddress(newAddress);
    this.props.onPressCloseModal();
  };

  render() {
    return (
      <Modal animationType="fade" transparent visible={this.props.visible}>
        <View style={styles.popupBackground}>
          <View style={styles.popupContainer}>
            <Text style={styles.titleText}>Add new address</Text>
            <AddressForm
              onAddressInputEndEditing={this.onAddressInputEndEditing}
            />
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
                title={'Save'}
                titleStyle={styles.buttonTitleDefaultStyle}
                buttonStyle={[
                  styles.buttonDefaultStyle,
                  this.state.saveButtonEnabled
                    ? styles.activeButton
                    : styles.disabledButton,
                ]}
                onPress={this.onPressSaveAddressForm}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

AddNewAddressModal.propTypes = {
  visible: PropTypes.bool,
  onPressCloseModal: PropTypes.func,
  onPressSaveAddressForm: PropTypes.func,
};

AddNewAddressModal.defaultProps = {
  visible: true,
  onPressCloseModal: () => {},
  onPressSaveAddressForm: () => {},
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
    backgroundColor: Colors.mainBackground,
    alignItems: 'center',
    height: 'auto',
    width: '80%',
    paddingVertical: 34,
    paddingHorizontal: 8,
    borderRadius: 16,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#878787',
    shadowOpacity: 0.25,
  },
  titleText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    width: '82%',
    justifyContent: 'space-around',
    marginTop: 24,
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

export default connect(
  null,
  { addShippingAddress }
)(AddNewAddressModal);
