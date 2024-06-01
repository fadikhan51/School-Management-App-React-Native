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
import DropDownclass from './dropDowncsplit2';
import {TextInput as PaperTextInput, Button} from 'react-native-paper';
import DropDownclass2 from './dropdownreg2';
import firebase from '@react-native-firebase/app';

import colors from '../components/colors';

const ModalComponent = ({
  isVisible,
  onClose,
  data,
  // editname,
  // editclass,
  // editfinal,
  // editmid,
  // editfirst,
  // editregno,
}) => {
  console.log(
    'moeez',
    data.name,
    data.first,
    data.mid,
    data.final,
    data.subref,
    data.sturef,
  );
  const [firstm, setfirstm] = React.useState(data.first || '');
  const [secondm, setsecondm] = React.useState(data.mid || '');
  const [finalm, setfinalm] = React.useState(data.final || '');
  const handlefirstChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    // first(newText);
    setfirstm(newText);
  };
  const handleSave = async () => {
    try {
      console.log(
        'Fetching marks for student:',
        data.sturef.id,
        'and subject:',
        data.subref.id,
      );

      const marksQuerySnapshot = await firebase
        .firestore()
        .collection('Marks')
        .where('student', '==', data.sturef)
        .where('subject', '==', data.subref)
        .get();

      if (!marksQuerySnapshot.empty) {
        console.log('Marks document found');
        const marksData = {
          final_obt_marks: finalm,
          first_obt_marks: firstm,
          mid_obt_marks: secondm,
          student: data.sturef,
          subject: data.subref,
          year: 2024,
        };
        console.log('Marks document data:', finalm, firstm, secondm);

        const docId = marksQuerySnapshot.docs[0].id;
        await firebase
          .firestore()
          .collection('Marks')
          .doc(docId)
          .update(marksData);
        console.log('Marks document updated successfully');
        onClose();
      } else {
        console.log(
          'No existing marks document found for the given student and subject',
        );
      }
    } catch (error) {
      console.error('Error updating marks document:', error);
    }
  };

  const handlesecondChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    // second(newText);
    setsecondm(newText);
  };
  const handlefinalChange = newText => {
    // Do something with the updated value, such as storing it in the parent component's state
    console.log('New text:', newText);
    // final(newText);
    setfinalm(newText);
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View
        style={{flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: colors.light_bg,
            borderTopLeftRadius: 30,
            shadowColor: 'black', // Shadow color
            shadowOpacity: 0.3, // Shadow opacity
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
            height: 700,
          }}>
          <Text style={styles.ModalTxt}>Insert Marks</Text>
          <View style={{flexDirection: 'row', margin: 0}}>
            <DropDownclass sClass={data.className} />
            <DropDownclass2 reg={data.regno} />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <TextInput  style={styles.textInput} ></TextInput> */}

            <PaperTextInput
              style={styles.textInput}
              label="Name"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled="true"
              value={data.name}
              theme={{
                roundness: 10,
              }}
            />
          </View>
          <View style={styles.labelContainer}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: 10,
              }}>
              {/* <PaperTextInput
              style={styles.textInput}
              label="First"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled="true"
              value={editfirst}
              theme={{
                roundness: 10,
              }}
            />
            <PaperTextInput
              style={styles.textInput}
              label="Mid"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled="true"
              value={editmid}
              theme={{
                roundness: 10,
              }}
            />
            <PaperTextInput
              style={styles.textInput}
              label="Name"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled="true"
              value={editname}
              theme={{
                roundness: 10,
              }}
            /> */}
              {/* <Labeltext
                label="First"
                marks={data.first}
                onChangeText={handlefirstChange}
              /> */}
              <Text>First</Text>
              <PaperTextInput
              style={{width: 200}}
               placeholder="First"
                value={firstm}
                onChangeText={(text)=>setfirstm(text)}
              />
              <Text>Mid</Text>
              <PaperTextInput
              style={{width: 200}}
               placeholder="Second"
                value={secondm}
                onChangeText={(text)=>setsecondm(text)}
              />
              {/* <Labeltext
                label="Final"
                marks={finalm}
                onChangeText={(text)=>setfinalm(text)}
              /> */}
              <Text>Final</Text>
              <PaperTextInput
              style={{width: 200}}
              placeholder="Final"
              value={finalm}
              onChangeText={(text)=>setfinalm(text)}
            />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                mode="contained"
                style={styles.savebtn}
                onPress={handleSave}>
                Apply changes
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
    color: colors.dark,
  },
  labelContainer: {
    color: 'purple',
  },
  savebtn: {
    width: 170,
  },
});

export default ModalComponent;
