import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Icon, Button, CheckBox, colors } from 'react-native-elements';
import AddressForm from '../../../components/AddressForm';
import AddressSummary from '../../../components/AddressSummary';
import AddNewAddressModal from '../../../components/AddNewAddressModal';
import Colors from '../../../constants/Colors';
import commonStyles from '../../../constants/commonStyles';
import Layout from '../../../constants/Layout';

const width = Layout.window.width;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
  },
  bigCircle: {
<<<<<<< HEAD
    position: 'absolute',
    width: 622,
    height: 622,
    left: -112,
    top: -452,
    borderRadius: 311,
    backgroundColor: Colors.macaroniCheese,
=======
		position: 'absolute',
		width: 622,
		height: 622,
		left: -112,
		top: -452,
		borderRadius: 311,
		backgroundColor: Colors.macaroniCheese,
>>>>>>> 0d07eca725ff5f01f055bd736a9f2807b4e1b009
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
<<<<<<< HEAD
    // check if this part works on iphone 6 
=======
>>>>>>> 0d07eca725ff5f01f055bd736a9f2807b4e1b009
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
<<<<<<< HEAD
    // also check this part 
=======
>>>>>>> 0d07eca725ff5f01f055bd736a9f2807b4e1b009
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
  addAddressButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAdressText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 12,
  },
});

export default function UserProfileScreen(props) {
  return (
    <View style={styles.container}>
      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <View style={styles.bigCircle}/>
        <View style={styles.namePictureContainer}>
          <Image
            style={styles.picture}
            source={require('../../../assets/images/profilePic.png')}
          />

          <TouchableOpacity
            style={{ zIndex: 100 }}
          >
            <Icon
              name={'edit'}
              size={17}
              color={Colors.white}
              containerStyle={styles.editIconContainer}
            />
          </TouchableOpacity>

          <Text style={styles.profileNameText}>Robert Barker</Text>
        </View>

        <View style={styles.addressesContainer}>
          <View>
            <Text style={styles.sectionText}>CONTACT DETAILS</Text>
            
            <View style={styles.contactDetailsContainer}>
              
              <TouchableOpacity
              style={{ zIndex: 100 }}
             >
              <Icon
                name={'edit'}
                size={12}
                color={Colors.white}
                containerStyle={styles.editContactsIconContainer}
              />
             </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="mail-outline"
                  color={Colors.mediumCarmine}
                  size={14}
                />
                <Text style={styles.contactDetailsText}>roberto@gmail.com</Text>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 10}}>
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
              <AddressSummary
                name={'Thanh Dang'}
                shippingAddress={{
                  address: 'Kotkantie 1',
                  postCode: 90130,
                  city: 'Oulu',
                }}
                phoneNumber={'+358469430446'}
                hasSelectedButton={false}
                canEditAddress={true}
              />
              <View style={{ marginBottom: 25 }}/>
              <AddressSummary
                name={'Thanh Dang'}
                shippingAddress={{
                  address: 'Kotkantie 1',
                  postCode: 90130,
                  city: 'Oulu',
                }}
                phoneNumber={'+358469430446'}
                hasSelectedButton={false}
                canEditAddress={true}
              />
              
              <TouchableOpacity style={styles.addAddressButton}>
                <Icon
                  name={'add'}
                  size={13}
                  color={Colors.darkGrey}
                />
                <Text style={styles.addAdressText}>ADD NEW ADDRESS</Text>
              </TouchableOpacity>
              
            </View>
          </View>
          
          <View>
            <Text style={styles.sectionText}>BILLING ADDRESS</Text>
            <AddressSummary
              name={'Thanh Dang'}
              shippingAddress={{
                address: 'Kotkantie 1',
                postCode: 90130,
                city: 'Oulu',
              }}
              phoneNumber={'+358469430446'}
              hasSelectedButton={false}
              canEditAddress={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
