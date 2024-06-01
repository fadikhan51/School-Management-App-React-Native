import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';


const stdRef = firestore().collection('Student');

const FireStoreTest = () => {
  const [text, setText] = useState('');

  async function handleButtonPress() {
    // const querySnapshot = await stdRef.get();
    // querySnapshot.forEach(doc => {
    //   Alert.alert(doc.id);
    // });

    // const classRef = await firestore().collection('Class').get();
    // classRef.forEach(doc => {
    //   console.log(doc.data().name);
    // })

    console.log('Inside insert function');
    const studentData = {
      name: 'Hassan Baig',
      admission_class: {2: 'Prep'},
      admission_date: new Date('2024-04-25'),
      caste: 'Baig',
      dob: new Date('2020-08-15'),
      email: 'baig@sms.com',
      father_name: 'Jawan',
      gender: true,
      occupation: 'Business Man',
      residence: 'Islamabad',
      remarks: 'Acha bacha ha',
      password: 'student123',
      reg_no: 5,
      classes: ['Prep'],
    };

    console.log('student data declared');

    const studentRef = await stdRef.add(studentData);
    console.log('student ref created');
    const currentClass = studentData.classes[studentData.classes.length - 1];
    console.log(currentClass);

    const classRef = firestore().collection('Class');

    const classDoc = await classRef.get();
    const filteredDocs = classDoc.docs.filter(
      doc => doc.data().name === currentClass,
    );
    console.log('--------------');
    console.log(filteredDocs[0].data().name);
    const filteredDoc = filteredDocs[0];

    if (filteredDoc.exists) {
      console.log('Got the class');
      const subjectRefs = filteredDoc.data().subjects;
      const marksData = subjectRefs.map(async subjectRef => {
        const subjectDoc = await subjectRef.get();
        const subjectData = subjectDoc.data();
        return {
          student: studentRef,
          subject: subjectRef,
          first_obt_marks: Math.floor(
            Math.random() * subjectData.first_term_marks,
          ),
          mid_obt_marks: Math.floor(Math.random() * subjectData.mid_term_marks),
          final_obt_marks: Math.floor(
            Math.random() * subjectData.final_term_marks,
          ),
          year:
            studentData.admission_date.getFullYear() +
            (studentData.classes.length - 1),
        };
      });
      const marksCollection = firestore().collection('Marks');
      const marksDataResolved = await Promise.all(marksData);
      await Promise.all(
        marksDataResolved.map(markData => marksCollection.add(markData)),
      );

      const studentsArray = filteredDoc.data().students || [];
      studentsArray.push(studentRef);
      console.log(`id : ${filteredDocs[0].id}`);
      const classDoc = await firestore()
      .collection('Class')
      .doc(filteredDocs[0].id)
      .get();

        

      console.log(classDoc.ref);  
      const classDocRef = classDoc.ref;
      await classDocRef.update({
        students: firestore.FieldValue.arrayUnion(...studentsArray),
      });
    } else {
      Alert.alert('Class not found');
    }

    if (studentData.classes.length > 1) {
      for (let i = studentData.classes.length - 2; i >= 0; i--) {
        const prevClass = studentData.classes[i];
        const prevClassRef = firestore()
          .collection('Class')
          .where('name', '==', prevClass);
        const prevClassDoc = await prevClassRef.get();
        console.log(prevClassDoc.docs[0].data().name)
        if (prevClassDoc.docs[0].exists) {
          const prevSubjectRefs = prevClassDoc.docs[0].data().subjects;
          const prevMarksData = prevSubjectRefs.map(async subjectRef => {
            const subjectDoc = await subjectRef.get();
            const subjectData = subjectDoc.data();
            return {
              student: studentRef,
              subject: subjectRef,
              first_obt_marks: Math.floor(
                Math.random() * subjectData.first_term_marks,
              ),
              mid_obt_marks: Math.floor(
                Math.random() * subjectData.mid_term_marks,
              ),
              final_obt_marks: Math.floor(
                Math.random() * subjectData.final_term_marks,
              ),
              year:
                studentData.admission_date.getFullYear() +
                (studentData.classes.length - 2),
            };
          });
          const prevMarksCollection = firestore().collection('Marks');
          const prevMarksDataResolved = await Promise.all(prevMarksData);
          await Promise.all(
            prevMarksDataResolved.map(markData =>
              prevMarksCollection.add(markData),
            ),
          );
        } else {
          Alert.alert('Previous class not found');
        }
      }
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
