import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SignupScreen(props) {
  return (
    <View style={styles.container}>
      <Text>SIGN UP SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
