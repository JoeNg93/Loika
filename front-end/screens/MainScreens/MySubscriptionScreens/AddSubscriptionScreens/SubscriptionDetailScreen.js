import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../../../../constants/Colors';
import commonStyles from '../../../../constants/commonStyles';
import Layout from '../../../../constants/Layout';
import { boxNameToImageMapper } from '../../../../utils/mapper';

const width = Layout.window.width,
  CONTENT_SEPARATOR = ',';

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

  mockSampleContent = `Ground beef 2x1lb,NY strip 2x10oz,Top sirloin 4x6oz,Whole pork tenderloin 1lb,Boneless skinless chicken breast 3x1lb,*Exact cuts are subject to change`;

  splitSampleContent = sampleContent => {
    let splitSampleContent = sampleContent.split(CONTENT_SEPARATOR);
    return splitSampleContent.map((text, index) => (
      <Text key={index} style={styles.descriptionContent}>
        {text}
      </Text>
    ));
  };

  render() {
    const { selectedSubscription } = this.props;

    if (Object.entries(selectedSubscription).length === 0) {
      // selectedSubscription has not been set
      return null;
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
      >
        <View style={styles.topContainer}>
          <Image
            style={styles.image}
            source={boxNameToImageMapper[selectedSubscription.title]}
          />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>
              {selectedSubscription.totalPrice} {'\u20AC'}
            </Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedSubscription.title}</Text>
            <View style={styles.textTag}>
              <Text style={styles.textTagText}>{selectedSubscription.tag}</Text>
            </View>
          </View>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>
            {selectedSubscription.size}kg/box
          </Text>
          <View style={styles.circle} />
          <Text style={styles.valueText}>
            {selectedSubscription.mealPrice}
            {'\u20AC'}/meal
          </Text>
        </View>
        <View style={{ paddingHorizontal: 40 }}>
          <View>
            <Text style={styles.descriptionTitle}>ABOUT</Text>
            <Text style={[styles.descriptionContent, { marginTop: 10 }]}>
              {selectedSubscription.shortDescription}
            </Text>
          </View>
          <View>
            <Text style={styles.descriptionTitle}>SAMPLE CONTENT</Text>
            <View style={{ marginTop: 10 }}>
              {this.splitSampleContent(selectedSubscription.longDescription)}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: 262,
    backgroundColor: Colors.macaroniCheese,
    paddingTop: 24,
  },
  image: {
    width: 167,
    height: 178,
    marginTop: 44,
  },
  priceTag: Platform.select({
    ios: {
      position: 'absolute',
      width: 70,
      height: 70,
      left: 257,
      top: 64,
      borderRadius: 38,
      backgroundColor: Colors.mediumCarmine,
      shadowColor: Colors.darkGrey,
      shadowRadius: 4,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
    },
    android: {
      position: 'absolute',
      width: 75,
      height: 75,
      left: 257,
      top: 64,
      borderRadius: 38,
      backgroundColor: Colors.mediumCarmine,
      elevation: 4,
    },
  }),
  priceText: Platform.select({
    ios: {
      paddingTop: 22,
      paddingLeft: 10,
      ...commonStyles.fontRalewayBold,
      fontSize: 20,
      color: '#FFFFFF',
    },
    android: {
      paddingTop: 22,
      paddingLeft: 10,
      ...commonStyles.fontRalewayBold,
      fontSize: 22,
      color: '#FFFFFF',
    },
  }),
  titleContainer: {
    width: '80%',
    height: 124,

    backgroundColor: Colors.white,
    borderRadius: 12,

    shadowColor: Colors.darkGrey,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,

    position: 'absolute',
    top: 200,
  },
  title: {
    ...commonStyles.fontRalewayBold,
    color: Colors.black,
    fontSize: 24,
    textAlign: 'center',
  },
  textTag: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mediumCarmine,
    shadowColor: Colors.darkGrey,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    borderRadius: 13.5,
    marginTop: 20,
  },
  textTagText: {
    ...commonStyles.fontRalewayBold,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  size: {
    ...commonStyles.fontRalewayBold,
    color: Colors.darkGrey,
    fontSize: 14,
    textAlign: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 3,
    marginTop: 88,
  },
  circle: {
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.mediumCarmine,
  },
  valueText: {
    ...commonStyles.fontRalewayBold,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.darkGrey,
  },
  descriptionTitle: {
    ...commonStyles.fontRalewayBold,
    color: Colors.macaroniCheese,
    fontSize: 16,
    marginTop: 34,
  },
  descriptionContent: {
    ...commonStyles.fontRalewayRegular,
    color: Colors.black,
    fontSize: 14,
  },
});

const mapStateToProps = state => ({
  selectedSubscription: state.checkout.selectedSubscription,
});

export default connect(
  mapStateToProps,
  null
)(SubscriptionDetailScreen);
