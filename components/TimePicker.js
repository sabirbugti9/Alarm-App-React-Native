import React, { Component } from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addAlarm } from '../actions/alarm';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ReactNativeAN from 'react-native-alarm-notification';
class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  makeid = () => {
    var length = 5;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = datetime => {
    var currentTime = Date.now();
    if (datetime.getTime() < currentTime) {
      Alert.alert('please choose future time');
      this.hideDateTimePicker();

      return;
    }
    const fireDate = ReactNativeAN.parseDate(datetime);
    console.log('A date has been picked: ', fireDate);

    const alarmNotifData = {
      id: this.makeid(), // Required
      title: 'Alarm Ringing', // Required
      message: 'My Notification Message', // Required
      channel: 'alarm-channel', // Required. Same id as specified in MainApplication's onCreate method
      ticker: 'My Notification Ticker',
      auto_cancel: true, // default: true
      vibrate: true,
      vibration: 100, // default: 100, no vibration if vibrate: false
      small_icon: 'ic_launcher', // Required
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: null, // Plays custom notification ringtone if sound_name: null
      color: 'red',
      schedule_once: true, // Works with ReactNativeAN.scheduleAlarm so alarm fires once
      tag: 'some_tag',
      fire_date: fireDate, // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

      // You can add any additional data that is important for the notification
      // It will be added to the PendingIntent along with the rest of the bundle.
      // e.g.
      data: { value: datetime },
    };

    this.props.add(alarmNotifData);
    ReactNativeAN.scheduleAlarm(alarmNotifData);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <Button title="+ Add Alarm" onPress={this.showDateTimePicker} />
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    add: alarmNotifObj => {
      dispatch(addAlarm(alarmNotifObj));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
