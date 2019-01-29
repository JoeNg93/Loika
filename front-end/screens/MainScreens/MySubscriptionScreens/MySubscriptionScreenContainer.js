import React from 'react';
import MySubscriptionScreen from './MySubscriptionScreen';

export default class MySubscriptionScreenContainer extends React.Component {
  onPressAddSubscription = () => {
    this.props.navigation.navigate('AddSubscription');
  };

  render() {
    return (
      <MySubscriptionScreen
        onPressAddSubscription={this.onPressAddSubscription}
      />
    );
  }
}
