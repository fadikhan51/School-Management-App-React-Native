import React, { useEffect,useCallback, useRef } from 'react';
import { Button } from 'react-native-paper';
import { View, Text, StyleSheet, Dimensions, ScrollView,Alert } from 'react-native';
import { useState } from 'react';
import colors from '../components/colors';
import HeaderDefault from '../components/defaultHeader';
import DropDown from '../src/components/dropdown';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/firestore';

const AdminTeacherScreen = ({navigation}) => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snapshot = await firestore().collection('Teacher').get();
        const teachersList = snapshot.docs.map(doc => ({
          label: doc.data().name,
          value: doc.id,
        }));
        console.log(teachersList);
        setTeachers(teachersList);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        Alert.alert('Error', 'Failed to fetch teachers.');
      }
    };

    const fetchClasses = async () => {
      try {
        const snapshot = await firestore().collection('Class').get();
        const classesList = snapshot.docs.map(doc => ({
          label: doc.data().name,
          value: doc.id,
        }));
        console.log(classesList);

       setClasses(classesList);
      } catch (error) {
        console.error('Error fetching classes:', error);
        Alert.alert('Error', 'Failed to fetch classes.');
      }
    };

    fetchTeachers();
    fetchClasses();
  }, []);

  const assignTeacherToClass = async () => {
    console.log("selected teacher:",selectedTeacher);
    console.log("Selected class:",selectedClass);
    if (selectedTeacher && selectedClass) {
      
      try {
        await firebase
          .firestore()
          .collection('Class')
          .doc(selectedClass)
          .update({
            assigned_teacher: `Teacher/${selectedTeacher}`,
          });
        Alert.alert('Success', 'Teacher assigned to class successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to assign teacher to class.');
        console.error(error);
      }
    }
    
       else {
      Alert.alert('Error', 'Please select both teacher and class.');
    }
  };

  const removeTeacherFromClass = async () => {
    if (selectedClass) {
      try {
        await firebase
          .firestore()
          .collection('Class')
          .doc(selectedClass)
          .update({
            assigned_teacher: '',
          });
        Alert.alert('Success', 'Teacher removed from class successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to remove teacher from class.');
        console.error(error);
      }
    } else {
      Alert.alert('Error', 'Please select a class.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderDefault title="Teacher" leftIcon="arrow-left" rightIcon="logout" onRightPress = {() => {navigation.goBack()}}/>
      <View style={styles.dropDownContainer}>
        <DropDown
          items={teachers}
          placeholder="Select Teacher"
          onSelect={setSelectedTeacher}
          width="65%"
          displayTop={true}
        />
        <DropDown
          items={classes}
          placeholder="Select Class"
          onSelect={setSelectedClass}
          width="65%"
          displayTop={true}
        />
      </View>

      <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={assignTeacherToClass}>
        Assign
      </Button>
      <Button
        mode="contained"
        buttonColor="red"
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={removeTeacherFromClass}>
        Remove Teacher
      </Button>

      {/* <ScrollView ref={scrollRef} style={{flex: 1}}>
        <Text>Additional Content Here</Text>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  searchBtn: {
    margin: 20,
    height: 60,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default AdminTeacherScreen;
