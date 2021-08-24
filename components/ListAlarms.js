import React, { Component } from 'react';
import { Button, StyleSheet, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { deleteAlarm } from '../actions/alarm';
import ReactNativeAN from 'react-native-alarm-notification';

class ListAlarms extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <ListItem
        title={item.time.toString()}
        titleStyle={styles.titleStyle}
        subtitle={item.date.toString()}
        // leftIcon={{name: 'alarm'}}
        bottomDivider
        rightElement={
          <Button
            title="Remove"
            color="red"
            onPress={e => {
              ReactNativeAN.deleteAlarm(item.alarmNotifData.id);
              ReactNativeAN.stopAlarm();

              this.props.delete(item.value);
            }}
          />
        }
      // leftElement={<Icon name="alarm" />}
      />
    </View>
  );

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.alarms}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  titleStyle: { fontWeight: 'bold', fontSize: 30 },
});

const mapStateToProps = state => {
  return {
    alarms: state.alarms.alarms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: value => {
      dispatch(deleteAlarm(value));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListAlarms);
