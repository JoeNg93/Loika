import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../../constants/Colors';
import commonStyles from '../../constants/commonStyles';

export default function LoginScreen({ onPressLogin, onPressSignup }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/Loika.png')}
            style={{ width: 140, height: 100 }}
          />
          <View>
            <TextInput
              containerStyle={[styles.loginField]}
              inputStyle={[commonStyles.fontMontserratLight, styles.loginText]}
              placeholder={'email address'}
              // value={email}
              placeholderTextColor={[colors.lightGrey]}
              // onChangeText={onChangeEmail}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              containerStyle={[styles.loginField]}
              inputStyle={[commonStyles.fontMontserratLight, styles.loginText]}
              placeholder={'password'}
              // value={password}
              secureTextEntry={true}
              placeholderTextColor={[colors.lightGrey]}
              // onChangeText={onChangePassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: colors.darkGrey }}>
              Login using social media:
            </Text>
            <View style={styles.socialButtonContainer}>
              <TouchableOpacity>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/google.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.socialButton}
                  source={require('../../assets/images/twitter.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>
          Login
        </Text>
      </TouchableOpacity>
      {/* <Button onPress={onPressSignup} title="Signup" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    backgroundColor: colors.lightCardboard,
  },
  backgroundImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 299,
    height: 365,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgb(135, 135, 135)',
    shadowOpacity: 0.25,
    borderRadius: 16,
    backgroundColor: '#FCFAF6',
  },
  socialButton: {
    width: 28,
    height: 32,
  },
  socialButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 134,
    marginTop: 12,
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
    height: 46,
    backgroundColor: colors.mediumCarmine,
  },
});
