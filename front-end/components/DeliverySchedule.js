import React from 'react';
import colors from '../constants/Colors';
import commonStyles from '../constants/commonStyles';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    // height: '100%',
    // justifyContent: 'space-around',
  },
  dayPickerContainer: {
    // flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton: {
    width: 60,
    height: 43,
    borderRadius: 6,

    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonPicked: {
    backgroundColor: colors.mediumCarmine,
  },
  dayButtonText: {
    ...commonStyles.fontRalewayBold,
    ...commonStyles.textGrey,
  },
  dayButtonPickedText: {
    ...commonStyles.textWhite,
  },
  bigText: {
    ...commonStyles.fontRalewaySemiBold,
    ...commonStyles.textGrey,
    fontSize: 14,
    marginBottom: 20,
  },
  smallText: {
    ...commonStyles.fontRalewayRegular,
    ...commonStyles.textBlack,
    fontSize: 10,
    marginTop: 26,
  },
  timeAndTextContainer: {
    // justifyContent: 'space-around',
    // flex: 1,
    marginTop: 33,
    alignItems: 'center',
  },
  timePickerContainer: {
    width: '80%',
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  timeSideContainer: {
    height: 110,
    // justifyContent: 'space-around',
    flexDirection: 'column',
  },
  timeButton: {
    width: 127,
    height: 38,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.macaroniCheese,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonPicked: {
    backgroundColor: colors.mediumCarmine,
    borderColor: colors.mediumCarmine,
  },
  timeButtonText: {
    ...commonStyles.fontMontserratBold,
    ...commonStyles.textMacaroniCheese,
  },
  timeButtonPickedText: {
    ...commonStyles.textWhite,
  },
});

export default class DeliverySchedule extends React.Component {
  state = {
    dayPicked: 'Wed',
    timePicked: '10:00-12:00',
  };

  // a cancer of a solution, but it's straightforward and it works, hopefully it doesn't need to be changed

  _checkDayClick = (dayName, elem) => {
    if (dayName == this.props.deliveryDayOfWeek) {
      switch (elem) {
        case 'btn':
          return styles.dayButtonPicked;
        case 'text':
          return styles.dayButtonPickedText;
      }
    }
  };

  _checkTimeClick = (timeSlot, elem) => {
    if (timeSlot == this.props.deliveryTime) {
      switch (elem) {
        case 'btn':
          return styles.timeButtonPicked;
        case 'text':
          return styles.timeButtonPickedText;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dayPickerContainer}>
          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Mon', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Mon')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Mon', 'text')]}
            >
              MON
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Tue', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Tue')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Tue', 'text')]}
            >
              TUE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Wed', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Wed')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Wed', 'text')]}
            >
              WED
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Thu', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Thu')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Thu', 'text')]}
            >
              THU
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Fri', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Fri')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Fri', 'text')]}
            >
              FRI
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('Sat', 'btn')]}
            onPress={() => this.props.onPressChangeDeliveryDayOfWeek('Sat')}
          >
            <Text
              style={[styles.dayButtonText, this._checkDayClick('Sat', 'text')]}
            >
              SAT
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeAndTextContainer}>
          <Text style={styles.bigText}>To be delivered around:</Text>

          <View style={styles.timePickerContainer}>
            <View style={styles.timeSideContainer}>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  { marginBottom: 34 },
                  this._checkTimeClick('10:00-12:00', 'btn'),
                ]}
                onPress={() =>
                  this.props.onPressChangeDeliveryTime('10:00-12:00')
                }
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    this._checkTimeClick('10:00-12:00', 'text'),
                  ]}
                >
                  10:00-12:00
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.timeButton,
                  this._checkTimeClick('14:00-16:00', 'btn'),
                ]}
                onPress={() =>
                  this.props.onPressChangeDeliveryTime('14:00-16:00')
                }
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    this._checkTimeClick('14:00-16:00', 'text'),
                  ]}
                >
                  14:00-16:00
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeSideContainer}>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  { marginBottom: 34 },
                  this._checkTimeClick('12:00-14:00', 'btn'),
                ]}
                onPress={() =>
                  this.props.onPressChangeDeliveryTime('12:00-14:00')
                }
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    this._checkTimeClick('12:00-14:00', 'text'),
                  ]}
                >
                  12:00-14:00
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.timeButton,
                  this._checkTimeClick('16:00-18:00', 'btn'),
                ]}
                onPress={() =>
                  this.props.onPressChangeDeliveryTime('16:00-18:00')
                }
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    this._checkTimeClick('16:00-18:00', 'text'),
                  ]}
                >
                  16:00-18:00
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.smallText}>{this.props.instructionText}</Text>
        </View>
      </View>
    );
  }
}

DeliverySchedule.propTypes = {
  instructionText: PropTypes.string,
  deliveryDayOfWeek: PropTypes.string,
  deliveryTime: PropTypes.string,
  onPressChangeDeliveryDayOfWeek: PropTypes.func,
  onPressChangeDeliveryTime: PropTypes.func,
};

DeliverySchedule.defaultProps = {
  instructionText: '',
  deliveryDayOfWeek: 'Mon',
  deliveryTime: '10:00-12:00',
  onPressChangeDeliveryDayOfWeek: () => {},
  onPressChangeDeliveryTime: () => {},
};
