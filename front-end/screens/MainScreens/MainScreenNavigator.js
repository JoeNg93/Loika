import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';

import MySubscriptionScreen from './MySubscriptionScreens/MySubscriptionScreen';
import SubscriptionSelectionScreen from './MySubscriptionScreens/AddSubscriptionScreens/SubscriptionSelectionScreen';

import OrderHistoryScreen from './OrderHistoryScreens/OrderHistoryScreen';
import UserProfileScreen from './UserProfileScreens/UserProfileScreen';
import SubscriptionManagementScreen from './MySubscriptionScreens/SubscriptionManagementScreens/SubscriptionManagementScreen';
import ChangeDeliveryScheduleScreen from './MySubscriptionScreens/SubscriptionManagementScreens/ChangeDeliveryScheduleScreen';
import SubscriptionDetailScreen from './MySubscriptionScreens/AddSubscriptionScreens/SubscriptionDetailScreen';
import ChangeShippingAddressScreen from './MySubscriptionScreens/SubscriptionManagementScreens/ChangeShippingAddressScreen';
import ShippingAddressCheckoutScreen from './MySubscriptionScreens/CheckoutScreens/ShippingAddressCheckoutScreen';
import DeliveryScheduleCheckoutScreen from './MySubscriptionScreens/CheckoutScreens/DeliveryScheduleCheckoutScreen';
import OrderSummaryScreen from './MySubscriptionScreens/CheckoutScreens/OrderSummaryScreen';

const MySubscriptionStack = createStackNavigator(
  {
    Home: MySubscriptionScreen,
    AddSubscription: SubscriptionSelectionScreen,
    SubscriptionManagement: SubscriptionManagementScreen,
    ChangeDeliverySchedule: ChangeDeliveryScheduleScreen,
    ChangeShippingAddress: ChangeShippingAddressScreen,
    SubscriptionDetail: SubscriptionDetailScreen,
    ShippingAddressCheckout: ShippingAddressCheckoutScreen,
    DeliveryScheduleCheckout: DeliveryScheduleCheckoutScreen,
    OrderSummary: OrderSummaryScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

MySubscriptionStack.navigationOptions = ({ navigation }) => {
  const tabBarLabel = 'Subscriptions';
  const tabBarIcon = ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  );
  const tabBarVisible = navigation.state.index === 0 ? true : false;

  return { tabBarLabel, tabBarIcon, tabBarVisible };
};

const OrderHistoryStack = createStackNavigator({
  Home: OrderHistoryScreen,
});

OrderHistoryStack.navigationOptions = {
  tabBarLabel: 'Order History',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const UserProfileStack = createStackNavigator({
  Home: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: 'User Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  MySubscriptionStack,
  OrderHistoryStack,
  UserProfileStack,
});
