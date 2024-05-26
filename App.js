import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdminScreen from './screens/adminScreen';
import LoginScreen from './screens/loginScreen';
import ChooseRole from './screens/chooseRole';
import TeacherScreen from './screens/teacherScreen';
import TimetableScreen from './screens/timetable';
import StudentFeeScreen from './screens/studentFeeScreen';
import AdminTeacherScreen from './screens/adminTeacherScreen';
import AdminStudentScreen from './screens/adminStudentScreen';
import AgeReportScreen from './screens/ageReportScreen';
import SyllabusScreen from './screens/syllabus';
import InsertMarksTeacher from './screens/InsertMarksteacher';
import StudentScreen from './screens/StudentScreen';
import stuTimeTable from './screens/stuTimetable';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="adminstudent">
        <Stack.Screen
          name="adminstudent"
          component={gestureHandlerRootHOC(AdminStudentScreen)}
        />
        <Stack.Screen
          name="studentscreen"
          component={gestureHandlerRootHOC(StudentScreen)}
        />
        <Stack.Screen
          name="syllabus"
          component={gestureHandlerRootHOC(SyllabusScreen)}
        />
        <Stack.Screen
          name="agereport"
          component={gestureHandlerRootHOC(AgeReportScreen)}
        />
        <Stack.Screen
          name="timetable"
          component={gestureHandlerRootHOC(TimetableScreen)}
        />
        <Stack.Screen
          name="studentfee"
          component={gestureHandlerRootHOC(StudentFeeScreen)}
        />
        <Stack.Screen
          name="stuTimeTable"
          component={gestureHandlerRootHOC(stuTimeTable)}
        />

        <Stack.Screen
          name="adminteacher"
          component={gestureHandlerRootHOC(AdminTeacherScreen)}
        />
        <Stack.Screen
          name="insertMarks"
          component={gestureHandlerRootHOC(InsertMarksTeacher)}
        />

        {/* <Stack.Screen
          name="swipeTest"
          component={gestureHandlerRootHOC(SwipeTest)}
        /> */}

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
