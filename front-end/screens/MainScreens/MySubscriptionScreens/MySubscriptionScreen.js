import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MySubscriptionScreen(props) {
  return (
    <View style={styles.container}>
      <Text>MY SUBSCRIPTION</Text>
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
