import React, { useCallback, useRef } from 'react';
import { Button } from 'react-native-paper';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useState } from 'react';
import colors from '../components/colors';
import HeaderDefault from '../components/defaultHeader';
import DropDown from '../components/dropdown';
import ListItem from '../components/listItem';

const AdminTeacherScreen = ({ navigation }) => {
  const TITLES = [
    'Record the dismissible tutorial 🎥',
    'Leave 👍🏼 to the video',
    'Check YouTube comments',
    'Subscribe to the channel 🚀',
    'Leave a ⭐️ on the GitHub Repo',
    'g','gg'
  ];

  const TASKS = TITLES.map((title, index) => ({ title, index }));

  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback(task => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <HeaderDefault title="Teacher" leftIcon="arrow-left" rightIcon="logout" />
      <View style={styles.dropDownContainer}>
        <DropDown width="65%" displayTop="true" style={{ flex: 1 }} />
        <DropDown width="65%" displayTop="true" style={{ flex: 1 }} />
      </View>

      <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={() => {
            alert(tasks)
        }}
      >
        Assign
      </Button>

      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map(task => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  searchBtn: {
    margin: 20,
    height: 60,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default AdminTeacherScreen;
