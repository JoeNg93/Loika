import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

import commonStyles from '../../../../constants/commonStyles';
import Colors from '../../../../constants/Colors';
import CheckoutStepProgress from '../../../../components/CheckoutStepProgress';
import ShippedToSummary from '../../../../components/ShippedToSummary';
import SubscriptionSummary from '../../../../components/SubscriptionSummary';
import TotalComponent from '../../../../components/TotalComponent';
import Layout from '../../../../constants/Layout';

const width = Layout.window.width;

export default class OrderSummaryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Order summary',
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
    orderedSubscriptions: [
      {
        name: 'Vegan',
        weight: 5,
        price: 199,
        pricePerMeal: 3.4,
      },
      {
        name: 'Mixed',
        weight: 5,
        price: 199,
        pricePerMeal: 3.4,
      },
    ],
    shippingAddress: {
      name: 'Joe Nguyen',
      address: 'Ylioppilaantie 10 B 25, 90130, Oulu',
      phoneNumber: '+358469512914',
      deliveryDayOfWeek: 'Monday',
      deliveryTime: '10:00 - 12:00',
    },
  };

  renderOrderedSubscriptionsList() {
    return this.state.orderedSubscriptions.map((subscription, idx) => (
      <View key={idx} style={styles.subscriptionSummaryContainer}>
        <SubscriptionSummary
          boxName={subscription.name}
          boxWeight={subscription.weight}
          boxPrice={subscription.price}
          pricePerMeal={subscription.pricePerMeal}
          hasRemoveButton
          onPressRemoveSubscription={() => console.log('Remove subscription')}
        />
      </View>
    ));
  }

  renderShippedToAddress() {
    const {
      name,
      address,
      phoneNumber,
      deliveryTime,
      deliveryDayOfWeek,
    } = this.state.shippingAddress;
    return (
      <View style={styles.shippedToContainer}>
        <ShippedToSummary
          name={name}
          address={address}
          phoneNumber={phoneNumber}
          deliveryDayOfWeek={deliveryDayOfWeek}
          deliveryTime={deliveryTime}
          hasChangeButton
          onPressChangeButton={() => console.log('Change address')}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{ paddingHorizontal: 30 }}>
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
            <TotalComponent price={388} />
          </View>
          <View style={styles.spaceHolderContainer} />
        </ScrollView>
        <View style={styles.payButtonContainer}>
          <Button
            title="Pay now"
            titleStyle={styles.mainButtonTitle}
            buttonStyle={styles.mainButtonStyle}
            onPress={() => console.log('Pay Now')}
          />
        </View>
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
});
