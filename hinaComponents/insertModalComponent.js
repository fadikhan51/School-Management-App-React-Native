import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Labeltext from '../components/LabelTextfieldsTeacher';
import DropDownclass from './dropDowncsplit';
import {TextInput as PaperTextInput, Button} from 'react-native-paper';
import DropDownclass2 from './dropdownreg';
import DynamicDropDown from '../components/dynamicDropDown';

import colors from '../components/colors';
import {firebase} from '@react-native-firebase/firestore';

const insertModalComponent = ({isVisible, onClose, first, second, final}) => {
  const [selectedClass, setSelectedClass] = React.useState('');
  const [firstm, setfirstm] = React.useState('');
  const [secondm, setsecondm] = React.useState('');
  const [finalm, setfinalm] = React.useState('');
  const [stuDocId, setStuDocId] = React.useState('');
  const [subDocId, setSubDocId] = React.useState('');

  const [stuname, setstuname] = React.useState('');
  const [subjects, setSubjects] = React.useState([]);
  const [selectedSubject, setSelectedSubject] = React.useState('');

  const handlefirstChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    first(newText);
    setfirstm(newText);
  };
  const handlesecondChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    second(newText);
    setsecondm(newText);
  };
  const handlefinalChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    final(newText);
    setfinalm(newText);
  };
  const handleSelectedSubject = id => {
    setSubDocId(id);
  };
  const handleClassSelect = async sclass => {
    // Do something with the selected class
    console.log('Selected Class:', sclass);
    setSelectedClass(sclass);

    // Fetch subjects based on selected class
    const subjectsArray = await fetchSubjects(sclass); // Replace with your actual fetch function
    const subjectNames = subjectsArray.map(subject => subject.name); // Extracting subject names
    setSubjects(subjectNames);
    console.log('Subject names:', subjectNames);
  };
  // Example fetch function (replace with your actual data fetching logic)
  const fetchSubjects = async className => {
    console.log('Fetching subjects for class:', className);
    const snapshot = await firebase
      .firestore()
      .collection('Class')
      .where('name', '==', className)
      .get();
    if (!snapshot.empty) {
      const classDoc = snapshot.docs[0];
      const subjectRefs = classDoc.data().subjects || [];

      const subjects = await Promise.all(
        subjectRefs.map(async ref => {
          const subjectDoc = await ref.get();

          return {id: subjectDoc.id, ...subjectDoc.data()};
        }),
      );
      return subjects;
    }
    return [];
  };

  const handleStudentSelect = name => {
    console.log('nameis;', name);
    setstuname(name);
  };
  const handleStuDocId = id => {
    setStuDocId(id);
    console.log(id);
  };
  const insertstumarks = async () => {
    const stuRef = firebase.firestore().doc(`Student/${stuDocId}`);
    const subRef = firebase.firestore().doc(`Subject/${subDocId}`);

    const marksData = {
      final_obt_marks: finalm,
      first_obt_marks: firstm,
      mid_obt_marks: secondm,
      student: stuRef,
      subject: subRef,
    };
    await firebase.firestore().collection('Marks').add(marksData);
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.light_bg,
            borderTopLeftRadius: 30,
            shadowColor: 'gray', // Shadow color
            shadowOpacity: 0.9, // Shadow opacity
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4, // Shadow radius
            elevation: 5,
            alignItems: 'center',
            borderTopRightRadius: 30,
            marginLeft: 5,
            marginRight: 8,
            height: 610,
          }}>
          <Text style={styles.ModalTxt}>Insert Marks</Text>
          <View style={{flexDirection: 'row', margin: 0}}>
            <DropDownclass onSelectClass={handleClassSelect} />
            <DropDownclass2
              className={selectedClass}
              selectedstudentname={handleStudentSelect}
              studocid={handleStuDocId}
            />
            {subjects ? (
              <DynamicDropDown
                data={subjects}
                selected={'select subjects'}
                width={'40%'}
                onSelect={handleSelectedSubject}
              />
            ) : (
              <DynamicDropDown
                data={subjects}
                selected={'select subjects'}
                width={'40%'}
                onSelect={handleSelectedSubject}
              />
            )}
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <TextInput  style={styles.textInput} ></TextInput> */}

            <PaperTextInput
              style={styles.textInput}
              label="Name"
              mode="outlined"
              value={stuname}
              outlineColor="#3D3B4000"
              theme={{
                roundness: 10,
              }}
              editable={false}
            />
          </View>
          <View style={styles.labelContainer}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: 10,
              }}>
              <Labeltext label="First" onChangeText={handlefirstChange} />
              <Labeltext label="Second" onChangeText={handlesecondChange} />
              <Labeltext label="Final" onChangeText={handlefinalChange} />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                mode="contained"
                style={styles.savebtn}
                onPress={insertstumarks}>
                Insert
              </Button>
            </View>
          </View>

          <View></View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalTxt: {
    fontSize: 18,
    marginTop: 20,
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 25,
  },
  textInput: {
    flex: 1,
    // Adjust border radius as needed
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30, // Adjust padding as needed
  },
  labelContainer: {
    color: 'purple',
  },
  savebtn: {
    width: 170,
  },
});

export default insertModalComponent;
