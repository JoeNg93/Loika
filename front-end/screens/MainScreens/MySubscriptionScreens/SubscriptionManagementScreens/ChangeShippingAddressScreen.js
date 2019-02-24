import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import AddressSummary from '../../../../components/AddressSummary';
import AddNewAddressModal from '../../../../components/AddNewAddressModal';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';
import Layout from '../../../../constants/Layout';

const width = Layout.window.width;

export default class ChangeShippingAddressScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Change shipping address',
    headerTransparent: true,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableHighlight style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
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
    fetchShippingAddresses: [
      {
        name: 'Thanh Dang',
        shippingAddress: {
          address: 'Kotkantie 1',
          postcode: 90100,
          city: 'Oulu',
        },
        phoneNumber: '+3581233453232',
        isSelected: true,
      },
      {
        name: 'Robert Barker',
        shippingAddress: {
          address: 'Kajaanintie 38A',
          postcode: 90130,
          city: 'Oulu',
        },
        phoneNumber: '+3581233453232',
      },
    ],
    addressModalVisible: false,
  };

  addressIndex = 0;

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

  openAddressModal = () => {
    this.setState({ addressModalVisible: true });
  };

  closeAddressModal = () => {
    this.setState({ addressModalVisible: false });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 34 }}>
            <Text style={styles.titleText}>Shipping address</Text>
            {this.state.fetchShippingAddresses && (
              <View>
                {this.renderAddressSummaryList(
                  this.state.fetchShippingAddresses
                )}
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
            )}
          </View>
          <Text style={styles.instructionText}>
            *Shipping address will be change for next order
          </Text>
        </ScrollView>
        <View>
          <Button
            title={'Confirm changes'}
            titleStyle={styles.mainButtonTitle}
            buttonStyle={styles.mainButtonStyle}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 80,
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
  instructionText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textGrey,
    fontSize: 10,
    marginTop: 42,
    textAlign: 'center',
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
