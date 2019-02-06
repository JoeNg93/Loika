import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import PropTypes from 'prop-types';
import AddressForm from './AddressForm';

const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };

export default class AddressSummary extends React.Component {
  state = {
    isEditing: false,
  };

  switchToEditMode = () => {
    this.setState({ isEditing: true });
  };

  render() {
    return (
      <View>
        {this.props.canEditAddress && (
          <TouchableOpacity
            onPress={this.switchToEditMode}
            hitSlop={hitSlop}
            style={{ zIndex: 100 }}
          >
            <View>
              <Icon
                name={this.state.isEditing ? 'close' : 'edit'}
                size={10}
                color={Colors.white}
                containerStyle={styles.editIconContainer}
              />
            </View>
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.boxContainer,
            {
              borderColor: this.state.isEditing
                ? Colors.mediumCarmine
                : Colors.lightGrey,
            },
          ]}
        >
          {this.state.isEditing ? (
            <View style={styles.formContainer}>
              <AddressForm name={'Thanh Dang'} address={'Kotkantie 1'} onAddressInputChange={({label, value}) => {}}/>
            </View>
          ) : (
            <View style={styles.addressSummaryContainer}>
              <View style={styles.addressDetailsContainer}>
                <Text style={styles.importantText}>{this.props.name}</Text>
                <Text style={styles.defaultText}>
                  {this.props.shippingAddress}
                </Text>
                <Text style={styles.defaultText}>{this.props.phoneNumber}</Text>
              </View>
              {this.props.hasSelectedButton && (
                <View style={styles.buttonContainer}>
                  <Button
                    type={this.props.isButtonSelected ? 'solid' : 'outline'}
                    title={this.props.isButtonSelected ? 'Selected' : 'Select'}
                    titleStyle={[
                      commonStyles.fontRalewaySemiBold,
                      { fontSize: 14 },
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
                    onPress={this.props.onPressButtonSelected}
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

const styles = StyleSheet.create({
  boxContainer: {
    width: 330,
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
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 14,
    paddingRight: 14,
  },
  addressDetailsContainer: {
    flex: 3,
  },
  formContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 14,
    paddingRight:14
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
  buttonContainer: {
    flex: 2,
    paddingLeft: 4,
  },
  buttonDefaultStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    width: 102,
    borderRadius: 16,
    borderWidth: 1,
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
    borderWidth: 0,
  },
  nonActiveButton: {
    borderColor: Colors.macaroniCheese,
  },
});

AddressSummary.propTypes = {
  name: PropTypes.string,
  shippingAddress: PropTypes.string,
  phoneNumber: PropTypes.string,
  hasSelectedButton: PropTypes.bool,
  isButtonSelected: PropTypes.bool,
  onPressButtonSelected: PropTypes.func,
  canEditAddress: PropTypes.bool,
};
