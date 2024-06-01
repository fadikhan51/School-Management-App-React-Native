import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import HeaderDefault from '../components/defaultHeader';
import firestore from '@react-native-firebase/firestore';

const stdRef = firestore().collection('Student');

export default function StudentSyllabusScreen({navigation, route}) {
  const [syllabusUrl, setSyllabusUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSyllabus() {
      try {
        studentData = route.params.userData;

        console.log('aa', studentData.classes.slice(-1)[0]);
        const classDoc = await firestore()
          .collection('Class')
          .where('name', '==', studentData.classes.slice(-1)[0])
          .get();

        if (!classDoc.empty) {
          classDoc.forEach(classDoc => {
            const classData = classDoc.data();
            console.log('Class Data:', classData.syllabus_url);
            setSyllabusUrl(classData.syllabus_url)
          });
        }
      } catch (error) {
        console.error('Error fetching syllabus:', error);
        Alert.alert('Error', 'Failed to fetch syllabus.');
      } finally {
        setLoading(false);
      }
    }

    fetchSyllabus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <HeaderDefault
        title="Syllabus"
        leftIcon="arrow-left"
        rightIcon="folder-download-outline"
        onRightPress = {()=>{
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {syllabusUrl ? (
          <View style={styles.syllabusContainer}>
            <Text style={styles.subjectName}>Syllabus</Text>
            <Image
              source={{uri: syllabusUrl}}
              style={{width: '100%', height: 300}}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text>No syllabus available for this class.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syllabusContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
