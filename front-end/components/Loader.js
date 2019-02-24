import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import Colors from '../constants/Colors';

const loaderWidth = 60;
const loaderHeight = 60;

class Loader extends Component {
  constructor(props) {
    super(props);
    this.scaleValue1 = new Animated.Value(0);
    this.scaleInterpolate1 = this.scaleValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });
    this.scaleValue2 = new Animated.Value(0);
    this.scaleInterpolate2 = this.scaleValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });
  }

  componentDidMount() {
    this.runLoaderAnimation();
  }

  runLoaderAnimation() {
    Animated.loop(
      Animated.timing(this.scaleValue1, {
        duration: 2000,
        toValue: 1,
        easing: Easing.expo,
      })
    ).start();
    setTimeout(() => {
      Animated.loop(
        Animated.timing(this.scaleValue2, {
          duration: 2000,
          toValue: 1,
          easing: Easing.expo,
        })
      ).start();
    }, 1000);
  }
  getLoaderAnimationStyle(scaleInterpolate) {
    return {
      transform: [{ scale: scaleInterpolate }],
    };
  }
  render() {
    const loaderAnimatedValue1 = this.getLoaderAnimationStyle(
      this.scaleInterpolate1
    );
    const loaderAnimatedValue2 = this.getLoaderAnimationStyle(
      this.scaleInterpolate2
    );
    return (
      <View style={styles.container}>
        <View style={styles.loader}>
          <Animated.View style={[styles.circle1, loaderAnimatedValue1]} />
          <Animated.View style={[styles.circle2, loaderAnimatedValue2]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  loader: {
    width: loaderWidth,
    height: loaderHeight,
  },
  circle1: {
    width: '100%',
    height: '100%',
    borderRadius: loaderWidth / 2,
    backgroundColor: Colors.mediumCarmine,
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circle2: {
    width: '100%',
    height: '100%',
    borderRadius: loaderWidth / 2,
    backgroundColor: Colors.mediumCarmine,
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Loader;
