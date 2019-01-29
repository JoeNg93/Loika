import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function MySubscriptionScreen({ onPressAddSubscription }) {
  return (
    <View style={styles.container}>
      <Text>MY SUBSCRIPTION</Text>
      <Button onPress={onPressAddSubscription} title="Add Subscription" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
