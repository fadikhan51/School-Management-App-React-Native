import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {StatusBar} from 'react-native';
import {Searchbar, Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../components/ModalComponent';
import InsertModalComponent from '../components/insertModalComponent';
import {
  getFirestore,
  where,
  query,
  getDocs,
} from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import {stopUpload} from 'react-native-fs';

import colors from '../components/colors';

const InsertMarksTeacher1 = () => {
  // const [modalVisible, setModalVisible] = React.useState(false);
  const [insertfirst, setinsertfirst] = React.useState('');
  const [insertsecond, setinsertsecond] = React.useState('');
  const [insertfinal, setinsertfinal] = React.useState('');
  const [editclass, seteditclass] = React.useState('');
  const [editname, seteditname] = React.useState('');
  const [editfirst, seteditfirst] = React.useState('');
  const [editmid, seteditmid] = React.useState('');
  const [editfinal, seteditfinal] = React.useState('');
  const [subjectRef, setsubjectRef] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [stuEditData, setStuEditData] = React.useState('');

  const [editregno, seteditregno] = React.useState('');
  const [insertmodalVisible, setinsertModalVisible] = React.useState(false);
  const [hinavisible, setHinaVisible] = React.useState(false);
  // const [modalVisible, setModalVisible] = React.useState(false);
  const [StudentTable, setStudentTable] = React.useState('');
  const [SubjectTable, setSubjectTable] = React.useState('');
  const [studentData, setStudentData] = React.useState([]);

  const classes = [
    {Name: 'Fatima Nadeem', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Intahal Tallat', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Hina Jawaid', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Abdullah Imran', First_Term: 10, Second_Term: 10, Third_Term: 10},

    {Name: 'Abdullah Imran', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Junaid Khan', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {
      Name: 'Kahn Chishti Khan',
      First_Term: 10,
      Second_Term: 10,
      Third_Term: 10,
    },
    {Name: 'Abdullah Imran', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Junaid Khan', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {
      Name: 'Kahn Chishti Khan',
      First_Term: 10,
      Second_Term: 10,
      Third_Term: 10,
    },
    {
      Name: 'Kahn Chishti Khan',
      First_Term: 10,
      Second_Term: 10,
      Third_Term: 10,
    },
    {Name: 'Abdullah Imran', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {Name: 'Junaid Ali Khan', First_Term: 10, Second_Term: 10, Third_Term: 10},
    {
      Name: 'Kahn Chishti Khan',
      First_Term: 10,
      Second_Term: 10,
      Third_Term: 10,
    },
  ];
  const fetchinfo = item => {
    console.log('infetchinfo');
  };
  const handlinsertfirst = txt => {
    setinsertfirst(txt);
    // console.log('old text:', insertfirst);
  };
  const handleDlt = regno => {
    console.log(regno);
  };
  React.useEffect(() => {
    fetchTeacher('7ry2L6PntiWK6hB7DS28');
  }, []);
  const fetchTeacher = async teacherId => {
    try {
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

        // Process each class document
        await Promise.all(
          classQuerySnapshot.docs.map(async classDoc => {
            // console.log(classDoc.data().name);
            const classData = classDoc.data();
            const students = classData.students;
            const subjects = classData.subjects;
            const className = classData.name;

            // Process each student in the class
            await Promise.all(
              students.map(async studentRef => {
                const studentDocSnapshot = await studentRef.get();

                if (studentDocSnapshot.exists) {
                  const student = studentDocSnapshot.data();
                  console.log('Student Name:', student.name);
                  const admissionDateInMillis =
                    student.admission_date.seconds * 1000;
                  const admissionDate = new Date(admissionDateInMillis);
                  const admissionYear = admissionDate.getFullYear();
                  console.log(admissionYear);
                  const year1 = admissionYear + student.classes.length - 1;
                  console.log('lulu', year1);

                  //map for subjects
                  await Promise.all(
                    subjects.map(async subRef => {
                      const subDocSnapshot = await subRef.get();

                      if (subDocSnapshot.exists) {
                        const subject = subDocSnapshot.data();
                        console.log('Sub Name:', subject.name);
                        const marksQuerySnapshot = await firebase
                          .firestore()
                          .collection('Marks')
                          .where('student', '==', studentRef)
                          .where('subject', '==', subRef)
                          .get();

                        if (!marksQuerySnapshot.empty) {
                          marksQuerySnapshot.forEach(marksDoc => {
                            const marksData = marksDoc.data();
                            // console.log('get marks', marksData.first_obt_marks);
                            seteditname(student.name);
                            seteditclass(className);
                            seteditfinal(marksData.final_obt_marks);
                            seteditmid(marksData.mid_obt_marks);
                            seteditfirst(marksData.first_obt_marks);
                            setsubjectRef(marksData.subject);
                            seteditregno(student.reg_no);
                            setStudentTable(studentRef);
                            setSubjectTable(subRef);

                            // console.log(
                            //   'Student Name 5:',
                            //   className,
                            //   marksData.final_obt_marks,
                            // );

                            // Add student marks data to the array
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
                              subjectName: subject.name,
                              year: year1,
                            });
                          });
                        }
                      }
                    }),
                  );
                  // Query to find marks for the student
                  // const marksQuerySnapshot = await firebase
                  //   .firestore()
                  //   .collection('Marks')
                  //   .where('student', '==', studentRef)
                  //   .get();
                }
              }),
            );
          }),
        );

        setStudentData(studentMarksData);
        console.log('Student Data:', studentMarksData);
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };
  const count = 0;
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.dark}
          />
        </View>
        <View>
          <Text style={[styles.headerTxt, {alignSelf: 'center'}]}>Teacher</Text>
        </View>
        <View style={styles.download}>
          <TouchableOpacity
            onPress={() => {
              // setHinaVisible(true);
              setinsertModalVisible(true);
            }}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={30}
              color={colors.dark}
            />
          </TouchableOpacity>
        </View>
      </View>
      <InsertModalComponent
        isVisible={insertmodalVisible}
        onClose={() => {
          // setHinaVisible(false);

          setinsertModalVisible(false);
        }}
        first={handlinsertfirst}
        second={txt => setinsertsecond(txt)}
        final={txt => setinsertfinal(txt)}
      />
      <ModalComponent
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);

          // setHinaVisible(true);
        }}
        data={stuEditData}
      />

      {!insertmodalVisible && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Searchbar
            placeholder="Search"
            iconColor={colors.dark}
            style={{margin: 20, backgroundColor: '#DCDCDC'}}
          />
          <Button
            mode="contained"
            buttonColor={colors.dark}
            contentStyle={styles.searchTxt}
            style={styles.searchBtn}
            onPress={() => console.log('Pressed')}>
            Search
          </Button>
        </View>
      )}

      {!insertmodalVisible && (
        <ScrollView horizontal>
          <View>
            <FlatList
              data={studentData}
              renderItem={({item}) => (
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
                      // setHinaVisible(true);
                      setModalVisible(true);
                      console.log(editclass);
                    }}>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={30}
                      color={colors.dark}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editButton, {marginRight: 15}]}
                    onPress={async () => {
                      try {
                        console.log(item.regno);
                        // Step 1: Get the reference of the student document where reg_no matches
                        const studentQuerySnapshot = await firebase
                          .firestore()
                          .collection('Student')
                          .where('reg_no', '==', item.regno)
                          .get();
                        if (studentQuerySnapshot) {
                          const studoc = studentQuerySnapshot.docs[0].id;
                          const stuRef = firebase
                            .firestore()
                            .doc(`Student/${studoc}`);
                          // console.log(stuRef);
                          console.log(item.subject);
                          const marksQuerySnapshot = await firebase
                            .firestore()
                            .collection('Marks')
                            .where('student', '==', stuRef)
                            .where('subject', '==', item.subject)
                            .get();

                          const deletePromises = marksQuerySnapshot.docs.map(
                            async doc => {
                              await doc.ref.delete();
                              console.log(
                                'Document successfully deleted:',
                                doc.id,
                              );
                            },
                          );
                        }
                      } catch (error) {
                        console.error('Error deleting marks:', error);
                      }
                    }}>
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};

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

export default InsertMarksTeacher1;
