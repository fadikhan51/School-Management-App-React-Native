import React from 'react';
import {View, Modal, Text, StyleSheet, TextInput, KeyboardAvoidingView,} from 'react-native';
import DropDown from './dropdown';
import Labeltext from '../components/LabelTextfieldsTeacher';
import DropDownclass from './dropDowncsplit';
import {TextInput as PaperTextInput, Button} from 'react-native-paper';
import DropDownclass2 from './dropdownreg';

import colors from '../components/colors';

const ModalComponent = ({isVisible, onClose}) => {
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
            height: 610,
          }}>
          <Text style={styles.ModalTxt}>Insert Marks</Text>
          <View style={{flexDirection: 'row', margin: 0}}>
            <DropDownclass />
            <DropDownclass2 />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <TextInput  style={styles.textInput} ></TextInput> */}

            <PaperTextInput
              style={styles.textInput}
              label="Name"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled="true"
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
              <Labeltext label="First" />
              <Labeltext label="Second" />
              <Labeltext label="Final" />
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Button
                mode="contained"
                style={styles.savebtn}
                onPress={() => console.log('Pressed')}>
                Apply Changes
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

export default ModalComponent;
