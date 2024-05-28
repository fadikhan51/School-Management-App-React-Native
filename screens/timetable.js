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
// import firestore from '@react-native-firebase/app';
import DropDown from '../components/dropdown';
import colors from '../components/colors';
import {Button} from 'react-native-paper';
import HeaderDefault from '../components/defaultHeader';
import Accordion from '../src/components/imgAccordianTest';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';

export default TimeTableScreen = () => {
  const [classSelected, setclassSelected] = useState('');
  const [timetableimg, settimetableimg] = useState('');

  const handleselelct = item => {
    setclassSelected(item);
    console.log('Selected class:', item);
  };

  const ongettingbse64 = base64data => {
    settimetableimg(base64data);
  };

  const handleuploadbutton = () => {
    if (classSelected === 'Prep')
      firestore()
        .collection('Class')
        .doc('7LcahFphsVlUz4uYE5J6')
        .update({timetable: timetableimg})
        .then(() => {
          console.log('Base64 data uploaded successfully.');
          // Optionally, you can perform any additional actions here
        })
        .catch(error => {
          console.error('Error uploading base64 data:', error);
        });
  };
  const handledeletebutton = () => {
    if (classSelected === 'Nursery') {
      firestore()
        .collection('Class')
        .doc('7LcahFphsVlUz4uYE5J6')
        .update({timetable: ''})
        .then(() => {
          console.log('Document deleted successfully.');
          // Optionally, you can perform any additional actions here
        })
        .catch(error => {
          console.error('Error deleting document:', error);
        });
    }
  };
  useEffect(() => {
    console.log('timetableimg updated:', timetableimg);
  }, [timetableimg]);
  return (
    <View style={{flex: 1}}>
      <HeaderDefault
        title="Time Table"
        leftIcon="arrow-left"
        rightIcon="folder-download-outline"
      />
      <DropDown width={'90%'} onselect={handleselelct} />


      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            handleuploadbutton();
          }}>
          Upload
        </Button>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            handledeletebutton();
          }}>
          Delete
        </Button>
      </View>
      <Accordion passedClass={classSelected} getbase64data={ongettingbse64} />
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
