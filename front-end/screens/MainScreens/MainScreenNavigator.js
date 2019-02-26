import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Colors from '../../constants/Colors';
import commonStyles from '../../constants/commonStyles';

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
import OrderHistoryDetailsScreen from './OrderHistoryScreens/OrderHistoryDetailsScreen';
import OrderSuccessScreen from './MySubscriptionScreens/CheckoutScreens/OrderSuccessScreen';
import OrderErrorScreen from './MySubscriptionScreens/CheckoutScreens/OrderErrorScreen';

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
    OrderSuccess: OrderSuccessScreen,
    OrderError: OrderErrorScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

MySubscriptionStack.navigationOptions = ({ navigation }) => {
  const tabBarLabel = 'Subscriptions';
  const tabBarIcon = ({ focused }) => (
    <Icon
      type="material-community"
      name="shopping"
      size={24}
      color={focused ? Colors.mediumCarmine : Colors.lightGrey}
    />
  );
  const tabBarVisible = navigation.state.index === 0 ? true : false;

  return { tabBarLabel, tabBarIcon, tabBarVisible };
};

const OrderHistoryStack = createStackNavigator({
  Home: OrderHistoryScreen,
  SubscriptionDetail: SubscriptionDetailScreen,
  OrderHistoryDetails: OrderHistoryDetailsScreen,
});

OrderHistoryStack.navigationOptions = {
  tabBarLabel: 'Order History',
  tabBarIcon: ({ focused }) => (
    <Icon
      type="material-community"
      name="clipboard-outline"
      size={27}
      color={focused ? Colors.mediumCarmine : Colors.lightGrey}
    />
  ),
};

const UserProfileStack = createStackNavigator({
  Home: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: 'User Profile',
  tabBarIcon: ({ focused }) => (
    <Icon
      name={'person'}
      size={27}
      color={focused ? Colors.mediumCarmine : Colors.lightGrey}
    />
  ),
};

export default createBottomTabNavigator(
  {
    MySubscriptionStack,
    OrderHistoryStack,
    UserProfileStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: Colors.mediumCarmine,
        inactiveTintColor: Colors.lightGrey,
        // Style for each label
        labelStyle: [commonStyles.fontRalewayMedium, { fontSize: 10 }],
        // Tab bar style
        style: {
          height: 56,
          paddingTop: 6,
          paddingBottom: 3,
        },
      },
    },
  }
);
