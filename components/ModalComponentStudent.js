import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {TextInput as PaperTextInput, Button} from 'react-native-paper';

import colors from '../components/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ModalComponent = ({isVisible, onClose}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={{flex: 1, justifyContent: 'flex-end', padding:10}}>
        <View style={styles.container}>
          <Text style={styles.ModalTxt}>Admission Form</Text>

          <ScrollView style={styles.inputContainer}>
            <PaperTextInput
              style={styles.textInput}
              label="Name"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={false}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Registration Number"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Date of Admission"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Date of Birth"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Gender"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Father Name"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Admission Class"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Email"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Password"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <PaperTextInput
              style={styles.textInput}
              label="Remarks"
              mode="outlined"
              outlineColor="#3D3B4000"
              disabled={true}
              theme={{
                roundness: 10,
              }}
            />

            <View style={styles.button}>
              <Button
                mode="contained"
                style={styles.savebtn}
                onPress={() => console.log('Pressed')}>
                Apply Changes
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light_bg,
    shadowColor: 'gray', // Shadow color
    elevation: 1,
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: height * 0.9,
  },
  ModalTxt: {
    marginTop: 20,
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 25,
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  textInput: {
    marginTop: 10,
  },
  labelContainer: {
    color: 'purple',
  },
  savebtn: {
    height: height * 0.06,
    width: width * 0.6,
    margin: 15,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalComponent;
