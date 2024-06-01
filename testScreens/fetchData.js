import React, {useState, useEffect} from 'react';
import {View, TextInput, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const clsRef = firestore().collection('Class');
const stdRef = firestore().collection('Student');

const FireStoreTest = () => {
  const [text, setText] = useState('');
  const [stdList, setStdList] = useState([]);
  const [clsList, setClsList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleButtonPress();
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  async function handleButtonPress() {
    try {
      const querySnapshot = await clsRef.get();
      const tempList = [];
      for (const cls of querySnapshot.docs) {
        const {assigned_teacher, students, subjects} = cls.data();

        const studentDataPromises = students.map(studentRef =>
          studentRef.get(),
        );
        const studentDocs = await Promise.all(studentDataPromises);
        const studentData = studentDocs.map(studentDoc => {
          const data = studentDoc.data();
          console.log(data); // Print each student object
          return {
            ...data,
            _documentPath: studentDoc.ref.path,
            _firestore: studentDoc.firestore,
          };
        });

        const subjectDataPromises = subjects.map(subjectRef =>
          subjectRef.get(),
        );
        const subjectDocs = await Promise.all(subjectDataPromises);
        const subjectData = subjectDocs.map(subjectDoc => {
          const data = subjectDoc.data();
          console.log(data); // Print each subject object
          return {
            ...data,
            _documentPath: subjectDoc.ref.path,
            _firestore: subjectDoc.firestore,
          };
        });

        tempList.push({
          assigned_teacher: {
            ...assigned_teacher,
            _documentPath: cls.ref.path,
            _firestore: cls.firestore,
          },
          students: studentData,
          subjects: subjectData,
        });
      }
      setClsList(tempList);
    } catch (error) {
      console.error('Error fetching class documents: ', error);
    }
  }

  return (
    <View>
      <TextInput placeholder="Enter text" value={text} onChangeText={setText} />
      <Button title="Press Me" onPress={handleButtonPress} />
    </View>
  );
};

export default FireStoreTest;