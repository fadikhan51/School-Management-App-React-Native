
import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCheckbox from '../components/checkBox';
import colors from '../components/colors';
import HeaderDefault from '../components/defaultHeader';
import AccordionScreen from '../fatimaComponents/accordianTest';
import {ModalPoup} from './adminStudentScreen';
import {TextInput, Button} from 'react-native-paper';

const StudentFeeScreen = () => {
  const [feeRecords, setFeeRecords] = React.useState([]);
  const [txtinput, settxtinput] = React.useState('');

  const [checkedStates, setCheckedStates] = React.useState([
    false, // Nursery
    false, // Prep
    false, // Class 1
    false, // Class 2
    false, // Class 3
    false, // Class 4
    false, // Class 5
    false, // Class 6
    false, // Class 7
    false, // Class 8
  ]);
  const toggleCheckbox = index => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const labels = [
    'Nursery',
    'Prep',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
  ];
  const fetchStudentInfo = async (regNo) => {
    try {
        // First, query the 'Student' collection based on the registration number

        regNo=parseInt(regNo,10)
        const studentQuerySnapshot = await firebase.firestore().collection('Student')
            .where('reg_no', '==', regNo)
            .get();

          

        // Check if a student document with the provided registration number exists
        if (!studentQuerySnapshot.empty) {
            // Assuming there's only one student document with the given registration number
            const studentDoc = studentQuerySnapshot.docs[0]; // Get the first document
            const studentRef = studentDoc.ref; // Get the reference to the student document

            console.log(studentDoc)
            // Query 'Fee' records where the 'student' field matches the reference to the student document
            const feeQuerySnapshot = await firebase.firestore().collection('Fee')
                .where('student', '==', studentRef)
                .get();
                const fetchedFeeRecords = [];
                    feeQuerySnapshot.forEach((doc) => {
                      const dataWithRef = { ...doc.data(), docRef: doc.ref };
                      fetchedFeeRecords.push(dataWithRef);
                    });

            if (!feeQuerySnapshot.empty) {
                feeQuerySnapshot.forEach((doc) => {
                    console.log('Fee Record:', doc.data());
                });
                console.log('Fetched Fee Records...:', fetchedFeeRecords);
                setFeeRecords(fetchedFeeRecords); 
            } else {
                console.log('No fee records found for this student.');
            }
        } else {
            console.log('No student found with reg no:', regNo);
        }
    } catch (error) {
        console.error('Error fetching fee records:', error);
    }
};

  return (
    <>
      <HeaderDefault
        title="Fee Details"
        leftIcon="arrow-left"
        rightIcon="logout"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Search by Reg no'}
          onChangeText={(text)=>{

            setText(text)

          }}
        />
        <ModalPoup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <Text
                style={{alignSelf: 'center', fontSize: 20, color: colors.dark}}>
                Apply Filter
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={25}
                  color={colors.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.Scontainer}>
            {labels.map((label, index) => (
              <CustomCheckbox
                key={index}
                label={label}
                checked={checkedStates[index]}
                setChecked={() => toggleCheckbox(index)}
              />
            ))}
          </ScrollView>
        </ModalPoup>
        <TouchableOpacity
          style={{paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => setVisible(true)}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={30}
            color={colors.dark}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            fetchStudentInfo(text)
          }}>
          Search
        </Button>
      </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Amount</Text>
            <Text style={styles.tableHeaderCell}>Status</Text>
            <Text style={styles.tableHeaderCell}>Due Date</Text>
          </View>
          
        </View>
        { feeRecords.length>0  &&    <AccordionScreen feeRecords={feeRecords} />}
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    width: '95%',
    alignSelf: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  tableHeaderCell: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.dark,
    
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableDataCell: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.dark,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Scontainer: {
    paddingVertical: 16,
  },
  txtInput: {
    width: '85%',
    marginLeft: 5,
    backgroundColor: 'white',
  },
  searchTxt: {
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  searchBtn: {
    margin: 20,
    height: 60,
  },
});

export default StudentFeeScreen;
