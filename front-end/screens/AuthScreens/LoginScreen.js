import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import Colors from '../../constants/Colors';
import commonStyles from '../../constants/commonStyles';

export default function LoginScreen({ onPressLogin, saveInput }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/Loika.png')}
            style={{ width: 140, height: 100, marginTop: 30 }}
          />
          <View style={styles.credContainer}>
            <TextField
              label={'Email'}
              autoCapitalize="none"
              textColor={Colors.black}
              fontSize={12}
              labelFontSize={10}
              lineWidth={0.5}
              activeLineWidth={1}
              tintColor={Colors.mediumCarmine}
              baseColor={Colors.mediumBlack}
              errorColor={Colors.mediumCarmine}
              inputContainerStyle={styles.inputContainer}
              labelTextStyle={styles.inputLabel}
              onChangeText={value => saveInput({ email: value })}
            />
            <TextField
              label={'Password'}
              autoCapitalize="none"
              textColor={Colors.black}
              fontSize={12}
              labelFontSize={10}
              secureTextEntry={true}
              lineWidth={0.5}
              activeLineWidth={1}
              tintColor={Colors.mediumCarmine}
              baseColor={Colors.mediumBlack}
              errorColor={Colors.mediumCarmine}
              inputContainerStyle={styles.inputContainer}
              labelTextStyle={styles.inputLabel}
              onChangeText={value => saveInput({ password: value })}
            />
          </View>

          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: Colors.darkGrey }}>
              Login using social media:
            </Text>
            <View style={styles.socialButtonContainer}>
              <TouchableOpacity style={{ width: 34, height: 34 }}>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 34, height: 34 }}>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/google.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 34, height: 34 }}>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/twitter.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>
            Login
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* <Button onPress={onPressSignup} title="Signup" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // height: 720,
    // width: '100%',
    backgroundColor: Colors.lightCardboard,
  },
  backgroundImage: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 299,
    height: 356,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgb(135, 135, 135)',
    shadowOpacity: 0.25,
    borderRadius: 16,
    backgroundColor: '#FCFAF6',
    marginTop: 155,
  },
  socialButton: {
    width: 34,
    height: 34,
  },
  socialButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 134,
    marginTop: 12,
    marginBottom: 25,
  },
  loginField: {
    width: 242,
  },
  loginText: {
    width: 242,
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 105,
    height: 56,
    backgroundColor: Colors.mediumCarmine,
  },
  inputContainer: {
    marginTop: -8,
    paddingTop: 36,
    height: 58,
  },
  inputLabel: {
    ...commonStyles.fontRalewayMedium,
    ...commonStyles.black,
  },
  credContainer: {
    width: 242,
    height: 70,
    marginBottom: 85,
  },
});
