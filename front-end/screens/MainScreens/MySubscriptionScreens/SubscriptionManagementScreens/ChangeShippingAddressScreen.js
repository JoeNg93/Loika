import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import AddressSummary from '../../../../components/AddressSummary';
import AddNewAddressModal from '../../../../components/AddNewAddressModal';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';
import Layout from '../../../../constants/Layout';
import { changeOrderShippingAddress } from '../../../../actions/order';

const width = Layout.window.width;

class ChangeShippingAddressScreen extends React.Component {
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
    addressModalVisible: false,
  };

  renderAddressSummaryList = addressList => {
    const { selectedOrder, changeOrderShippingAddress } = this.props;
    return addressList.map(addressDetails => (
      <View key={addressDetails.id} style={styles.addressSummaryContainer}>
        <AddressSummary
          id={addressDetails.id}
          name={addressDetails.name}
          phoneNumber={addressDetails.phoneNumber}
          shippingAddress={{
            address: addressDetails.address,
            postcode: addressDetails.postcode,
            city: addressDetails.city,
          }}
          hasSelectedButton={true}
          isButtonSelected={
            addressDetails.id === selectedOrder.shippingAddress.id
          }
          onPressSelectedButton={() =>
            this.props.changeOrderShippingAddress(
              selectedOrder.id,
              addressDetails.id
            )
          }
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
    const { user, selectedOrder, changeOrderShippingAddress } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 34 }}>
            <Text style={styles.titleText}>Shipping address</Text>
            {user.shippingAddress.length > 0 && (
              <View>
                {this.renderAddressSummaryList(user.shippingAddress)}
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
                  onFinishAddingNewAddress={addressId =>
                    changeOrderShippingAddress(selectedOrder.id, addressId)
                  }
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

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedOrder: state.order.selectedOrder,
});

export default connect(
  mapStateToProps,
  { changeOrderShippingAddress }
)(ChangeShippingAddressScreen);
