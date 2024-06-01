import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Accordion from './imgAccordian';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const AccordionScreen = props => {
  const [imgURL, setimgURL] = useState(null);
  const imageSource = require('../../assets/timetable.jpg');

  useEffect(() => {
    if (props.passedClass === 'Nursery') {
      fetchimgURL();
    } else {
      // Reset imgURL if class is not 'Nursery'
      setimgURL(null);
    }
  }, [props.passedClass]);

  const fetchimgURL = async () => {
    try {
      console.log(props.passedClass);
      if (props.passedClass === 'Nursery') {
        console.log('inif');
        const doc = await firestore()
          .collection('Class')
          .doc('7LcahFphsVlUz4uYE5J6')
          .get();

        if (doc.exists) {
          const data = doc.data();
          setimgURL(`data:image/png;base64,${data.timetable}`);
        } else {
          setimgURL(null);
          console.log('doc doesnt exist');
        }
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };
  const handleImagePicked = base64data => {
    // Handle the base64 image data here
    props.getbase64data(base64data);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Accordion
          value={{
            title: 'Time Table',
            type: 'timetable',
          }}
          passedclass={props.passedClass}
          image={{uri: imgURL}}
          onImagePicked={handleImagePicked} // Pass the handleImagePicked function as a prop
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccordionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
