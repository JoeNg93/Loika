import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';

import MySubscriptionScreenContainer from './MySubscriptionScreens/MySubscriptionScreenContainer';
import SubscriptionSelectionScreen from './MySubscriptionScreens/AddSubscriptionScreens/SubscriptionSelectionScreen';

import OrderHistoryScreen from './OrderHistoryScreens/OrderHistoryScreen';
import UserProfileScreen from './UserProfileScreens/UserProfileScreen';

const MySubscriptionStack = createStackNavigator(
  {
    Home: MySubscriptionScreenContainer,
    AddSubscription: SubscriptionSelectionScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

MySubscriptionStack.navigationOptions = {
  tabBarLabel: 'My Subscriptions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
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
