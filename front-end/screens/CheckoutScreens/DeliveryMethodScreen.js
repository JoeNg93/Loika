import React from 'react';
import colors from '../../constants/Colors';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import DeliverySchedule from './DeliverySchedule';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-around',
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

export default class DeliveryScreen extends React.Component {

// idk what you do with this kinda stuff lol 

// static navigationOptions = {
  //   headerTitle: 'Choose delivery time',
  //   headerTransparent: true,
  //   headerTintColor: '#FCFAF6',
  //   headerBackImage: (
  //     <Image
  //       style={{ width: 16, height: 16, marginLeft: 20 }}
  //       source={require('../../assets/images/previous.png')}
  //     />
  //   ),
  //   headerRight: (
  //     <TouchableOpacity>
  //       <Image
  //         style={{ width: 16, height: 16, marginRight: 20 }}
  //         source={require('../../assets/images/cart.png')}
  //       />
  //     </TouchableOpacity>
  //   ),
  //   headerStyle: {
  //     marginTop: 8,
  //   },
  // };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.deliverySchedule}>
          <DeliverySchedule/>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/images/slide3.png')}/>
        </View>
      </View>
    );
  }
}
