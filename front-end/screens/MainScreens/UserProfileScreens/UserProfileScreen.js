import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';

import AddressSummary from '../../../components/AddressSummary';
import AddNewAddressModal from '../../../components/AddNewAddressModal';
import Colors from '../../../constants/Colors';
import commonStyles from '../../../constants/commonStyles';
import Layout from '../../../constants/Layout';
import Loader from '../../../components/Loader';

const width = Layout.window.width;

class UserProfileScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '',
    headerBackTitle: null,
    headerTransparent: true,
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

  openAddressModal = () => {
    this.setState({ addressModalVisible: true });
  };

  closeAddressModal = () => {
    this.setState({ addressModalVisible: false });
  };

  renderAddressSummaryList = addressList => {
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
          hasSelectedButton={false}
          canEditAddress={true}
          onPressSaveAddressForm={() => {}}
        />
      </View>
    ));
  };

  render() {
    const { name, email, shippingAddress, billingAddress } = this.props.user;

    if (_.isEmpty(this.props.user)) {
      return <Loader />;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainerContent}
        >
          <View style={styles.bigCircle} />
          <View style={styles.namePictureContainer}>
            <Image
              style={styles.picture}
              source={require('../../../assets/images/profilePic.png')}
            />

            <TouchableOpacity style={{ zIndex: 100 }}>
              <Icon
                name={'edit'}
                size={17}
                color={Colors.white}
                containerStyle={styles.editIconContainer}
              />
            </TouchableOpacity>

            <Text style={styles.profileNameText}>{name}</Text>
          </View>

          <View style={styles.addressesContainer}>
            <View>
              <Text style={styles.sectionText}>CONTACT DETAILS</Text>

              <View style={styles.contactDetailsContainer}>
                <TouchableOpacity style={{ zIndex: 100 }}>
                  <Icon
                    name={'edit'}
                    size={12}
                    color={Colors.white}
                    containerStyle={styles.editContactsIconContainer}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name="mail-outline"
                    color={Colors.mediumCarmine}
                    size={14}
                  />
                  <Text style={styles.contactDetailsText}>{email}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Icon
                    name="phone-iphone"
                    color={Colors.mediumCarmine}
                    size={14}
                  />
                  <Text style={styles.contactDetailsText}>+35234525663</Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.sectionText}>SHIPPING ADDRESS</Text>
              <View>
                {this.renderAddressSummaryList(shippingAddress)}
                <Button
                  type={'clear'}
                  title={'Add new address'}
                  icon={<Icon name={'add'} size={18} color={Colors.darkGrey} />}
                  titleStyle={[styles.addAddressText, { marginLeft: 4 }]}
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
            </View>

            <View>
              <Text style={styles.sectionText}>BILLING ADDRESS</Text>
              {billingAddress && (
                <AddressSummary
                  name={billingAddress.name}
                  shippingAddress={{
                    address: billingAddress.address,
                    postcode: billingAddress.postcode,
                    city: billingAddress.city,
                  }}
                  phoneNumber={billingAddress.phoneNumber}
                  hasSelectedButton={false}
                  canEditAddress={true}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
  },
  bigCircle: {
    position: 'absolute',
    width: 622,
    height: 622,
    left: -112,
    top: -452,
    borderRadius: 311,
    backgroundColor: Colors.macaroniCheese,
  },
  scrollContainerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  namePictureContainer: {
    marginTop: 95,
    width: 160,
    height: 163,
    alignItems: 'center',
  },
  picture: {
    width: 117,
    height: 117,
    marginLeft: 25,
    marginRight: 18,
  },
  editIconContainer: {
    position: 'absolute',
    backgroundColor: Colors.mediumCarmine,
    borderRadius: 50,
    padding: 4,
    bottom: 6,
    left: 40,
  },
  profileNameText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textMediumCarmine,
    fontSize: 24,
    marginTop: 15,
  },
  addressesContainer: {
    marginTop: 11,
    marginBottom: 30,
  },
  sectionText: {
    marginTop: 33,
    marginBottom: 18,
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 12,
  },
  addressSummaryContainer: {
    marginBottom: 14,
  },
  addNewAddressContainer: {
    margin: 'auto',
    marginTop: 12,
  },
  contactDetailsContainer: {
    width: 330,
    minHeight: 65,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 8,
    marginRight: 5,
    borderColor: Colors.lightGrey,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  editContactsIconContainer: {
    // also check this part
    position: 'absolute',
    backgroundColor: Colors.mediumCarmine,
    borderRadius: 50,
    padding: 4,
    bottom: 6,
    right: -20,
  },
  contactDetailsText: {
    marginLeft: 8,
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
  },
  addAddressText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {}
)(UserProfileScreen);
