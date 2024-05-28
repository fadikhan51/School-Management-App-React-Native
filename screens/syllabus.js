import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import DropDown from '../components/dropdown';
import colors from '../components/colors';
import {Button} from 'react-native-paper';
import Accordion from '../src/components/imgAccordianTest';
import HeaderDefault from '../components/defaultHeader';

export default SyllabusScreen = () => {
  return (
    <View style={{flex: 1}}>
      <HeaderDefault
        title="Syllabus"
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
          Upload
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
  backButton: {
    alignSelf: 'flex-start',
  },
  download: {
    alignSelf: 'flex-end',
  },
  searchBtn: {
    margin: 10,
    width: 160,
    height: 60,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
});
