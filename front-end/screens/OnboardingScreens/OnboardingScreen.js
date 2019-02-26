import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import commonStyles from '../../constants/commonStyles';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  image: {
    width: 320,
    height: 320,
    marginTop: 15,
    resizeMode: 'contain',
  },
  image2: {
    width: 320,
    height: 320,
    marginTop: 15,
    resizeMode: 'contain',
  },
  image3: {
    width: 320,
    height: 320,
    marginTop: 15,
    resizeMode: 'contain',
  },
  image4: {
    width: 320,
    height: 320,
    marginTop: 15,
    resizeMode: 'contain',
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    backgroundColor: 'transparent',
    lineHeight: 20,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  TextContainer: {
    flex: 1,
    width: 320,
    marginTop: 30,
  },
  activeDot: {
    backgroundColor: '#AA3C3B',
  },
  dots: {
    backgroundColor: '#E8DFCA',
  },
  buttonStyle: {
    color: '#AA3C3B',
    textTransform: 'uppercase',
    fontSize: 16,
  },
});

const slides = [
  {
    key: 'somethun',
    title: 'Choose your box today!',
    text:
      'View our selections and get yourself produces straight from the reliable trusty local farmers! Simply click on the box to see what you would get inside and get to know exactly where your food comes from and who made it!',
    image: require('../../assets/images/slide1.png'),
    imageStyle: styles.image,
  },
  {
    key: 'somethun1',
    title: 'We travel to the farm',
    text:
      'Once you have placed an order just sit back and we will happily drive to farms to get your produces for you. We will make a quick stop at our warehouse to repackage the food and make sure there is nothing but fresh, quality produces awaiting you!',
    image: require('../../assets/images/slide2.png'),
    imageStyle: styles.image2,
  },
  {
    key: 'somethun2',
    title: 'Arrival at your doorstep',
    text:
      'We will quickly get on the road to bring you the produces at your most convenient hour that you have chosen. On time and as fresh as it could be!',
    image: require('../../assets/images/slide3.png'),
    imageStyle: styles.image3,
  },
  {
    key: 'somethun3',
    title: 'Get your food fresh online',
    text:
      'Shop with us for better food supplies at a better price to support your local suppliers! What are you waiting for?',
    image: require('../../assets/images/slide4.png'),
    imageStyle: styles.image4,
    hidePagination: true,
  },
];

class OnboardingScreen extends Component {
  _renderItem = props => (
    <View
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
    >
      <Image style={styles.image} source={props.image} />
      <View style={styles.TextContainer}>
        <Text style={[styles.title, commonStyles.fontRalewayBold]}>
          {props.title}
        </Text>
        <Text style={[styles.text, commonStyles.fontRalewayRegular]}>
          {props.text}
        </Text>
      </View>
    </View>
  );

  onDone = async () => {
    await AsyncStorage.setItem('skipOnboarding', 'true');
    this.props.navigation.navigate('Auth');
  };

  onSkip = async () => {
    await AsyncStorage.setItem('skipOnboarding', 'true');
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        dotStyle={styles.dots}
        activeDotStyle={styles.activeDot}
        hideNextButton={true}
        showSkipButton={true}
        buttonTextStyle={styles.buttonStyle}
        onDone={this.onDone}
        onSkip={this.onSkip}
      />
    );
  }
}

export default OnboardingScreen;
