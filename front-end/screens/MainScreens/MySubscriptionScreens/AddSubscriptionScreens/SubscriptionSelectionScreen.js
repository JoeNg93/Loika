import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Icon } from 'react-native-elements';
import Carousel from '../../../../components/Carousel';
import Colors from '../../../../constants/Colors';
import commonStyles from "../../../../constants/commonStyles";

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
    headerTitle: 'Choose your subscription',
    headerTransparent: true,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableOpacity style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }}>
        <Icon name={'shopping-basket'} size={22} color={Colors.mediumCarmine} />
      </TouchableOpacity>
    ),
    headerStyle: {
      ...commonStyles.fontRalewayBold,
      fontSize: 18,
      marginTop: 8,
    },
  };

  state = {
    currentIndex: 0,
  };

  render() {
    const { width } = Dimensions.get('window');
    const contentOffset = (width - Carousel.WIDTH) / 2;

    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
				<View style={{height: 60}}>
          <View style={styles.bigCircle}></View>

          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{boxes[this.state.currentIndex].price}</Text>
          </View>
        </View>
				<View style={{height: 305}}>
          <SideSwipe
            shouldCapture={() => true}
            extractKey={item => item.title}
            itemWidth={Carousel.WIDTH}
            threshold={5}
            style={{ width }}
            contentContainerStyle={{  paddingTop: 20, overflow: 'visible', marginBottom: 10 }}
            data={boxes}
            contentOffset={contentOffset}
            onIndexChange={index =>
              this.setState(() => ({ currentIndex: index }))
            }
            renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
             <Carousel
                box= {item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            )}
          />
        </View>
        <Animated.View style={styles.textContainer}>
          <View style={styles.textTag}>
            <Text style={styles.textTagText}>{boxes[this.state.currentIndex].tag}</Text>
          </View>
          <Text style={styles.title}>{boxes[this.state.currentIndex].title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{boxes[this.state.currentIndex].size}</Text>
            <View style={styles.circle}></View>
            <Text style={styles.valueText}>{boxes[this.state.currentIndex].divprice}</Text>
          </View>
          <Text style={styles.description}>{boxes[this.state.currentIndex].description}</Text>
        </Animated.View>
        <View style={styles.totalContainer}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View style={styles.plusCircle}>
              <Image
                style={styles.plus}
                source={require('../../../../assets/images/plus.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.total}>TOTAL: 549€</Text>
        </View>
        <View style={ styles.bottom}>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderText}>Confirm order</Text>
          </TouchableOpacity>
        </View>
			</View>
		);
  }
}
const styles = StyleSheet.create({
  bigCircle: {
		position: 'absolute',
		width: 622,
		height: 622,
		left: -104,
		top: -321,
		borderRadius: 311,
		backgroundColor: "#FCB79A"
  },
  topBar: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop:30
  },
  topText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#AA3C3B'
  },
  plusCircle: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#AA3C3B',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25
  },
  plus: {
    width: 23.17, 
    height: 23.17,
  },
  total: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#AA3C3B',
    paddingTop: 16
  },
  totalContainer: {
    height: 90, 
    justifyContent: 'center',
    marginTop: 25
  },
  orderButton: {
    width: this.width,
    height: 56,
    backgroundColor: '#AA3C3B',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF'
  },
  bottom: {
    justifyContent: 'flex-end',
    height: 56
  },
  priceTag: Platform.select({
    ios: {
      position: 'absolute',
      width: 70,
      height: 70,
      left: 267,
      top: 100,
      borderRadius: 38,
      backgroundColor: '#AA3C3B',
      shadowRadius: 4,
      shadowOffset: {height: 0, width: 4},
      shadowColor: 'rgba(91, 91, 91, 0.25)'
    },
    android: {
      position: 'absolute',
      width: 75,
      height: 75,
      left: 287,
      top: 100,
      borderRadius: 38,
      backgroundColor: '#AA3C3B',
      elevation: 4
    }
  }),
  priceText: Platform.select({
    ios: {
      paddingTop: 22,
      paddingLeft: 10,

      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
  
      color: '#FFFFFF',
    },
    android: {
      paddingTop: 22,
      paddingLeft: 10,

      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 22,
  
      color: '#FFFFFF',
    }
  }),
  textTag: {
    width: 127,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AA3C3B',
    shadowRadius: 4,
    shadowOffset: {height: 0, width: 4},
    shadowColor: 'rgba(91, 91, 91, 0.25)',
    elevation: 4,
    borderRadius: 13.5,
    marginBottom: 17
  },
  textTagText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',

    color: '#FFFFFF',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#282828'
  },
  valueContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 17
  },
  circle: {
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AA3C3B'
  },
  valueText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#979797'
  },
  description: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center',
    color: '#282828',
    width: 280
  }
});
