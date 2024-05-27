import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const stdRef = firestore().collection('Student');

const FireStoreTest = () => {
  const [text, setText] = useState('');

  async function handleButtonPress() {
    const querySnapshot = await stdRef.get();
    querySnapshot.forEach(doc => {
      Alert.alert(doc.id);
    });
  }

  return (
    <View>
      <TextInput placeholder="Enter text" value={text} onChangeText={setText} />
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
};

export default FireStoreTest;
