import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../hinaComponents/ModalComponent';
import InsertModalComponent from '../hinaComponents/insertModalComponent';
import firebase from '@react-native-firebase/app';
import colors from '../components/colors';

const InsertMarksTeacher = ({ navigation, route }) => {
  const [insertfirst, setinsertfirst] = useState('');
  const [insertsecond, setinsertsecond] = useState('');
  const [insertfinal, setinsertfinal] = useState('');
  const [editclass, seteditclass] = useState('');
  const [editname, seteditname] = useState('');
  const [editfirst, seteditfirst] = useState('');
  const [editmid, seteditmid] = useState('');
  const [editfinal, seteditfinal] = useState('');
  const [subjectRef, setsubjectRef] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [stuEditData, setStuEditData] = useState('');
  const [editregno, seteditregno] = useState('');
  const [insertmodalVisible, setinsertModalVisible] = useState(false);
  const [hinavisible, setHinaVisible] = useState(false);
  const [StudentTable, setStudentTable] = useState('');
  const [SubjectTable, setSubjectTable] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacher('7ry2L6PntiWK6hB7DS28');
  }, []);

  const fetchTeacher = async (teacherId) => {
    try {
      //  // Reference to the teacher document
      // const teacherRef = firebase.firestore().doc(`Teacher/${teacherId}`);

      // // Query to find all classes assigned to the teacher
      // const classQuerySnapshot = await firebase
      //   .firestore()
      //   .collection('Class')
      //   .where('assigned_teacher', '==', teacherRef)
      //   .get();
       // Reference to the teacher document
       const teacherRef = firebase.firestore().doc(`Teacher/${teacherId}`);

       // Query to find all classes assigned to the teacher
       const classQuerySnapshot = await firebase
         .firestore()
         .collection('Class')
         .where('assigned_teacher', '==', teacherRef)
         .get();

      if (!classQuerySnapshot.empty) {
        const studentMarksData = [];

        await Promise.all(
          classQuerySnapshot.docs.map(async classDoc => {
            const classData = classDoc.data();
            const students = classData.students;
            const subjects = classData.subjects;
            const className = classData.name;

            await Promise.all(
              students.map(async studentRef => {
                const studentDocSnapshot = await studentRef.get();
                if (studentDocSnapshot.exists) {
                  const student = studentDocSnapshot.data();
                  const admissionDateInMillis = student.admission_date.seconds * 1000;
                  const admissionDate = new Date(admissionDateInMillis);
                  const admissionYear = admissionDate.getFullYear();
                  const year1 = admissionYear + student.classes.length - 1;

                  await Promise.all(
                    subjects.map(async subRef => {
                      const subDocSnapshot = await subRef.get();
                      if (subDocSnapshot.exists) {
                        const subject = subDocSnapshot.data();
                        const marksQuerySnapshot = await firebase
                          .firestore()
                          .collection('Marks')
                          .where('student', '==', studentRef)
                          .where('subject', '==', subRef)
                          .get();

                        if (!marksQuerySnapshot.empty) {
                          marksQuerySnapshot.forEach(marksDoc => {
                            const marksData = marksDoc.data();
                            seteditname(student.name);
                            seteditclass(className);
                            seteditfinal(marksData.final_obt_marks);
                            seteditmid(marksData.mid_obt_marks);
                            seteditfirst(marksData.first_obt_marks);
                            setsubjectRef(marksData.subject);
                            seteditregno(student.reg_no);
                            setStudentTable(studentRef);
                            setSubjectTable(subRef);

                            studentMarksData.push({
                              regno: student.reg_no,
                              name: student.name,
                              className: className,
                              first: marksData.first_obt_marks,
                              mid: marksData.mid_obt_marks,
                              final: marksData.final_obt_marks,
                              subject: marksData.subject,
                              sturef: studentRef,
                              subref: subRef,
                            });
                          });
                        }
                      }
                    }),
                  );
                }
              }),
            );
          }),
        );

        setStudentData(studentMarksData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  const handleDlt = async (regno) => {
    try {
      const studentQuerySnapshot = await firebase
        .firestore()
        .collection('Student')
        .where('reg_no', '==', regno)
        .get();

      if (studentQuerySnapshot) {
        const studoc = studentQuerySnapshot.docs[0].id;
        const stuRef = firebase.firestore().doc(`Student/${studoc}`);

        const marksQuerySnapshot = await firebase
          .firestore()
          .collection('Marks')
          .where('student', '==', stuRef)
          .where('subject', '==', item.subject)
          .get();

        const deletePromises = marksQuerySnapshot.docs.map(async (doc) => {
          await doc.ref.delete();
        });

        await Promise.all(deletePromises);
        console.log('Marks successfully deleted for regno:', regno);
      }
    } catch (error) {
      console.error('Error deleting marks:', error);
    }
  };

  return (
    loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color={colors.dark}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={[styles.headerTxt, { alignSelf: 'center' }]}>Teacher</Text>
          <TouchableOpacity
            style={styles.download}
            onPress={() => setinsertModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={30}
              color={colors.dark}
            />
          </TouchableOpacity>
        </View>
        <InsertModalComponent
          isVisible={insertmodalVisible}
          onClose={() => setinsertModalVisible(false)}
          first={setinsertfirst}
          second={setinsertsecond}
          final={setinsertfinal}
        />
        <ModalComponent
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={stuEditData}
        />
        {!insertmodalVisible && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Searchbar
              placeholder="Search"
              iconColor={colors.dark}
              style={{ margin: 20, backgroundColor: '#DCDCDC' }}
            />
            <Button
              mode="contained"
              buttonColor={colors.dark}
              contentStyle={styles.searchTxt}
              style={styles.searchBtn}
              onPress={() => console.log('Pressed')}
            >
              Search
            </Button>
          </View>
        )}
        {!insertmodalVisible && (
          <ScrollView horizontal>
            <FlatList
              data={studentData}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.marks}>FA21-BCS-0{item.regno}</Text>
                  <Text style={styles.subjectName}>{item.subjectName}</Text>
                  <View style={styles.marksContainer}>
                    <Text style={styles.marks}>{item.first}/100</Text>
                    <Text style={styles.marks}>{item.mid}/100</Text>
                    <Text style={styles.marks}>{item.final}/100</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setStuEditData(item);
                      setModalVisible(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={30}
                      color={colors.dark}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editButton, { marginRight: 15 }]}
                    onPress={() => handleDlt(item.regno)}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={30}
                      color={colors.dark}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        )}
      </View>
    )
  );
}


const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    height: 50,
    borderColor: 'rgb(237, 221, 246)',
  },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//     height: 60,
//     borderBottomWidth: 1,
//     borderColor: colors.dark,
//     paddingHorizontal: 10,
//     width: '100%',
//   },
  name: {
    flex: 1,
    textAlign: 'center',
    color: colors.dark,
    // padding:20,
  },
  marks: {
    marginLeft: 30,
    flex: 1,
    textAlign: 'left',
    color: colors.dark,
    marginRight: 20,
  },
  subjectName: {
    // marginLeft: 20,
    flex: 1,
    textAlign: 'left',
    color: colors.dark,
    marginRight: 20,
    color: 'green',
  },
  marksContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editButton: {
    flex: 0.5,
    alignItems: 'center',
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTxt: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  FirstRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    marginLeft: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(237, 221, 246)',
    borderColor: 'rgb(237, 221, 246)',
  },
  searchBtn: {
    height: 60,
    width: '90%',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default InsertMarksTeacher;
