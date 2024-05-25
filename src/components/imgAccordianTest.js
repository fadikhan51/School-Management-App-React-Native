import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Accordion from './imgAccordian';
import {SafeAreaView} from 'react-native-safe-area-context';

const AccordionScreen = () => {
  const imageSource = require('../../assets/timetable.jpg');

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Accordion
          value={{
            title: 'Time Table',
            type: 'timetable',
          }}
          image={require('../../assets/stu.jpg')}
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
