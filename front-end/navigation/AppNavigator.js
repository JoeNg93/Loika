import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from '../screens/AuthScreens/AuthStack';
import OnboardingScreen from '../screens/OnboardingScreens/OnboardingScreen';
import EntryScreen from '../screens/EntryScreen/EntryScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Entry: EntryScreen,
      Onboarding: OnboardingScreen,
      Auth: AuthStack,
      Main: MainTabNavigator,
    },
    { initialRouteName: 'Entry' }
  )
);
