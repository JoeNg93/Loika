import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UserProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Text>USER PROFILE</Text>
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
