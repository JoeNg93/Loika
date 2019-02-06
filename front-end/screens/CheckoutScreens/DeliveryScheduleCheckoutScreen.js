import React from 'react';
import colors from '../../constants/Colors';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import CheckoutStepProgress from '../../components/CheckoutStepProgress';
import DeliverySchedule from '../../components/DeliverySchedule';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexBasis: '70%',
    flex: 1,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bottomButton: {
    height: 56,
    backgroundColor: colors.mediumCarmine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // fontFamily: 'Raleway',
    color: '#FFFFFF',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  deliverySchedule: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  image: {
    width: 204,
    height: 185,
    resizeMode: 'contain',
  },
});

export default class DeliveryScheduleCheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Choose delivery time',
    headerTransparent: true,
    headerTintColor: '#FCFAF6',
    headerBackImage: (
      <Image
        style={{ width: 16, height: 16, marginLeft: 20 }}
        source={require('../../assets/images/previous.png')}
      />
    ),
    headerRight: (
      <TouchableOpacity>
        <Image
          style={{ width: 16, height: 16, marginRight: 20 }}
          source={require('../../assets/images/cart.png')}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      marginTop: 8,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckoutStepProgress currentStep="2" />

        <View style={styles.contentContainer}>
          <View style={styles.deliverySchedule}>
            <DeliverySchedule instructionText="*Delivery is scheduled every week during month" />
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/slide3.png')}
            />
          </View>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.bottomButton}>
            <Text style={styles.buttonText}>Schedule delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
