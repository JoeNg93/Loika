import React from 'react';
import colors from '../../constants/Colors';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
	container: {
		height: '100%',
    justifyContent: 'space-around',
	},
  dayPickerContainer: {
    flex: 0.4,
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
    // fontFamily: 'Raleway',
    color: '#979797'
  },
  dayButtonPickedText: {
    color: '#FFFFFF',
  },
  bigText: {
    // fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 14,
		fontStyle: 'normal',
		color: '#979797',
	},
	smallText: {
    // fontFamily: 'Raleway',
    fontSize: 10,
		fontStyle: 'normal',
		color: '#282828',
  },
  timeAndTextContainer: {
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
  },
  timePickerContainer: {
    width: '80%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  timeSideContainer: {
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  timeButton: {
    width: 127,
    height: 38,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FCB79A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeButtonPicked: {
    backgroundColor: colors.mediumCarmine,
    borderColor: colors.mediumCarmine,
  },
  timeButtonText: {
    // fontFamily: 'Raleway',
    color: '#FCB79A',
  },
  timeButtonPickedText: {
    color: '#FFFFFF',
  },
});

export default class DeliverySchedule extends React.Component {

  state = {
    dayPicked: 'WED',
    timePicked: '10:00 - 12:00',
  };

  // a cancer of a solution, but it's straightforward and it works, hopefully it doesn't need to be changed

  _changeDayPick = (dayName) => {
    this.setState({ dayPicked: dayName });
  };

  _checkDayClick = (dayName, elem) => {
    if (dayName == this.state.dayPicked) {
      switch (elem) {
        case 'btn':
          return styles.dayButtonPicked 
        case 'text':
          return styles.dayButtonPickedText
      }
    }
  };

  _changeTimePick = (timeSlot) => {
    this.setState({ timePicked: timeSlot });
  };

  _checkTimeClick = (timeSlot, elem) => {
    if (timeSlot == this.state.timePicked) {
      switch (elem) {
        case 'btn':
          return styles.timeButtonPicked
        case 'text':
          return styles.timeButtonPickedText
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.dayPickerContainer}>
          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('MON', 'btn')]}
            onPress={() => this._changeDayPick('MON')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('MON', 'text')]}>MON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('TUE', 'btn')]}
            onPress={() => this._changeDayPick('TUE')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('TUE', 'text')]}>TUE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('WED', 'btn')]}
            onPress={() => this._changeDayPick('WED')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('WED', 'text')]}>WED</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('THU', 'btn')]}
            onPress={() => this._changeDayPick('THU')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('THU', 'text')]}>THU</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('FRI', 'btn')]}
            onPress={() => this._changeDayPick('FRI')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('FRI', 'text')]}>FRI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dayButton, this._checkDayClick('SAT', 'btn')]}
            onPress={() => this._changeDayPick('SAT')}
          >
            <Text style={[styles.dayButtonText, this._checkDayClick('SAT', 'text')]}>SAT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeAndTextContainer}>
          <Text style={styles.bigText}>To be delivered around:</Text>
          
          <View style={styles.timePickerContainer}>
            <View style={styles.timeSideContainer}>
              <TouchableOpacity
                style={[styles.timeButton, this._checkTimeClick('10:00 - 12:00', 'btn')]}
                onPress={() => this._changeTimePick('10:00 - 12:00')}
              >
                <Text style={[styles.timeButtonText, this._checkTimeClick('10:00 - 12:00', 'text')]}>10:00 - 12:00</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.timeButton, this._checkTimeClick('14:00 - 16:00', 'btn')]}
                onPress={() => this._changeTimePick('14:00 - 16:00')}
              >
                <Text style={[styles.timeButtonText, this._checkTimeClick('14:00 - 16:00', 'text')]}>14:00 - 16:00</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeSideContainer}>
              <TouchableOpacity 
                style={[styles.timeButton, this._checkTimeClick('12:00 - 14:00', 'btn')]}
                onPress={() => this._changeTimePick('12:00 - 14:00')}
              >
                <Text style={[styles.timeButtonText, this._checkTimeClick('12:00 - 14:00', 'text')]}>12:00 - 14:00</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.timeButton, this._checkTimeClick('16:00 - 18:00', 'btn')]}
                onPress={() => this._changeTimePick('16:00 - 18:00')}
              >
                <Text style={[styles.timeButtonText, this._checkTimeClick('16:00 - 18:00', 'text')]}>16:00 - 18:00</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.smallText}>*Delivery is scheduled every week during month</Text>
				</View>
				
      </View>
    );
  }
}
