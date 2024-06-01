import React from 'react';

import {
  View,
  Modal,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { TextInput as PaperTextInput, Button, Portal, Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../components/colors';

import Dropdownmonth from '../components/dropdownmonth'
import DropDown from '../components/dropdownreg';
import DropDowncls from '../components/dropdownClass';

import moment from 'moment';

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
  const [selectedmonth, setSelectedmonth] = React.useState("")
  const [classstu, setclassstu] = React.useState('');
  const [feeDocument, setFeeDocument] = React.useState(null);
  const [isVisibleTextFields, setIsVisibleTextFields] = React.useState(false); // State variable to control the visibility of text fields
  const [formattedDueDate, setFormattedDueDate] = React.useState('')
  const [studentDocRef, setStudentDocRef] = React.useState(null);




  const handleSelectMonth = (month) => {
    console.log('Selected month:', month);
    setSelectedmonth(month)
    // You can perform any actions with the selected month here
  };


  // Callback function to receive the selected registration number
  const handleSelectRegNo = (regNo) => {
    setSelectedRegNo(regNo);
    console.log('Selected registration number:' + regNo);
    console.log(typeof regNo);

  };

  const handleselectClass = (classStudent) => {
    setclassstu(classStudent)
    console.log("Class slecetd os" + classStudent)
  }

  const FetchFeeandUpdate = async () => {

    try {
      // Query to fetch the student reference based on the regNo
      const studentQuerySnapshot = await firebase.firestore().collection('Student')
        .where('reg_no', '==', selectedRegNo)
        .get();

      // Check if any student is found with the provided registration number
      if (studentQuerySnapshot.empty) {
        console.log('No student found with the provided registration number.');
        return null; // Or handle the error accordingly
      }

      // Assuming only one student is returned, get the document reference
      const studentDocRef = studentQuerySnapshot.docs[0].ref;

      setStudentDocRef(studentDocRef)
      // Query to fetch the fee document based on the student reference and month
      const feeQuerySnapshot = await firebase.firestore().collection('Fee')
        .where('student', '==', studentDocRef)
        .where('month', '==', selectedmonth)
        .where('class', '==', classstu)

        .get();

      // Check if any fee document is found for the student and month
      if (feeQuerySnapshot.empty) {
        console.log('No fee document found for the provided student and month.');
        return null; // Or handle the error accordingly
      }

      // Assuming only one fee document is returned, get the document data
      const feeDocument = feeQuerySnapshot.docs[0].data();

      console.log("liiii")
      // Return the fee document
      setFeeDocument(feeDocument);
      // console.log(feeDocument)
      const dueDateTimestamp = feeDocument.due_date;
      const dueDate = dueDateTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date object

      // Format the date using moment
      const formattedDueDate = moment(dueDate).format('YYYY-MM-DD');
      setFormattedDueDate(formattedDueDate)
      setMonth(feeDocument.month)
      setpayableAmount(feeDocument.payable_amount)
      setamountPaid(feeDocument.amount_paid)
      setsamountDue(feeDocument.amount_due)
      setRemarks(feeDocument.remarks)
      if (amountDue > 0) {
        setLateFees(true)
      }
      else {
        setLateFees(false)
      }
    } catch (error) {
      console.error(error)
    }

  }


  const UpdateFee = async () => {

    const amount_due1 = payableAmount - amountPaid
    const objData = {
      amount_due: parseFloat(amount_due1),
      amount_paid: parseFloat(amountPaid),
      class: classstu,
      due_date: date,
      late_fee: lateFees,
      month: month,
      payable_amount: payableAmount,
      remarks: remarks,
      student: studentDocRef


    }

    console.log("object data" + objData.amount_paid)

    try {
      // Query the fee document based on student reference, month, and class
      const feeQuerySnapshot = await firebase.firestore().collection('Fee')
        .where('student', '==', studentDocRef)
        .where('month', '==', month)
        .where('class', '==', classstu)
        .get();

      // Check if any fee document is found
      if (feeQuerySnapshot.empty) {
        console.log('No fee document found for the provided student, month, and class.');
        return; // Exit the function if no fee document is found
      }

      // Assuming only one fee document is returned, get the document reference
      const feeDocRef = feeQuerySnapshot.docs[0].ref;

      // Update the fee document using the retrieved reference
      await feeDocRef.update(objData);
      console.log('Fee document updated successfully!');
    } catch (error) {
      console.error('Error updating fee document:', error);
    }


  }







  React.useEffect(() => {

    FetchFeeandUpdate();
  }, [selectedRegNo, selectedmonth, classstu]);





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
          <Text style={styles.ModalTxt}>Update Fee Form</Text>


          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <DropDown onSelectRegNo={handleSelectRegNo} />
            <DropDowncls onSelectClassname={handleselectClass} />

          </View>
          <ScrollView >
            <View style={styles.inputContainer}>




              <View style={styles.button}>
                <Button
                  mode="contained"
                  style={styles.savebtn}
                  onPress={() => {
                    setIsVisibleTextFields(!isVisible)
                    FetchFeeandUpdate();
                  }
                  }>
                  Filter
                </Button>
              </View>








            
                    
                  <Dropdownmonth onSelectMonth={handleSelectMonth} />

                


              {feeDocument && isVisibleTextFields && (

                <View>

                  <PaperTextInput
                    style={styles.textInput}
                    label="Remarks"
                    mode="outlined"
                    outlineColor="#3D3B4000"
                    value={remarks}
                    onChangeText={(text) => {
                      setRemarks(text)
                    }}
                    theme={{
                      roundness: 10,
                    }}
                  />

                  <PaperTextInput
                    style={styles.textInput}
                    label="Amount Paid"
                    keyboardType="numeric"
                    value={amountPaid ? amountPaid.toString() : ''}

                    mode="outlined"
                    outlineColor="#3D3B4000"
                    onChangeText={(text) => {
                      setamountPaid(text)

                    }}
                    theme={{
                      roundness: 10,
                    }}
                  />


                  <Pressable onPress={showDatepicker} style={{ backgroundColor: colors.dark, borderRadius: 10, alignItems: 'center', margin: 10, padding: 10, marginTop: 20 }}>
                    <Text>Change Due Date</Text>
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






                  <PaperTextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    label="Amount Due"
                    disabled={true}
                    value={amountDue ? amountDue.toString() : ''}

                    mode="outlined"
                    outlineColor="#3D3B4000"
                    onChangeText={(text) => {
                      setsamountDue(text)
                    }}

                    theme={{
                      roundness: 10,
                    }}
                  />










                  <PaperTextInput
                    style={styles.textInput}
                    label="Payable Amount"
                    mode="outlined"
                    outlineColor="#3D3B4000"
                    value={feeDocument ? feeDocument.payable_amount.toString() : ''}
                    disabled={true}
                    onChangeText={(text) => {
                      setRemarks(text)
                    }}
                    theme={{
                      roundness: 10,
                    }}
                  />




                  <PaperTextInput
                    style={styles.textInput}
                    label="Due Date"
                    mode="outlined"
                    outlineColor="#3D3B4000"
                    value={formattedDueDate}
                    disabled={true}
                    onChangeText={(text) => {
                      setRemarks(text)
                    }}
                    theme={{
                      roundness: 10,
                    }}
                  />


                  <PaperTextInput
                    style={styles.textInput}
                    label="Late Fees"
                    mode="outlined"
                    outlineColor="#3D3B4000"
                    value={lateFees ? 'Yes' : 'No'}
                    disabled={true}
                    onChangeText={(text) => {
                      setRemarks(text)
                    }}
                    theme={{
                      roundness: 10,
                    }}
                  />










                  <View style={styles.button}>
                    <Button
                      mode="contained"
                      style={styles.savebtn}
                      onPress={() => UpdateFee()}>
                      Update Fee
                    </Button>
                  </View>
                </View>)}
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
  savebtn1: {
    height: height * 0.06,
    width: width * 0.6,
    paddingTop:20,

    margin: 15,
    justifyContent: 'center',
  },
});

export default ModalComponent;
