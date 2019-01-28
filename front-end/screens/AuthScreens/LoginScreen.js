import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ onPressLogin, onPressSignup }) {
  return (
    <View style={styles.container}>
      <Button onPress={onPressLogin} title="Login" />
      <Button onPress={onPressSignup} title="Signup" />
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
