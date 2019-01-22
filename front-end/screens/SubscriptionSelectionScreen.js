import React from "react";
import {
	StyleSheet,
	View
} from "react-native";
import { Dimensions } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

import Carousel from "../components/Carousel.js"

const boxes = [
  { title: 'Mixed Box', image: require('../assets/images/mixed.png') },
  { title: 'Vegan Box', image: require('../assets/images/vegan.png') }
];

export default class SubscriptionSelectionScreen extends React.Component {
  static navigationOptions = {
    header: null
	};
	
	state = {
    currentIndex: 0,
  };

	render() {
		const { width } = Dimensions.get('window');
    const contentOffset = (width - Carousel.WIDTH) / 2;

		return (
			<View>
				<View style={styles.circle}>
				</View>
				<SideSwipe
        index={this.state.currentIndex}
        itemWidth={Carousel.WIDTH}
        style={{ width }}
        data={boxes}
        contentOffset={contentOffset}
        onIndexChange={index =>
          this.setState(() => ({ currentIndex: index }))
        }
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
         <Carousel
            box= {item}
            index={itemIndex}
            currentIndex={currentIndex}
            animatedValue={animatedValue}
          />
        )}
      />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	circle: {
		position: 'absolute',
		width: 622,
		height: 622,
		left: -104,
		top: -321,
		borderRadius: 311,
		backgroundColor: "#FCB79A"
	}
});