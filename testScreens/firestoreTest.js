import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const stdRef = firestore().collection('Student');

const FireStoreTest = () => {
  const [text, setText] = useState('');
  const [stdList, setStdList] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      handleButtonPress();
    }, 10);
  
    return () => clearTimeout(timer);
  }, []);
  async function handleButtonPress() {
    const querySnapshot = await stdRef.get();
    const tempStdList = [];
    querySnapshot.forEach(doc => {
      const {
        admission_class,
        admission_date,
        caste,
        dob,
        email,
        father_name,
        gender,
        name,
        occupation,
        reg_no,
        password,
        remarks,
        residence,
      } = doc.data();
      console.log(doc.data().name);
      tempStdList.push({
        id: doc.id,
        admission_class: admission_class,
        caste: caste,
        dob: dob,
        email: email,
        father_name: father_name,
        gender: gender,
        name: name,
        occupation: occupation,
        password: password,
        reg_no: reg_no,
        remarks: remarks,
        residence: residence,
        admission_date: admission_date,
      });
    });
    console.log(tempStdList);
    setStdList(tempStdList);
  }

  return (
    <View>
      <TextInput placeholder="Enter text" value={text} onChangeText={setText} />
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
};

export default FireStoreTest;