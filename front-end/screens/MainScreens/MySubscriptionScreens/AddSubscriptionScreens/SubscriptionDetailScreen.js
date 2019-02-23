import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';

const boxNameToImageMapper = {
  'vegan box': require('../../../../assets/images/vegan.png'),
  'mixed box': require('../../../../assets/images/mixed.png'),
  'meat box': require('../../../../assets/images/meat.png'),
};

class SubscriptionDetailScreen extends React.Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackTitle: null,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableHighlight style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
      </TouchableHighlight>
    ),
    headerTitleStyle: {
      ...commonStyles.fontRalewayBold,
      fontSize: 18,
    },
    headerStyle: {
      marginTop: 10,
    },
  };

  render() {
    const { selectedSubscription } = this.props;

    if (Object.entries(selectedSubscription).length === 0) {
      // selectedSubscription has not been set
      return null;
    }

    return (
      <View>
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={
              boxNameToImageMapper[selectedSubscription.title.toLowerCase()]
            }
          />
          <View style={styles.priceTag} />
          <Text style={styles.price}>
            {selectedSubscription.totalPrice} {'\u20AC'}
          </Text>
        </View>
        <View>
          <View style={styles.titleContainer} />
          <Text style={styles.title}>{selectedSubscription.title}</Text>
          <View style={styles.tagBox} />
          <Text style={styles.tag}>{selectedSubscription.tag}</Text>
        </View>
        <View>
          <Text style={styles.size}>{selectedSubscription.size}kg/box</Text>
          <View style={styles.dot} />
          <Text style={styles.divprice}>
            {selectedSubscription.mealPrice}
            {'\u20AC'}/meal
          </Text>
        </View>
        <View>
          <Text style={styles.about}>ABOUT</Text>
          <Text style={styles.description}>
            {selectedSubscription.longDescription}
          </Text>
        </View>
        <View>
          <Text style={styles.sampleTitle}>SAMPLE CONTENT</Text>
          <Text style={styles.content}>
            Ground beef - 2x1lb NY strip - 2x10oz Top sirloin - 4x6oz Whole pork
            tenderloin - 1lb Boneless skinless chicken breast - 3x1lb *Exact
            cuts are subject to change
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  about: {
    position: 'absolute',
    width: 56,
    height: 19,
    left: 41,
    top: 406,
    ...commonStyles.fontRalewayBold,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.macaroniCheese,
  },
  content: {
    position: 'absolute',
    width: 300,
    height: 112,
    left: 41,
    top: 537,
    ...commonStyles.fontRalewayRegular,
    fontSize: 14,
    color: Colors.black,
  },
  description: {
    position: 'absolute',
    width: 300,
    height: 77,
    left: 41,
    top: 433,
    ...commonStyles.fontRalewayRegular,
    fontSize: 14,
    color: Colors.black,
  },
  divprice: {
    position: 'absolute',
    width: 74,
    height: 17,
    left: 217,
    top: 355,
    ...commonStyles.fontRalewayBold,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    left: 197,
    top: 360,
    borderRadius: 4,
    backgroundColor: Colors.mediumCarmine,
  },
  image: {
    position: 'absolute',
    width: 167,
    height: 178,
    left: 124,
    top: 66,
  },
  priceTag: {
    position: 'absolute',
    width: 75,
    height: 75,
    left: 261,
    top: 56,
    borderRadius: 37.5,
    backgroundColor: Colors.mediumCarmine,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 4 },
    shadowColor: 'rgba(91, 91, 91, 0.25)',
  },
  price: {
    position: 'absolute',
    width: 58,
    height: 26,
    left: 270,
    top: 78,
    ...commonStyles.fontRalewayBold,
    fontSize: 22,
    color: Colors.white,
  },
  sampleTitle: {
    position: 'absolute',
    width: 144,
    height: 19,
    left: 41,
    top: 510,
    ...commonStyles.fontRalewayBold,
    fontSize: 16,
    color: Colors.macaroniCheese,
  },
  size: {
    position: 'absolute',
    width: 62,
    height: 17,
    left: 123,
    top: 355,
    ...commonStyles.fontRalewayBold,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  tag: {
    position: 'absolute',
    width: 49,
    height: 19,
    left: 183,
    top: 287,
    ...commonStyles.fontRalewayBold,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
  tagBox: {
    position: 'absolute',
    width: 127,
    height: 27,
    left: 144,
    top: 283,
    borderRadius: 13.5,
    backgroundColor: Colors.mediumCarmine,
  },
  title: {
    position: 'absolute',
    width: 268,
    height: 29,
    left: 73,
    top: 234,
    ...commonStyles.fontRalewayBold,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.black,
  },
  titleContainer: {
    position: 'absolute',
    width: 335,
    height: 124,
    left: 40,
    top: 210,
    backgroundColor: Colors.white,
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 4 },
    shadowColor: 'rgba(91, 91, 91, 0.25)',
    borderRadius: 12,
  },
  topContainer: {
    position: 'absolute',
    width: 414,
    height: 262,
    left: 0,
    top: 0,
    backgroundColor: Colors.macaroniCheese,
  },
});

const mapStateToProps = state => ({
  selectedSubscription: state.checkout.selectedSubscription,
});

export default connect(
  mapStateToProps,
  null
)(SubscriptionDetailScreen);
