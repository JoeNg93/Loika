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
const width = screenWidth -100;

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
          <View style={styles.priceTag}>
          <Text style={styles.priceText}>{box.price}</Text>
          </View>
        </View>
        <Animated.View style={styles.textContainer}>
          <View style={styles.textTag}>
            <Text style={styles.textTagText}>{box.tag}</Text>
          </View>
          <Text style={styles.title}>{box.title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{box.size}</Text>
            <View style={styles.circle}></View>
            <Text style={styles.valueText}>{box.divprice}</Text>
          </View>
          <Text style={styles.description}>{box.description}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width*1.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible'
  },
	image: Platform.select({
    ios: {
      width: width - 95,
      height: width - 75,
      overflow: 'visible',
    },
    android: {
      width: width - 120,
      height: width -100,
      overflow: 'visible',
    },
  }),
  priceTag: {
    position: 'absolute',
    width: 75,
    height: 75,
    left: 217,
    top: -30,
		borderRadius: 38,
    backgroundColor: '#AA3C3B',
    shadowRadius: 4,
    shadowOffset: {height: 0, width: 4},
    shadowColor: 'rgba(91, 91, 91, 0.25)',
    elevation: 4
  },
  priceText: {
    paddingTop: 22,
    paddingLeft: 10,

    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,

    color: '#FFFFFF',
  },
  textTag: {
    width: 127,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AA3C3B',
    shadowRadius: 4,
    shadowOffset: {height: 0, width: 4},
    shadowColor: 'rgba(91, 91, 91, 0.25)',
    elevation: 4,
    borderRadius: 13.5,
    marginBottom: 17
  },
  textTagText: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',

    color: '#FFFFFF',
  },
  textContainer: {
    paddingTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#282828'
  },
  valueContainer: {
    flexDirection: 'row',
    paddingTop: 11,
    paddingBottom: 17
  },
  circle: {
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AA3C3B'
  },
  valueText: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#979797'
  },
  description: {
    //fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center',
    color: '#282828'
  }
});