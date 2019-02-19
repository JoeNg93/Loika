import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Platform,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const width = 200;

export default class SweetCarousel extends React.Component {
  static WIDTH = width;

  render() {
    const { animatedValue, box, index } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.6, 1.0, 0.6],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View>
          <Image
            style={styles.image}
            source={require('../../../../assets/images/meat.png')}
          />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      width: width,
      height: width,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      marginTop: 75,
    },
    android: {
      width: width,
      height: width * 1.2,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      marginTop: 80,
    },
  }),
  image: Platform.select({
    ios: {
      width: width,
      height: width,
      overflow: 'visible',
    },
    android: {
      width: width,
      height: width,
      overflow: 'visible',
    },
  }),
});
