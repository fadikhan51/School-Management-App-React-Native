import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import data from '../src/data/data';
import Accordion from '../fatimaComponents/Accordian';
import moment from 'moment';


import { SafeAreaView } from 'react-native-safe-area-context';
const AccordionScreen = ({ feeRecords }) => {

  return (

    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {feeRecords.map((value, index) => {

          if(value){
          const dueDateTimestamp = value.due_date;
          const dueDate = dueDateTimestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date object

          // Format the date using moment
          const formattedDueDate = moment(dueDate).format('YYYY-MM-DD');

          value.due_date = formattedDueDate

        
          return <Accordion value={value} key={index} type={value.type}  />;
          }
          else{
            return <></>
          }
        })}
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