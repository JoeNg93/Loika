import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Colors from '../../constants/Colors';

import TabBarIcon from '../../components/TabBarIcon';

import MySubscriptionScreen from './MySubscriptionScreens/MySubscriptionScreen';
import SubscriptionSelectionScreen from './MySubscriptionScreens/AddSubscriptionScreens/SubscriptionSelectionScreen';

import OrderHistoryScreen from './OrderHistoryScreens/OrderHistoryScreen';
import UserProfileScreen from './UserProfileScreens/UserProfileScreen';
import SubscriptionManagementScreen from './MySubscriptionScreens/SubscriptionManagementScreens/SubscriptionManagementScreen';
import ChangeDeliveryScheduleScreen from './MySubscriptionScreens/SubscriptionManagementScreens/ChangeDeliveryScheduleScreen';
import SubscriptionDetailScreen from './MySubscriptionScreens/AddSubscriptionScreens/SubscriptionDetailScreen';
import ChangeShippingAddressScreen from './MySubscriptionScreens/SubscriptionManagementScreens/ChangeShippingAddressScreen';

const MySubscriptionStack = createStackNavigator(
  {
    Home: MySubscriptionScreen,
    AddSubscription: SubscriptionSelectionScreen,
    SubscriptionManagement: SubscriptionManagementScreen,
    ChangeDeliverySchedule: ChangeDeliveryScheduleScreen,
    ChangeShippingAddress: ChangeShippingAddressScreen,
    SubscriptionDetail: SubscriptionDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

MySubscriptionStack.navigationOptions = ({ navigation }) => {
  const tabBarLabel = 'Subscription';
  const tabBarIcon = ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-basket` : 'md-basket'}
    />
  );
  const tabBarVisible = navigation.state.index === 0 ? true : false;

  return { tabBarLabel, tabBarIcon, tabBarVisible };
};

const OrderHistoryStack = createStackNavigator({
  Home: OrderHistoryScreen,
});

OrderHistoryStack.navigationOptions = {
  tabBarLabel: 'Your order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'}
    />
  ),
};

const UserProfileStack = createStackNavigator({
  Home: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  MySubscriptionStack,
  OrderHistoryStack,
  UserProfileStack,
});
