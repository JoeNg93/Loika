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
import { connect } from 'react-redux';

import SubscriptionSummary from '../../../components/SubscriptionSummary';
import ShippedToSummary from '../../../components/ShippedToSummary';
import TotalComponent from '../../../components/TotalComponent';
import commonStyles from '../../../constants/commonStyles';
import { getDeliveryDatesPerMonth, formatDate } from '../../../utils/dateTime';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import { setSelectedSubscription } from '../../../actions/checkout';

const width = Layout.window.width,
  horizontalPadding = 32,
  offset = 10,
  locale = 'fi-FI';

class OrderHistoryDetailsScreen extends React.Component {
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

  onPressSubscriptionDetails = subscription => {
    this.props.setSelectedSubscription(subscription);
    this.props.navigation.navigate('SubscriptionDetail');
  };

  renderSubscriptionSummaryList = () => {
    const { selectedOrder } = this.props;
    return selectedOrder.items.map((subscription, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.sectionSummaryContainer, { alignItems: 'center' }]}
        onPress={() => this.onPressSubscriptionDetails(subscription)}
      >
        <SubscriptionSummary
          boxName={subscription.title}
          boxWeight={subscription.size}
          boxPrice={subscription.totalPrice}
          pricePerMeal={subscription.mealPrice}
          hasRemoveButton={false}
          containerWidth={width - horizontalPadding * 2 - offset}
        />
      </TouchableOpacity>
    ));
  };

  renderShippedToAddress() {
    const {
      selectedOrder: { shippingAddress, deliveryDayOfWeek, deliveryTime },
    } = this.props;
    return (
      <ShippedToSummary
        name={shippingAddress.name}
        shippingAddress={{
          address: shippingAddress.address,
          postcode: shippingAddress.postcode,
          city: shippingAddress.city,
        }}
        phoneNumber={shippingAddress.phoneNumber}
        deliveryDayOfWeek={deliveryDayOfWeek}
        deliveryTime={deliveryTime}
        hasChangeButton={false}
      />
    );
  }

  render() {
    const { selectedOrder } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingRight: offset }}>
            <View style={styles.orderTitleContainer}>
              <Text style={styles.orderTitle}>
                Order ID: #{selectedOrder.id.substring(0, 7)}
              </Text>
            </View>
            {/* Delivery Date - Payment Date Section */}
            <View style={styles.dateContainer}>
              <Text style={styles.textDefaultStyle}>Order Date:</Text>
              <Text style={[styles.textDefaultStyle, commonStyles.textBlack]}>
                {this.renderOrderDate(selectedOrder.paymentDate)}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.textDefaultStyle}>Delivery Date:</Text>
              <View style={styles.deliveryDateContainer}>
                {this.renderDeliveryDatesPerMonth(
                  selectedOrder.paymentDate,
                  selectedOrder.deliveryDayOfWeek
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
            <View>{this.renderSubscriptionSummaryList()}</View>
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
            <TotalComponent price={selectedOrder.total} />
          </View>
        </ScrollView>
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

const mapStateToProps = state => ({
  selectedOrder: state.order.selectedOrder,
});

export default connect(
  mapStateToProps,
  { setSelectedSubscription }
)(OrderHistoryDetailsScreen);
