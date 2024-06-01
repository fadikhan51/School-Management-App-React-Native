import React from 'react';
import { ScrollView, Image, Text, View } from 'react-native';

const Accordion = ({ syllabus }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {syllabus.map((subject, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text>{subject.title}</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${subject.syllabus}` }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Accordion;