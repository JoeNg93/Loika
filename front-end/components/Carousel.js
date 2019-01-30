import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Platform
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const width = 200;

export default class SweetCarousel extends React.Component {
  static WIDTH = width;

  render() {
    const { animatedValue, box, index } = this.props;

    return (
      <Animated.View 
          style={[ styles.container,
          { transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [.6, 1.0, .6],
              extrapolate: 'clamp',
            }),
          }
      ],
    }]}>
        <View>
          <Image
            style={ styles.image}
            source={box.image}
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
      marginTop: 75
    },
    android: {
      width: width,
      height: width*1.2,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      marginTop: 80
    }
  }),
	image: Platform.select({
    ios: {
      width: width, //- 70,
      height: width, // - 50,
      overflow: 'visible',
    },
    android: {
      width: width, // - 120,
      height: width, // -100,
      overflow: 'visible',
    },
  }),
  
});