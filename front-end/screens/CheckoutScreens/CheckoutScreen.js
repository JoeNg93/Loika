import React from 'react';
import colors from '../../constants/Colors';
import {StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import DeliveryMethodScreen from './DeliveryMethodScreen.js';
import CheckoutStepProgress from './CheckoutStepProgress.js';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexBasis: '70%',
    flex: 1,
    alignItems: 'center',
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
});

export default class OrderScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <CheckoutStepProgress
          currentStep={'2'}
        /> 
        {/* pass the checkout step */}

        <View style={styles.contentContainer}>
          {/* content goes here */}
          <DeliveryMethodScreen/>
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
