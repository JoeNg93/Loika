import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth - 125;

export default class SweetCarousel extends React.Component {
  static WIDTH = width;

  render() {
    const { animatedValue, box, index } = this.props;

    return (
      <View>
        <View>
          <Image
            source={box.image}
          />
        </View>
        <Text>{box.title}</Text>
      </View>
    );
  }
}