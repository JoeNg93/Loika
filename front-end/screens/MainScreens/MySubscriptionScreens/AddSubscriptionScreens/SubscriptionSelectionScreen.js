import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  Platform,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Icon } from 'react-native-elements';
import Carousel from './Carousel';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';

const boxes = [
  {
    title: 'Mixed Box',
    price: 199,
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Best seller',
    image: require('../../../../assets/images/mixed.png'),
  },
  {
    title: 'Vegan Box',
    price: 299,
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Vegan',
    image: require('../../../../assets/images/vegan.png'),
  },
  {
    title: 'Meat Box',
    price: 499,
    size: '5 kg/box',
    divprice: '3-4€/meal',
    description:
      'Best of both worl. Can include beef, pork , chicken, milk, eggs, potatoes, brocoli, cabbage... Check to see more details.',
    tag: 'Meat',
    image: require('../../../../assets/images/meat.png'),
  },
];

export default class SubscriptionSelectionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Choose your subscription',
      headerTransparent: true,
      headerTintColor: Colors.mediumCarmine,
      headerBackImage: (
        <TouchableHighlight style={{ marginLeft: 20 }}>
          <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
        </TouchableHighlight>
      ),
      headerRight: (
        <TouchableHighlight
          style={{ marginRight: 20 }}
          onPress={navigation.getParam('setCartVisible')}
        >
          <Icon
            name={'shopping-basket'}
            size={22}
            color={Colors.mediumCarmine}
          />
          <View
            style={[
              {
                width: 11,
                height: 11,
                left: 10,
                top: -18,
                backgroundColor: '#FFFFFF',
                borderRadius: 5.5,
              },
              {
                opacity: navigation.getParam('opacity')
                  ? navigation.getParam('opacity')
                  : 0,
              },
            ]}
          >
            <Text
              style={{
                ...commonStyles.fontRalewayBold,
                fontWeight: '600',
                fontSize: 9,
                textAlign: 'center',
                ...commonStyles.textMediumCarmine,
              }}
            >
              {navigation.getParam('items')}
            </Text>
          </View>
        </TouchableHighlight>
      ),
      headerStyle: {
        ...commonStyles.fontRalewayBold,
        fontSize: 18,
        marginTop: 8,
      },
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ setCartVisible: this._setCartVisible });
    this.props.navigation.setParams({ items: this.state.indexInCart.length });
    this.props.navigation.setParams({ opacity: 0 });
  }

  state = {
    currentIndex: 0,
    shoppingCart: [],
    indexInCart: [],
    totalPrice: 0,
    cartVisible: false,
  };

  _setCartVisible = () => {
    if (this.state.cartVisible == false) {
      this.setState({ cartVisible: true });
    } else {
      this.setState({ cartVisible: false });
    }
  };

  onPressPlus = () => {
    var indexInCart = this.state.indexInCart;

    if (indexInCart.indexOf(this.state.currentIndex) == -1) {
      let total = this.state.totalPrice;
      total += boxes[this.state.currentIndex].price;
      this.setState(() => ({ totalPrice: total }));
      indexArray = this.state.indexInCart;
      indexArray.push(this.state.currentIndex);
      this.setState(() => ({ indexInCart: indexInCart }));
    } else {
      let total = this.state.totalPrice;
      total -= boxes[this.state.currentIndex].price;
      this.setState(() => ({ totalPrice: total }));
      indexArray = this.state.indexInCart;
      let i = indexArray.indexOf(this.state.currentIndex);
      indexArray.splice(i, 1);
      this.setState(() => ({ indexInCart: indexInCart }));
    }
    this.props.navigation.setParams({ items: this.state.indexInCart.length });
    if (this.state.indexInCart.length != 0) {
      this.props.navigation.setParams({ opacity: 1 });
    } else {
      this.props.navigation.setParams({ opacity: 0 });
    }
  };

  displayAddToCartButton = () => {
    if (this.state.indexInCart.indexOf(this.state.currentIndex) == -1) {
      return (
        <View style={styles.plusCircle}>
          <Icon color={Colors.mediumCarmine} size={23} name={'add'} />
        </View>
      );
    } else {
      return (
        <View style={styles.checkCircle}>
          <Icon color={Colors.white} size={23} name={'done'} />
        </View>
      );
    }
  };

  displayCartItems = () => {
    let indexArray = this.state.indexInCart;
    let i;
    let items = [];
    if (indexArray.length != 0) {
      items.push(
        <View
          key="hr"
          style={{
            borderBottomColor: '#E1E1E1',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        />
      );
      for (i = 0; i < indexArray.length; ++i) {
        items.push(
          <View key={i}>
            <View style={styles.cartItem}>
              <Text style={styles.textInCart}>{boxes[i].title}</Text>
              <Text style={styles.cartSize}>{boxes[i].size}</Text>
              <Text style={[styles.cartPrice, { top: -45 }]}>
                {boxes[i].price} €
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#E1E1E1',
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            />
          </View>
        );
      }
      items.push(
        <View key="total" style={{ marginTop: 24, marginBottom: 24 }}>
          <Text style={styles.textInCart}>Total</Text>
          <Text style={styles.cartPrice}>{this.state.totalPrice} €</Text>
          <Text style={styles.cartTax}>*Total included VAT</Text>
        </View>
      );
      return items;
    } else {
      return <Text style={styles.textInCart}>No items in cart</Text>;
    }
  };

  clearCart = () => {
    this.setState(() => ({ indexInCart: [] }));
    this.props.navigation.setParams({ items: this.state.indexInCart.length });
    this.props.navigation.setParams({ opacity: 0 });
  };

  render() {
    const { width } = Dimensions.get('window');
    const contentOffset = (width - Carousel.WIDTH) / 2;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ height: 60 }}>
          <View style={styles.bigCircle} />

          <View style={styles.priceTag}>
            <Text style={styles.priceText}>
              {boxes[this.state.currentIndex].price} €
            </Text>
          </View>
        </View>
        <View style={{ height: 305 }}>
          <SideSwipe
            shouldCapture={() => true}
            extractKey={item => item.title}
            itemWidth={Carousel.WIDTH}
            threshold={5}
            style={{ width }}
            contentContainerStyle={{
              paddingTop: 20,
              overflow: 'visible',
              marginBottom: 10,
            }}
            data={boxes}
            contentOffset={contentOffset}
            onIndexChange={index =>
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
        <Animated.View style={styles.textContainer}>
          <View style={styles.textTag}>
            <Text style={styles.textTagText}>
              {boxes[this.state.currentIndex].tag}
            </Text>
          </View>
          <Text style={styles.title}>
            {boxes[this.state.currentIndex].title}
          </Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>
              {boxes[this.state.currentIndex].size}
            </Text>
            <View style={styles.circle} />
            <Text style={styles.valueText}>
              {boxes[this.state.currentIndex].divprice}
            </Text>
          </View>
          <Text style={styles.description}>
            {boxes[this.state.currentIndex].description}
          </Text>
        </Animated.View>
        <View style={styles.totalContainer}>
          <TouchableHighlight
            onPress={this.onPressPlus}
            style={{ alignItems: 'center' }}
          >
            {this.displayAddToCartButton()}
          </TouchableHighlight>
          <Text style={styles.total}>TOTAL: {this.state.totalPrice}€</Text>
        </View>
        <View style={styles.bottom}>
          <TouchableHighlight style={styles.orderButton}>
            <Text style={styles.orderText}>Confirm order</Text>
          </TouchableHighlight>
        </View>
        {/* Shopping cart */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.cartVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.cartModal}>
            <TouchableHighlight
              style={{ flex: 1 }}
              onPress={() => {
                this._setCartVisible();
              }}
            />
            <View style={{ bottom: 0 }}>
              <ScrollView style={styles.cart}>
                <View>
                  <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <Icon
                      style={{ width: 29, height: 26, marginRight: 13 }}
                      source={require('../../../../assets/images/cart.png')}
                    />
                    <Text style={styles.textInCart}>My cart</Text>
                  </View>
                  <TouchableHighlight
                    style={styles.clearButton}
                    onPress={() => {
                      this.clearCart();
                    }}
                  >
                    <Text style={styles.clearText}>Clear</Text>
                  </TouchableHighlight>
                </View>
                <View>{this.displayCartItems()}</View>
              </ScrollView>
              <View style={styles.bottom}>
                <TouchableHighlight style={styles.orderButton}>
                  <Text style={styles.orderText}>Confirm order</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
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
    backgroundColor: Colors.macaroniCheese,
  },
  cart: {
    backgroundColor: Colors.white,
    padding: 20,
    height: 369,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    overflow: 'visible',
  },
  cartModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  clearButton: {
    width: 62,
    height: 22,
    left: 336,
    top: -35,
    borderWidth: 1,
    borderColor: Colors.macaroniCheese,
    borderRadius: 13.5,
    marginBottom: 16,
  },
  cartItem: {
    justifyContent: 'center',
  },
  cartPrice: {
    top: -25,
    ...commonStyles.fontRalewayBold,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    color: Colors.macaroniCheese,
  },
  cartTax: {
    top: -20,
    ...commonStyles.fontRalewayBold,
    fontWeight: '500',
    fontSize: 10,
    color: Colors.black,
    textAlign: 'right',
  },
  cartSize: {
    ...commonStyles.fontRalewayBold,
    fontWeight: '600',
    fontSize: 12,
    color: Colors.darkGrey,
  },
  clearText: {
    ...commonStyles.fontRalewayBold,
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    color: Colors.macaroniCheese,
  },
  topBar: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  topText: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.mediumCarmine,
  },
  checkCircle: {
    width: 48,
    height: 48,
    backgroundColor: Colors.mediumCarmine,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  plusCircle: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: Colors.mediumCarmine,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  textInCart: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textInCart: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
  },
  total: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.mediumCarmine,
    paddingTop: 16,
  },
  totalContainer: {
    height: 90,
    justifyContent: 'center',
    marginTop: 25,
  },
  orderButton: {
    width: this.width,
    height: 56,
    backgroundColor: Colors.mediumCarmine,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    ...commonStyles.textWhite,
  },
  bottom: {
    justifyContent: 'flex-end',
    height: 56,
  },
  priceTag: Platform.select({
    ios: {
      position: 'absolute',
      width: 70,
      height: 70,
      left: 267,
      top: 100,
      borderRadius: 38,
      backgroundColor: Colors.mediumCarmine,
      shadowRadius: 4,
      shadowOffset: { height: 0, width: 4 },
      shadowColor: 'rgba(91, 91, 91, 0.25)',
    },
    android: {
      position: 'absolute',
      width: 75,
      height: 75,
      left: 287,
      top: 100,
      borderRadius: 38,
      backgroundColor: Colors.mediumCarmine,
      elevation: 4,
    },
  }),
  priceText: Platform.select({
    ios: {
      paddingTop: 22,
      paddingLeft: 10,
      ...commonStyles.fontRalewayBold,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#FFFFFF',
    },
    android: {
      paddingTop: 22,
      paddingLeft: 10,
      ...commonStyles.fontRalewayBold,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 22,
      color: '#FFFFFF',
    },
  }),
  textTag: {
    width: 127,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mediumCarmine,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 4 },
    shadowColor: 'rgba(91, 91, 91, 0.25)',
    elevation: 4,
    borderRadius: 13.5,
    marginBottom: 17,
  },
  textTagText: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  title: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.black,
  },
  valueContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 17,
  },
  circle: {
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.mediumCarmine,
  },
  valueText: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  description: {
    ...commonStyles.fontRalewayBold,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.black,
    width: 280,
  },
});
