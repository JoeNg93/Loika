import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import SubscriptionSummary from '../../../../components/SubscriptionSummary';
import AddressSummary from '../../../../components/AddressSummary';
import TotalComponent from '../../../../components/TotalComponent';
import commonStyles from '../../../../constants/commonStyles';
import {
  getNextDeliveryDate,
  getNextPaymentDate,
  parseDeliveryTime,
} from '../../../../utils/dateTime';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

const width = Layout.window.width,
  horizontalPadding = 32,
  offset = 10,
  locale = 'fi-FI';

export default class SubscriptionManagementScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Subscriptions Management',
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
      isActive: false,
      subscriptions: [
        {
          id: 1,
          title: 'Mixed',
          weight: 5,
          price: 199,
          pricePerMeal: 3.4,
          isActive: false,
        },
        {
          id: 2,
          title: 'Vegan',
          isActive: false,
          weight: 5,
          price: 199,
          pricePerMeal: 3.4,
        },
      ],
      deliveryDayOfWeek: 'Tuesday',
      deliveryTime: '10:00-12:00',
      orderDate: '2019/02/02',
      shippingAddress: {
        name: 'Joe Nguyen',
        address: 'Ylioppilaantie 10 B 25',
        postCode: 90130,
        city: 'Oulu',
        phoneNumber: '+358469512914',
      },
      total: 388,
    },
  };

  getOrderNextDeliveryDate = order => {
    let nextDeliveryDate = getNextDeliveryDate(order.deliveryDayOfWeek),
      now = new Date();
    /* Check if next delivery date falls into today and already passes delivery time (means that subscription
    has already been delivered), then get another next delivery date */
    if (
      nextDeliveryDate.toDateString() === now.toDateString() &&
      now.getHours() > parseDeliveryTime(order.deliveryTime)
    ) {
      nextDeliveryDate = getNextDeliveryDate(order.deliveryDayOfWeek, 14);
    }
    return nextDeliveryDate && nextDeliveryDate.toLocaleDateString(locale);
  };

  getOrderEndSubscriptionDate = orderDate => {
    let nextPaymentDate = getNextPaymentDate(orderDate);
    return nextPaymentDate ? nextPaymentDate.toLocaleDateString(locale) : '';
  };

  onPressCancelAllSubscriptions = () => {};

  onPressCancelSingleSubscription = () => {};

  onPressSubscriptionDetails = () => {
    this.props.navigation.navigate('SubscriptionDetail');
  };

  onPressChangeShippingAddress = () => {
    this.props.navigation.navigate('ChangeShippingAddress');
  };

  onPressChangeDeliverySchedule = () => {
    this.props.navigation.navigate('ChangeDeliverySchedule');
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
          hasRemoveButton={subscription.isActive}
          onPressRemoveSubscription={this.onPressCancelSingleSubscription}
          containerWidth={width - horizontalPadding * 2 - offset}
        />
      </TouchableOpacity>
    ));
  };

  renderAddressSummary = shippingAddress => {
    const { address, postCode, city, name, phoneNumber } = shippingAddress;
    return (
      <AddressSummary
        shippingAddress={{ address, postCode, city }}
        name={name}
        phoneNumber={phoneNumber}
        hasSelectedButton={false}
        canEditAddress={false}
        containerWidth={width - horizontalPadding * 2 - offset}
      />
    );
  };

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
                <Text style={styles.textDefaultStyle}>Next Delivery Date:</Text>
                <Text style={[styles.textDefaultStyle, commonStyles.textBlack]}>
                  {this.getOrderNextDeliveryDate(this.state.fetchedOrder)}
                </Text>
              </View>
              {this.state.fetchedOrder.isActive ? (
                <View style={styles.dateContainer}>
                  <Text style={styles.textDefaultStyle}>
                    Next Payment Date:
                  </Text>
                  <Text
                    style={[styles.textDefaultStyle, commonStyles.textBlack]}
                  >
                    {this.getOrderEndSubscriptionDate(
                      this.state.fetchedOrder.orderDate
                    )}
                  </Text>
                </View>
              ) : (
                <Text style={styles.endSubscriptionText}>
                  *Your subscription will end on{' '}
                  {this.getOrderEndSubscriptionDate(
                    this.state.fetchedOrder.orderDate
                  )}
                </Text>
              )}
            </View>
            {/* Order Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.textDefaultStyle}>
                  {'Subscriptions'.toUpperCase()}
                </Text>
                {this.state.fetchedOrder.isActive && (
                  <Button
                    type={'clear'}
                    title={'Cancel subscriptions'}
                    icon={
                      <Icon
                        name={'chevron-right'}
                        size={16}
                        color={Colors.lightGrey}
                      />
                    }
                    iconRight={true}
                    titleStyle={[
                      styles.textDefaultStyle,
                      commonStyles.textLightGrey,
                      { paddingTop: 0 },
                    ]}
                    buttonStyle={{ alignItems: 'center', padding: 0 }}
                    onPress={this.onPressCancelAllSubscriptions}
                  />
                )}
              </View>
              <View>
                {this.state.fetchedOrder.subscriptions &&
                  this.renderSubscriptionSummaryList()}
              </View>
            </View>
            {/* Shipping Address Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <View>
                  <Text style={styles.textDefaultStyle}>
                    {'Shipping address'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.textDefaultStyle,
                      { fontSize: 10, marginTop: 6 },
                    ]}
                  >
                    (Changes are only possible for next order)
                  </Text>
                </View>
                {this.state.fetchedOrder.isActive && (
                  <Button
                    type={'clear'}
                    title={'Change'}
                    icon={
                      <Icon
                        name={'chevron-right'}
                        size={14}
                        color={Colors.macaroniCheese}
                      />
                    }
                    iconRight={true}
                    titleStyle={[
                      styles.textDefaultStyle,
                      commonStyles.textMacaroniCheese,
                      { paddingTop: 0 },
                    ]}
                    buttonStyle={{ alignItems: 'center', padding: 0 }}
                    onPress={this.onPressChangeShippingAddress}
                  />
                )}
              </View>
              <View style={styles.summaryBox}>
                {this.state.fetchedOrder.shippingAddress &&
                  this.renderAddressSummary(
                    this.state.fetchedOrder.shippingAddress
                  )}
              </View>
            </View>
            {/* Delivery Schedule Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <View>
                  <Text style={styles.textDefaultStyle}>
                    {'Delivery schedule'.toUpperCase()}
                  </Text>
                  <Text
                    style={[
                      styles.textDefaultStyle,
                      { fontSize: 10, marginTop: 6 },
                    ]}
                  >
                    (Changes are only possible for next order)
                  </Text>
                </View>
                {this.state.fetchedOrder.isActive && (
                  <Button
                    type={'clear'}
                    title={'Change'}
                    icon={
                      <Icon
                        name={'chevron-right'}
                        size={14}
                        color={Colors.macaroniCheese}
                      />
                    }
                    iconRight={true}
                    titleStyle={[
                      styles.textDefaultStyle,
                      commonStyles.textMacaroniCheese,
                      { paddingTop: 0 },
                    ]}
                    buttonStyle={{ padding: 0 }}
                    onPress={this.onPressChangeDeliverySchedule}
                  />
                )}
              </View>
              <View style={styles.summaryBox}>
                <View style={styles.deliveryScheduleSummaryContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name="date-range"
                      color={Colors.mediumCarmine}
                      size={14}
                    />
                    <Text style={styles.deliveryScheduleText}>
                      {`${this.state.fetchedOrder.deliveryDayOfWeek}, around ${
                        this.state.fetchedOrder.deliveryTime
                      }`}
                    </Text>
                  </View>
                </View>
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
  textDefaultStyle: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 12,
  },
  endSubscriptionText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textGrey,
    fontSize: 10,
    marginTop: 22,
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
  summaryBox: {
    marginTop: 20,
  },
  deliveryScheduleSummaryContainer: {
    width: width - horizontalPadding * 2 - offset - 6,
    height: 45,
    borderRadius: 6,

    borderWidth: 1,
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  deliveryScheduleText: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.textBlack,
    fontSize: 12,
    marginLeft: 8,
  },
  totalPriceContainer: {
    marginVertical: 61,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
