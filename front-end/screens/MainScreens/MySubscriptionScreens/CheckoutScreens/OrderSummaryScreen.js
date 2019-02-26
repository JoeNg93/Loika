import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import commonStyles from '../../../../constants/commonStyles';
import Colors from '../../../../constants/Colors';
import CheckoutStepProgress from '../../../../components/CheckoutStepProgress';
import ShippedToSummary from '../../../../components/ShippedToSummary';
import SubscriptionSummary from '../../../../components/SubscriptionSummary';
import TotalComponent from '../../../../components/TotalComponent';
import PaymentMethodModal from '../../../../components/PaymentMethodModal';
import Layout from '../../../../constants/Layout';
import { removeSubscriptionFromCart } from '../../../../actions/checkout';
import { createOrder } from '../../../../actions/user';

const width = Layout.window.width;

class OrderSummaryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Order summary',
    headerBackTitle: null,
    headerTransparent: true,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableHighlight style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight style={{ marginRight: 20 }}>
        <Icon name={'shopping-basket'} size={22} color={Colors.mediumCarmine} />
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
    paymentModalVisible: false,
    payNowButtonEnabled: true,
    payNowButtonTitle: 'Pay now',
  };

  getTotalPrice = () => {
    return this.props.shoppingCart.reduce(
      (prev, curr) => prev + curr.totalPrice,
      0
    );
  };

  onPressChangeDeliverySchedule = () => {
    this.props.navigation.navigate('DeliveryScheduleCheckout');
  };

  onPressPayNow = async () => {
    if (this.props.user.paymentCustomerId) {
      // User already has payment info
      this.setState({
        payNowButtonEnabled: false,
        payNowButtonTitle: 'Processing...',
      });
      const {
        shoppingCart,
        deliveryDayOfWeek,
        deliveryTime,
        billingAddress,
        shippingAddress,
      } = this.props;
      const subscriptionIds = shoppingCart.map(s => s.id);
      const billingAddressId = billingAddress.id;
      const shippingAddressId = shippingAddress.id;
      const total = this.getTotalPrice();
      await this.props.createOrder({
        billingAddressId,
        shippingAddressId,
        deliveryDayOfWeek,
        deliveryTime,
        subscriptionIds,
        total,
      });
      this.props.navigation.navigate('Home');
    } else {
      // User doesnt have payment info yet
      this.setState({ paymentModalVisible: true });
    }
  };

  openPaymentModal = () => {
    this.setState({ paymentModalVisible: true });
  };

  closePaymentModal = () => {
    this.setState({ paymentModalVisible: false });
  };

  onPressRemoveSubscription = subscriptionId => {
    if (this.props.shoppingCart.length === 1) {
      this.props.removeSubscriptionFromCart(subscriptionId);
      this.props.navigation.navigate('AddSubscription');
      return;
    }

    this.props.removeSubscriptionFromCart(subscriptionId);
  };

  renderOrderedSubscriptionsList() {
    return this.props.shoppingCart.map((subscription, idx) => (
      <View key={subscription.id} style={styles.subscriptionSummaryContainer}>
        <SubscriptionSummary
          id={subscription.id}
          boxName={subscription.title}
          boxWeight={subscription.size}
          boxPrice={subscription.totalPrice}
          pricePerMeal={subscription.mealPrice}
          hasRemoveButton
          onPressRemoveSubscription={this.onPressRemoveSubscription}
          modalTitle={'Remove subscription?'}
          modalTextContent={
            'Are you sure that you want to remove this subscription from cart?'
          }
        />
      </View>
    ));
  }

  renderShippedToAddress() {
    const {
      name,
      postcode,
      city,
      address,
      phoneNumber,
    } = this.props.shippingAddress;
    const { deliveryTime, deliveryDayOfWeek } = this.props;

    return (
      <View style={styles.shippedToContainer}>
        <ShippedToSummary
          name={name}
          shippingAddress={{ city, postcode: postcode, address }}
          phoneNumber={phoneNumber}
          deliveryDayOfWeek={deliveryDayOfWeek}
          deliveryTime={deliveryTime}
          hasChangeButton
          onPressChangeButton={this.onPressChangeDeliverySchedule}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 30 }}
        >
          <CheckoutStepProgress currentStep="3" />
          <View style={styles.orderedSubscriptionsContainer}>
            <Text style={styles.titleText}>Subscriptions Ordered</Text>
            {this.renderOrderedSubscriptionsList()}
          </View>
          <View style={styles.shippingInfoContainer}>
            <Text style={styles.titleText}>Shipped To</Text>
            {this.renderShippedToAddress()}
          </View>
          <View style={styles.totalPriceContainer}>
            <TotalComponent price={this.getTotalPrice()} />
          </View>
          <View style={styles.spaceHolderContainer} />
        </ScrollView>
        <View style={styles.payButtonContainer}>
          <Button
            title={this.state.payNowButtonTitle}
            titleStyle={styles.mainButtonTitle}
            buttonStyle={[
              styles.mainButtonStyle,
              this.state.payNowButtonEnabled
                ? styles.activeButton
                : styles.disabledButton,
            ]}
            onPress={this.onPressPayNow}
          />
        </View>
        <PaymentMethodModal
          visible={this.state.paymentModalVisible}
          onPressCloseModal={this.closePaymentModal}
          onFinishPayment={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 70,
  },
  orderedSubscriptionsContainer: {
    marginTop: 36,
  },
  shippingInfoContainer: {
    marginTop: 36,
  },
  totalPriceContainer: {
    marginVertical: 61,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textGrey,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  subscriptionSummaryContainer: {
    marginTop: 16,
  },
  shippedToContainer: {
    marginTop: 12,
  },
  mainButtonStyle: {
    backgroundColor: Colors.mediumCarmine,
    height: 56,
    width: width,
    borderRadius: 0,
  },
  mainButtonTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textWhite,
    fontSize: 20,
  },
  payButtonContainer: {
    position: 'absolute',
    bottom: 0,
  },
  spaceHolderContainer: {
    marginTop: 112,
  },
  activeButton: {
    backgroundColor: Colors.mediumCarmine,
  },
  disabledButton: {
    backgroundColor: Colors.darkGrey,
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
  shoppingCart: state.checkout.shoppingCart,
  shippingAddress: state.checkout.shippingAddress,
  billingAddress: state.checkout.billingAddress,
  deliveryDayOfWeek: state.checkout.deliveryDayOfWeek,
  deliveryTime: state.checkout.deliveryTime,
});

export default connect(
  mapStateToProps,
  { removeSubscriptionFromCart, createOrder }
)(OrderSummaryScreen);
