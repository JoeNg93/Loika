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
import { connect } from 'react-redux';

import SubscriptionSummary from '../../../../components/SubscriptionSummary';
import CancelConfirmModal from '../../../../components/CancelConfirmModal';
import AddressSummary from '../../../../components/AddressSummary';
import TotalComponent from '../../../../components/TotalComponent';
import commonStyles from '../../../../constants/commonStyles';
import {
  getNextDeliveryDate,
  getNextPaymentDate,
  parseDeliveryTime,
  formatDate,
} from '../../../../utils/dateTime';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import { setSelectedSubscription } from '../../../../actions/checkout';
import { cancelOrder } from '../../../../actions/order';

const width = Layout.window.width,
  horizontalPadding = 32,
  offset = 10;

class SubscriptionManagementScreen extends React.Component {
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
    cancelDialogVisible: false,
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
    return formatDate(nextDeliveryDate);
  };

  getOrderEndSubscriptionDate = orderDate => {
    let nextPaymentDate = getNextPaymentDate(orderDate);
    return formatDate(nextPaymentDate);
  };

  onPressCancelOrder = orderId => {
    this.props.cancelOrder(orderId);
    this.onPressCloseCancelDialogModal();
  };

  onPressOpenCancelDialogModal = () => {
    this.setState({ cancelDialogVisible: true });
  };

  onPressCloseCancelDialogModal = () => {
    this.setState({ cancelDialogVisible: false });
  };

  onPressSubscriptionDetails = subscription => {
    this.props.setSelectedSubscription(subscription);
    this.props.navigation.navigate('SubscriptionDetail');
  };

  onPressChangeShippingAddress = () => {
    this.props.navigation.navigate('ChangeShippingAddress');
  };

  onPressChangeDeliverySchedule = () => {
    this.props.navigation.navigate('ChangeDeliverySchedule');
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

  renderAddressSummary = () => {
    const {
      selectedOrder: { shippingAddress },
    } = this.props;
    return (
      <AddressSummary
        shippingAddress={{
          address: shippingAddress.address,
          postcode: shippingAddress.postcode,
          city: shippingAddress.city,
        }}
        name={shippingAddress.name}
        phoneNumber={shippingAddress.phoneNumber}
        hasSelectedButton={false}
        canEditAddress={false}
        containerWidth={width - horizontalPadding * 2 - offset}
      />
    );
  };

  render() {
    const { selectedOrder } = this.props;
    const orderIsActive = selectedOrder.cancelDate === null;
    return (
      <View style={styles.mainContainer}>
        {selectedOrder && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingRight: offset }}>
              <View style={styles.orderTitleContainer}>
                <Text style={styles.orderTitle}>
                  Order ID: #{selectedOrder.id.substring(0, 7)}
                </Text>
              </View>
              {/* Delivery Date - Payment Date Section */}
              <View style={styles.dateContainer}>
                <Text style={styles.textDefaultStyle}>Next Delivery Date:</Text>
                <Text style={[styles.textDefaultStyle, commonStyles.textBlack]}>
                  {this.getOrderNextDeliveryDate(selectedOrder)}
                </Text>
              </View>
              {orderIsActive ? (
                <View style={styles.dateContainer}>
                  <Text style={styles.textDefaultStyle}>
                    Next Payment Date:
                  </Text>
                  <Text
                    style={[styles.textDefaultStyle, commonStyles.textBlack]}
                  >
                    {this.getOrderEndSubscriptionDate(
                      selectedOrder.paymentDate
                    )}
                  </Text>
                </View>
              ) : (
                <Text style={styles.endSubscriptionText}>
                  *Your subscription will end on{' '}
                  {this.getOrderEndSubscriptionDate(selectedOrder.paymentDate)}
                </Text>
              )}
            </View>
            {/* Order Summary Section */}
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.textDefaultStyle}>
                  {'Subscriptions'.toUpperCase()}
                </Text>
                {orderIsActive && (
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
                    onPress={this.onPressOpenCancelDialogModal}
                  />
                )}
                <CancelConfirmModal
                  visible={this.state.cancelDialogVisible}
                  onPressCancelSubscription={() =>
                    this.onPressCancelOrder(selectedOrder.id)
                  }
                  onPressCloseModal={this.onPressCloseCancelDialogModal}
                  modalTitle={'Hold on!'}
                  modalTextContent={`Are you sure that you want to cancel all subscriptions? Your subscriptions will end on ${this.getOrderEndSubscriptionDate(
                    selectedOrder.paymentDate
                  )} and you will lose your favourite boxes!`}
                />
              </View>
              <View>{this.renderSubscriptionSummaryList()}</View>
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
                {orderIsActive && (
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
                {this.renderAddressSummary()}
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
                {orderIsActive && (
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
                      {`${selectedOrder.deliveryDayOfWeek}, around ${
                        selectedOrder.deliveryTime
                      }`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Total */}
            <View style={styles.totalPriceContainer}>
              <TotalComponent price={selectedOrder.total} />
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

const mapStateToProps = state => ({
  selectedOrder: state.order.selectedOrder,
});

export default connect(
  mapStateToProps,
  { setSelectedSubscription, cancelOrder }
)(SubscriptionManagementScreen);
