import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import SideSwipe from 'react-native-sideswipe';

import Carousel from '../../../../components/Carousel';
const boxes = [
  {
    title: 'Mixed Box',
    price: '199 €',
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Best seller',
    image: require('../../../../assets/images/mixed.png'),
  },
  {
    title: 'Vegan Box',
    price: '299 €',
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Vegan',
    image: require('../../../../assets/images/vegan.png'),
  },
  {
    title: 'Meat Box',
    price: '499 €',
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Meat',
    image: require('../../../../assets/images/meat.png'),
  },
];

export default class SubscriptionSelectionScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentIndex: 0,
  };

  render() {
    const { width } = Dimensions.get('window');
    const contentOffset = (width - Carousel.WIDTH) / 2;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.circle} />
          <View style={styles.topBar}>
            <TouchableOpacity>
              <Image
                style={{ width: 16, height: 16 }}
                source={require('../../../../assets/images/previous.png')}
              />
            </TouchableOpacity>
            <Text style={styles.topText}>Choose your subscription</Text>
            <TouchableOpacity>
              <Image
                style={{ width: 18, height: 18 }}
                source={require('../../../../assets/images/cart.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 9 }}>
          <SideSwipe
            index={this.state.currentIndex}
            itemWidth={Carousel.WIDTH}
            threshold={5}
            style={{ width }}
            contentContainerStyle={{ paddingTop: 20 }}
            data={boxes}
            contentOffset={contentOffset}
            onIndexChang1e={index =>
              this.setState(() => ({ currentIndex: index }))
            }
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
              <Carousel
                box={item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            )}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <View style={styles.plusCircle}>
              <Image
                style={styles.plus}
                source={require('../../../../assets/images/plus.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.total}>TOTAL: 549€</Text>
        </View>
        <View style={[{ flex: 1 }, styles.bottom]}>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderText}>Confirm order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 622,
    height: 622,
    left: -104,
    top: -321,
    borderRadius: 311,
    backgroundColor: '#FCB79A',
  },
  topBar: {
    flexDirection: 'row',
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  topText: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#AA3C3B',
  },
  plusCircle: {
    //position: absolute;
    width: 48,
    height: 48,
    //left: 183px;
    //top: 576px;
    borderWidth: 2,
    borderColor: '#AA3C3B',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  plus: {
    width: 23.17,
    height: 23.17,
  },
  total: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#AA3C3B',
    paddingTop: 16,
  },
  orderButton: {
    width: this.width,
    height: 56,
    backgroundColor: '#AA3C3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
});
