import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AdminScreen from './screens/adminScreen';
import LoginScreen from './screens/LoginscreenFatma';
import ChooseRole from './screens/chooseRoleFatma';
import TeacherScreen from './screens/teacherScreen';
import TimetableScreen from './screens/timetable';
import StudentFeeScreen from './screens/studentFeeScreen';
import AdminTeacherScreen from './screens/adminTeacherScreen';
import AdminStudentScreen from './screens/adminStudentScreen';
import AgeReportScreen from './screens/ageReportScreen';
import SyllabusScreen from './screens/syllabus';
import StuSyllabusScreen from './screens/stuSyllabus';
import AdminStudentFeeScreen from './screens/adminStudentFeeScreen';
import InsertMarksTeacher from './screens/InsertMarksteacher1';
import StudentScreen from './screens/StudentScreen';
import FireStoreTest from './testScreens/firestoreTest';
import MarksSummaryFatima from './screens/marksSummaryFatma';
import stuTimeTable from './screens/stuTimetable';
import StudentSyllabusScreen from './screens/syllabusIntahal';
import ResultSheet from './screens/resultSheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="role">
          <Stack.Screen
          name="role"
          component={gestureHandlerRootHOC(ChooseRole)}
        />
        <Stack.Screen
          name="login"
          component={gestureHandlerRootHOC(LoginScreen)}
        />
        <Stack.Screen
          name="admin"
          component={gestureHandlerRootHOC(AdminScreen)}
        />
        <Stack.Screen
          name="studentScreen"
          component={gestureHandlerRootHOC(StudentScreen)}
        />
        <Stack.Screen
          name="teacherScreen"
          component={gestureHandlerRootHOC(TeacherScreen)}
        />
        <Stack.Screen
          name="marksSummary"
          component={gestureHandlerRootHOC(MarksSummaryFatima)}
        />
        <Stack.Screen
          name="studentFee"
          component={gestureHandlerRootHOC(StudentFeeScreen)}
        />
        <Stack.Screen
          name="stuTimeTable"
          component={gestureHandlerRootHOC(stuTimeTable)}
        />
        <Stack.Screen
          name="stuSyllabus"
          component={gestureHandlerRootHOC(StudentSyllabusScreen)}
        />
        <Stack.Screen
          name="StudentResultReport"
          component={gestureHandlerRootHOC(ResultSheet)}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="marksTeacher"
          component={gestureHandlerRootHOC(InsertMarksTeacher)}
          options={{title: 'Add Class', headerShown: false}}
        />
        <Stack.Screen
          name="ClassDetails"
          component={gestureHandlerRootHOC(AdminTeacherScreen)}
          options={{title: 'Class Details', headerShown: false}}
        />
        <Stack.Screen
          name="AddStudent"
          component={gestureHandlerRootHOC(AdminStudentScreen)}
          options={{title: 'Subjects', headerShown: false}}
        />
        <Stack.Screen
          name="AddTeacher"
          component={gestureHandlerRootHOC(AdminTeacherScreen)}
          options={{title: 'Add Teacher', headerShown: false}}
        />
        <Stack.Screen
          name="EditStudent"
          component={gestureHandlerRootHOC(StudentScreen)}
          options={{title: 'Edit Student', headerShown: false}}
        />
        <Stack.Screen
          name="StudentAgeRecord"
          component={gestureHandlerRootHOC(AgeReportScreen)}
          options={{title: 'Student Age Record', headerShown: false}}
        />
        <Stack.Screen
          name="FeeStatusForm"
          component={gestureHandlerRootHOC(AdminStudentFeeScreen)}
          options={{title: 'Fee Status', headerShown: false}}
        />
        <Stack.Screen
          name="TimeTable"
          component={gestureHandlerRootHOC(TimetableScreen)}
          options={{title: 'Time Table', headerShown: false}}
        />
        <Stack.Screen
          name="syllabusScreen"
          component={gestureHandlerRootHOC(SyllabusScreen)}
          options={{title: 'Syllabus', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
