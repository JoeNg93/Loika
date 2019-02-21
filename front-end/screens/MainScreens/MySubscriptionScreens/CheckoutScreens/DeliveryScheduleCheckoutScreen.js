import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import Colors from '../../../../constants/Colors';
import CheckoutStepProgress from '../../../../components/CheckoutStepProgress';
import DeliverySchedule from '../../../../components/DeliverySchedule';
import commonStyles from '../../../../constants/commonStyles';
import Layout from '../../../../constants/Layout';
import {
  setDeliveryDayOfWeek,
  setDeliveryTime,
} from '../../../../actions/checkout';

const width = Layout.window.width;

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexBasis: '70%',
    flex: 1,
  },
  mainButtonStyle: {
    backgroundColor: Colors.mediumCarmine,
    width: width,
    height: 56,
  },
  mainButtonTitle: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textWhite,
    fontSize: 20,
  },
  deliverySchedule: {
    flex: 2,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  image: {
    width: 204,
    height: 185,
    resizeMode: 'contain',
  },
});

class DeliveryScheduleCheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Choose delivery schedule',
    headerTransparent: true,
    headerTintColor: Colors.mediumCarmine,
    headerBackImage: (
      <TouchableHighlight style={{ marginLeft: 20 }}>
        <Icon name={'arrow-back'} size={22} color={Colors.mediumCarmine} />
      </TouchableHighlight>
    ),
    headerRight: (
      <TouchableHighlight style={{ marginRight: 20 }}>
        <Icon name={'shopping-basket'} size={22} color={Colors.mediumCarmine} />
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

  componentDidMount() {
    this.props.setDeliveryDayOfWeek('MON');
    this.props.setDeliveryTime('10:00 - 12:00');
  }

  onPressConfirmDeliverySchedule = () => {
    this.props.navigation.navigate('OrderSummary');
  };

  onPressChangeDeliveryDayOfWeek = dayOfWeek => {
    this.props.setDeliveryDayOfWeek(dayOfWeek);
  };

  onPressChangeDeliveryTime = time => {
    this.props.setDeliveryTime(time);
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckoutStepProgress currentStep="2" />

        <View style={styles.contentContainer}>
          <View style={styles.deliverySchedule}>
            <DeliverySchedule
              deliveryDayOfWeek={this.props.deliveryDayOfWeek}
              deliveryTime={this.props.deliveryTime}
              onPressChangeDeliveryDayOfWeek={
                this.onPressChangeDeliveryDayOfWeek
              }
              onPressChangeDeliveryTime={this.onPressChangeDeliveryTime}
              instructionText="*Delivery is scheduled every week during month"
            />
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../../assets/images/slide3.png')}
            />
          </View>
        </View>

        <View>
          <Button
            title={'Confirm delivery schedule'}
            titleStyle={styles.mainButtonTitle}
            buttonStyle={styles.mainButtonStyle}
            onPress={this.onPressConfirmDeliverySchedule}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  deliveryDayOfWeek: state.checkout.deliveryDayOfWeek,
  deliveryTime: state.checkout.deliveryTime,
});

export default connect(
  mapStateToProps,
  { setDeliveryDayOfWeek, setDeliveryTime }
)(DeliveryScheduleCheckoutScreen);
