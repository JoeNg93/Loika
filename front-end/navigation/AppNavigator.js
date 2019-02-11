import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainScreenNavigator from '../screens/MainScreens/MainScreenNavigator';
import AuthNavigator from '../screens/AuthScreens/AuthNavigator';
import OnboardingScreen from '../screens/OnboardingScreens/OnboardingScreen';
import EntryScreen from '../screens/EntryScreen/EntryScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Entry: EntryScreen,
      Onboarding: OnboardingScreen,
      Auth: AuthNavigator,
      Main: MainScreenNavigator,
    },
    { initialRouteName: 'Main' }
  )
);
