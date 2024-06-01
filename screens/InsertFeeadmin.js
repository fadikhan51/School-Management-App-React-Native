import React from 'react';

import {
  View,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { TextInput as PaperTextInput, Button, Portal, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../components/colors';
import DropDown from '../components/dropdownreg';
import Dropdowncls from '../components/dropdownClass'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const ModalComponent = ({ isVisible, onClose }) => {
  const [lateFees, setLateFees] = React.useState(false);
  const [month, setMonth] = React.useState('');
  const [amountDue, setsamountDue] = React.useState(0);
  const [amountPaid, setamountPaid] = React.useState(0);
  const [payableAmount, setpayableAmount] = React.useState(0);
  const [dueDate, setdueDate] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [selectedRegNo, setSelectedRegNo] = React.useState('');
  const [classstu, setclassstu] = React.useState('');



  // Callback function to receive the selected registration number
  const handleSelectRegNo = (regNo) => {
    setSelectedRegNo(regNo);
    console.log('Selected registration number:' + regNo);
    console.log(typeof regNo);

  };



  const handleselectClass= (classStudent) =>{
    setclassstu(classStudent)
    console.log("Class slecetd os"+classStudent)
  }


  const InsertFee = async () => {
    try {

      console.log("hahks"+selectedRegNo);
      const studentQuerySnapshot = await firebase.firestore().collection('Student')
      .where('reg_no', '==', selectedRegNo)
      .get();

        if (studentQuerySnapshot.empty) {
          console.log('No student found with the provided registration number.');
          return;
        }
  
      if (!studentQuerySnapshot.empty) {
        const studentDoc = studentQuerySnapshot.docs[0];
        const studentData = studentDoc.data();
  
        console.log(studentData);
        // Get today's date
        const today = new Date();
  
        // Add 3 days to today's date
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 3);
  
        // Set the time to 00:00:00
        dueDate.setHours(0, 0, 0, 0);
  
        // Format the due date as "DD MMMM YYYY HH:mm:ss" (e.g., "21 June 2024 00:00:00")
        const formattedDueDate = `${dueDate.getDate()} ${dueDate.toLocaleString('default', { month: 'long' })} ${dueDate.getFullYear()} ${dueDate.getHours().toString().padStart(2, '0')}:${dueDate.getMinutes().toString().padStart(2, '0')}:${dueDate.getSeconds().toString().padStart(2, '0')}`;
  
        setdueDate(formattedDueDate);
        
        // Construct fee data
        const feeData = {
          student: studentDoc.ref,
          month: month,
          amount_due: parseFloat(payableAmount),
          amount_paid: parseFloat(amountPaid),
          payable_amount: parseFloat(payableAmount),
          remarks: remarks,
          late_fee: lateFees,
          due_date: date,
          class:classstu // Assuming dueDate is correctly formatted
        };
  
        console.log('Fee data to be inserted:', feeData);
  
        try{
        // Insert fee data into Firestore
        await firestore().collection('Fee').add(feeData);    


        console.log('Fee data inserted successfully');
        }
      
      catch(error){
        console.log(error)
      }} else {
        console.log('No student found with the provided registration number.');
      }
    } catch (error) {
      console.error('Error inserting fee data:', error);
    }
  };


  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };







      return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
        <View style={styles.container}>
          <Text style={styles.ModalTxt}>Insert Fee Form</Text>
          <DropDown onSelectRegNo={handleSelectRegNo} />
          <Dropdowncls onSelectClassname={handleselectClass}/>

          <ScrollView >
            <View style={styles.inputContainer}>



              <PaperTextInput
                style={styles.textInput}
                label="Month"
                mode="outlined"
                outlineColor="#3D3B4000"

                onChangeText={(text) => {
                  setMonth(text)
                }}

                theme={{
                  roundness: 10,
                }}
              />



              






              <PaperTextInput
                style={styles.textInput}
                label="Fee Amount"
                keyboardType="numeric"
                mode="outlined"
                onChangeText={(text) => {
                  setpayableAmount(text)
                }}
                outlineColor="#3D3B4000"
                theme={{
                  roundness: 10,
                }}
              />


                

              <View style={{
                flexDirection: 'row', alignItems: 'center', width: '80%', // Adjust width as needed
                height: 60, marginTop: '10'
              }}>
                <Switch
                  value={lateFees}
                  onValueChange={(newValue) => setLateFees(newValue)}
                  color="green" // You can change the color of the switch
                />
                <Text style={{ marginLeft: 10, color: 'black' }}>Late Fees</Text>
              </View>



              <PaperTextInput
                style={styles.textInput}
                label="Remarks"
                mode="outlined"
                outlineColor="#3D3B4000"

                onChangeText={(text) => {
                  setRemarks(text)
                }}
                theme={{
                  roundness: 10,
                }}
              />


             



              <Pressable onPress={showDatepicker} style={{backgroundColor: colors.light, borderRadius: 10,alignItems:'center', margin:10,padding:10, marginTop:20}}>
        <Text>Show date picker!</Text> 
      </Pressable>
      <Pressable onPress={showTimepicker} style={{backgroundColor: colors.light, borderRadius: 10, alignItems:'center', margin:10,padding:10}}>
        <Text>Show time picker!</Text> 
      </Pressable>
      
      {show && (
        <DateTimePicker
        style={{ backgroundColor: 'blue', color: 'black' }} 
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
     
      
    

            </View>

            <View style={styles.button}>
                <Button
                  mode="contained"
                  style={styles.savebtn}
                  onPress={() => InsertFee()}>
                  Insert Fee

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
