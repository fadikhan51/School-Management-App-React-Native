import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,Text,ScrollView
  
} from 'react-native';
import Accordion from '../src/components/sylAccordian';
import HeaderDefault from '../components/defaultHeader';
import firestore from '@react-native-firebase/firestore';

const stdRef = firestore().collection('Student');
const classRef = firestore().collection('Class');
const subjectsRef = firestore().collection('Subjects');

const StuSyllabusScreen = ({navigation}) => {
  const [syllabus, setSyllabus] = useState([]);
  const [imgURLs, setImgURLs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentId = 'zllw0RwAK4VvWfkBr4m5'; // Provided student ID

        const studentDoc = await stdRef.doc(studentId).get();
        const studentData = studentDoc.data();

        if (studentData) {
          const classes = Object.entries(studentData.admission_class);
          if (classes.length > 0) {
            const [classId, classInfo] = classes[0];
            console.log('Class:', classId, classInfo);

            const classDoc = await classRef.doc(classId).get();
            if (classDoc.exists) {
              const classData = classDoc.data();
              console.log('Class Data:', classData);

              if (classData && classData.subjects) {
                setSyllabus(classData.subjects);
                fetchSyllabusImages(classData.subjects);
              } else {
                console.error('Subjects data not found for the class');
              }
            } else {
              console.log('Class document does not exist:', classId);
            }
          } else {
            console.error('Student is not enrolled in any class');
          }
        } else {
          console.error('Student data not found');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchData();
  }, []);

  const fetchSyllabusImages = async (subjects) => {
    try {
      const imgURLsArray = [];
      for (const subjectId of subjects) {
        const subjectDoc = await subjectsRef.doc(subjectId).get();
        if (subjectDoc.exists) {
          const subjectData = subjectDoc.data();
          if (subjectData && subjectData.syllabus) {
            const syllabusImage = subjectData.syllabus;
            imgURLsArray.push(`{subjectId, url: data:image/png;base64,${syllabusImage}}`);
          } else {
            console.log(`Syllabus image not found for subject ${subjectId}`);
          }
        } else {
          console.log(`Subject document ${subjectId} does not exist`);
        }
      }
      setImgURLs(imgURLsArray);
    } catch (error) {
      console.error('Error fetching syllabus images: ', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderDefault
        title="Syllabus"
        leftIcon="arrow-left"
        rightIcon="folder-download-outline"
      />
      <ScrollView>
        {imgURLs.map((item) => (
          <SyllabusImage key={item.subjectId} imgURL={item.url} />
        ))}
        <Accordion syllabus={syllabus} />
      </ScrollView>
    </View>
  );
};

const SyllabusImage = ({imgURL}) => {
  const [dialog, setDialog] = useState(false);

  return (
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={() => setDialog(true)}>
        {imgURL ? (
          <Image style={styles.img} source={{uri: imgURL}} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default StuSyllabusScreen;