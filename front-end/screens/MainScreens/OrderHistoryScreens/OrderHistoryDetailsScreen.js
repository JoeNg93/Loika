import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import SubscriptionSummary from '../../../components/SubscriptionSummary';
import ShippedToSummary from '../../../components/ShippedToSummary';
import TotalComponent from '../../../components/TotalComponent';
import commonStyles from '../../../constants/commonStyles';
import { getDeliveryDatesPerMonth, formatDate } from '../../../utils/dateTime';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

const width = Layout.window.width,
  horizontalPadding = 32,
  offset = 10,
  locale = 'fi-FI';

export default class OrderHistoryDetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Order details',
    headerBackTitle: null,
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
    // Fetch order according to order ID send from MySubscriptionScreen
    fetchedOrder: {
      id: 123,
      isActive: true,
      subscriptions: [
        {
          id: 1,
          title: 'Mixed',
          weight: 5,
          price: 199,
          pricePerMeal: 3.4,
          isActive: true,
        },
        {
          id: 2,
          title: 'Vegan',
          isActive: true,
          weight: 5,
          price: 199,
          pricePerMeal: 3.4,
        },
      ],
      name: 'Joe Nguyen',
      shippingAddress: {
        address: 'Ylioppilaantie 10 B 25',
        postcode: 90130,
        city: 'Oulu',
      },
      phoneNumber: '+358469512914',
      deliveryDayOfWeek: 'Tuesday',
      deliveryTime: '10:00-12:00',
      orderDate: '2019/02/02',
      total: 388,
    },
  };

  renderOrderDate = orderDate => {
    if (!isNaN(Date.parse(orderDate))) {
      let date = new Date(orderDate);
      return formatDate(date);
    }
  };

  renderDeliveryDatesPerMonth = (orderDate, dayOfWeek) => {
    let deliveryDatesPerMonth =
      getDeliveryDatesPerMonth(orderDate, dayOfWeek) || [];
    return deliveryDatesPerMonth.map((date, index) => (
      <View key={index} style={{ marginTop: 10 }}>
        <Text
          style={[
            styles.textDefaultStyle,
            index === deliveryDatesPerMonth.length - 1 &&
              commonStyles.textMediumCarmine,
          ]}
        >
          {formatDate(date)}
        </Text>
      </View>
    ));
  };

  onPressSubscriptionDetails = () => {
    this.props.navigation.navigate('SubscriptionDetail');
  };

  renderSubscriptionSummaryList = () => {
    return this.state.fetchedOrder.subscriptions.map((subscription, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.sectionSummaryContainer, { alignItems: 'center' }]}
        onPress={this.onPressSubscriptionDetails}
      >
        <SubscriptionSummary
          boxName={subscription.title}
          boxWeight={subscription.weight}
          boxPrice={subscription.price}
          pricePerMeal={subscription.pricePerMeal}
          hasRemoveButton={false}
          containerWidth={width - horizontalPadding * 2 - offset}
        />
      </TouchableOpacity>
    ));
  };

  renderShippedToAddress() {
    const {
      name,
      shippingAddress,
      phoneNumber,
      deliveryTime,
      deliveryDayOfWeek,
    } = this.state.fetchedOrder;
    return (
      <ShippedToSummary
        name={name}
        shippingAddress={shippingAddress}
        phoneNumber={phoneNumber}
        deliveryDayOfWeek={deliveryDayOfWeek}
        deliveryTime={deliveryTime}
        hasChangeButton={false}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.fetchedOrder && (
          <ScrollView>
            <View style={{ paddingRight: offset }}>
              <View style={styles.orderTitleContainer}>
                <Text style={styles.orderTitle}>
                  Order ID: #{this.state.fetchedOrder.id}
                </Text>
              </View>
              {/* Delivery Date - Payment Date Section */}
              <View style={styles.dateContainer}>
                <Text style={styles.textDefaultStyle}>Order Date:</Text>
                <Text style={[styles.textDefaultStyle, commonStyles.textBlack]}>
                  {this.renderOrderDate(this.state.fetchedOrder.orderDate)}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.textDefaultStyle}>Delivery Date:</Text>
                <View style={styles.deliveryDateContainer}>
                  {this.renderDeliveryDatesPerMonth(
                    this.state.fetchedOrder.orderDate,
                    this.state.fetchedOrder.deliveryDayOfWeek
                  )}
                </View>
              </View>
            </View>
            {/* Order Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.textDefaultStyle}>
                  {'Subscriptions'.toUpperCase()}
                </Text>
              </View>
              <View>
                {this.state.fetchedOrder.subscriptions &&
                  this.renderSubscriptionSummaryList()}
              </View>
            </View>
            {/* Shipping Address and Delivery Schedule Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.textDefaultStyle}>
                  {'Shipped to'.toUpperCase()}
                </Text>
              </View>
              <View style={styles.shippedToContainer}>
                {this.renderShippedToAddress()}
              </View>
            </View>
            {/* Total */}
            <View style={styles.totalPriceContainer}>
              <TotalComponent price={this.state.fetchedOrder.total} />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    marginTop: 90,
    paddingHorizontal: horizontalPadding,
  },
  orderTitleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGrey,
    paddingBottom: 8,
  },
  orderTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textMediumCarmine,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deliveryDateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  textDefaultStyle: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingRight: offset,
  },
  sectionSummaryContainer: {
    marginTop: 20,
  },
  shippedToContainer: {
    paddingHorizontal: 6,
    marginTop: 20,
  },
  totalPriceContainer: {
    marginVertical: 61,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
