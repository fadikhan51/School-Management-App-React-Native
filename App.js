import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdminScreen from './screens/adminScreen'; 
import LoginScreen from './screens/loginScreen';
import ChooseRole from './screens/chooseRole';
import TeacherScreen from './screens/teacherScreen';
import TimetableScreen from './screens/timetable';
import StudentFeeScreen from './screens/studentFeeScreen';
import AdminTeacherScreen from './screens/adminTeacherScreen';
import SwipeTest from './screens/swipeTest';
import Example from './screens/test';
import ModalScreen from './screens/modalTest';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen
          name="modalTest"
          component={gestureHandlerRootHOC(ModalScreen)}
        />
        <Stack.Screen
          name="adminteacher"
          component={gestureHandlerRootHOC(AdminTeacherScreen)}
        />
      <Stack.Screen
          name="swipeTest"
          component={gestureHandlerRootHOC(SwipeTest)}
        />
        <Stack.Screen
          name="studentfee"
          component={gestureHandlerRootHOC(StudentFeeScreen)}
        />
        <Stack.Screen
          name="timetable"
          component={gestureHandlerRootHOC(TimetableScreen)}
        />
        <Stack.Screen name="ball" component={gestureHandlerRootHOC(Example)} />
        <Stack.Screen
          name="admin"
          component={gestureHandlerRootHOC(AdminScreen)}
        />
        <Stack.Screen
          name="role"
          component={gestureHandlerRootHOC(ChooseRole)}
        />
        <Stack.Screen
          name="login"
          component={gestureHandlerRootHOC(LoginScreen)}
        />
        <Stack.Screen
          name="teacher"
          component={gestureHandlerRootHOC(TeacherScreen)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
