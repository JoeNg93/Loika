import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import PropTypes from 'prop-types';
import AddressForm from './AddressForm';
import { updateShippingAddress } from '../actions/user';

class AddressSummary extends React.Component {
  state = {
    isEditing: false,
    saveButtonEnabled: false,
    name: '',
    address: '',
    postCode: '',
    city: '',
    phoneNumber: '',
  };

  toggleEditMode = () => {
    this.setState({ isEditing: !this.state.isEditing });
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

  componentDidMount() {
    const {
      name,
      phoneNumber,
      shippingAddress: { address, postCode, city },
    } = this.props;
    this.setState({ name, phoneNumber, address, postCode, city });
  }

  validateForm = () => {
    // Check if all form input is filled (not empty)
    return true;
  };

  onPressSaveAddressForm = () => {
    const { name, address, postCode: postcode, city, phoneNumber } = this.state;
    const newAddress = {
      name,
      address,
      city,
      phoneNumber,
      postcode: Number(postcode),
    };
    console.log('Updated addr: ', address);
    this.props.updateShippingAddress(this.props.id, newAddress);
    this.toggleEditMode();
  };

  render() {
    return (
      <View style={{ width: this.props.containerWidth }}>
        {this.props.canEditAddress && (
          <TouchableOpacity
            onPress={this.toggleEditMode}
            style={{ zIndex: 100 }}
          >
            <Icon
              name={this.state.isEditing ? 'close' : 'edit'}
              size={12}
              color={Colors.white}
              containerStyle={styles.editIconContainer}
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.boxContainer,
            {
              borderColor: this.state.isEditing
                ? Colors.mediumCarmine
                : Colors.lightGrey,
              width: this.props.containerWidth - 6,
            },
          ]}
        >
          {this.state.isEditing ? (
            <View style={styles.formContainer}>
              <AddressForm
                name={this.props.name}
                {...this.props.shippingAddress}
                phoneNumber={this.props.phoneNumber}
                onAddressInputEndEditing={this.onAddressInputEndEditing}
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
                containerStyle={styles.formSaveButtonContainer}
                onPress={this.onPressSaveAddressForm}
              />
            </View>
          ) : (
            <View style={styles.addressSummaryContainer}>
              <View style={styles.addressDetailsContainer}>
                <Text style={styles.importantText}>{this.props.name}</Text>
                <Text style={styles.defaultText}>
                  {Object.values(this.props.shippingAddress).join(', ')}
                </Text>
                <Text style={styles.defaultText}>{this.props.phoneNumber}</Text>
              </View>
              {this.props.hasSelectedButton && (
                <View style={styles.selectButtonContainer}>
                  <Button
                    type={this.props.isButtonSelected ? 'solid' : 'outline'}
                    title={this.props.isButtonSelected ? 'Selected' : 'Select'}
                    titleStyle={[
                      styles.buttonTitleDefaultStyle,
                      this.props.isButtonSelected
                        ? commonStyles.textWhite
                        : commonStyles.textMacaroniCheese,
                    ]}
                    buttonStyle={[
                      styles.buttonDefaultStyle,
                      this.props.isButtonSelected
                        ? styles.activeButton
                        : styles.nonActiveButton,
                    ]}
                    onPress={() =>
                      this.props.onPressSelectedButton(this.props.id)
                    }
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

AddressSummary.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  shippingAddress: PropTypes.shape({
    address: PropTypes.string,
    postCode: PropTypes.number,
    city: PropTypes.string,
  }),
  phoneNumber: PropTypes.string,
  hasSelectedButton: PropTypes.bool,
  isButtonSelected: PropTypes.bool,
  onPressSelectedButton: PropTypes.func,
  canEditAddress: PropTypes.bool,
  onPressSaveAddressForm: PropTypes.func,
  containerWidth: PropTypes.number,
};

AddressSummary.defaultProps = {
  id: '',
  name: '',
  shippingAddress: {},
  phoneNumber: '',
  hasSelectedButton: false,
  isButtonSelected: false,
  onPressSelectedButton: () => {},
  canEditAddress: false,
  onPressSaveAddressForm: () => {},
  containerWidth: 336,
};

const styles = StyleSheet.create({
  boxContainer: {
    minHeight: 90,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 8,
    marginRight: 5,
  },
  addressSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  addressDetailsContainer: {
    flex: 3,
  },
  formContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  formSaveButtonContainer: {
    marginTop: 18,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  importantText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 14,
  },
  defaultText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
    marginTop: 10,
  },
  selectButtonContainer: {
    flex: 2,
    paddingLeft: 4,
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
  editIconContainer: {
    backgroundColor: Colors.mediumCarmine,
    borderRadius: 50,
    padding: 4,
    position: 'absolute',
    right: 0,
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
  { updateShippingAddress }
)(AddressSummary);
