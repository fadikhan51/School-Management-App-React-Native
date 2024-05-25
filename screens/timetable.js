import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DropDown from '../components/dropdown';
import colors from '../components/colors';
import {Button} from 'react-native-paper';
import HeaderDefault from '../components/defaultHeader';
import Accordion from '../src/components/imgAccordianTest';

export default TimeTableScreen = () => {
  return (
    <View style={{flex: 1}}>
      <HeaderDefault
        title="Time Table"
        leftIcon="arrow-left"
        rightIcon="folder-download-outline"
      />
      <DropDown width={'90%'} />

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            /* Update logic */
          }}>
          Update
        </Button>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          disabled={true}
          onPress={() => {
            /* Delete logic */
          }}>
          Delete
        </Button>
      </View>
      <Accordion />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBtn: {
    margin: 20,
    height: 60,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
  searchBtn: {
    margin: 10,
    width: 160,
    height: 60,
  },
});
