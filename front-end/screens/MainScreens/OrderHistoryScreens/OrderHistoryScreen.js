import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OrderHistoryScreen(props) {
  return (
    <View style={styles.container}>
      <Text>ORDER HISTORY</Text>
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
