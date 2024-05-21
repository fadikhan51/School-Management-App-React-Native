import 'react-native-gesture-handler'; // This must be at the top of your entry file
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App'; // Adjust the import to the correct path

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
};

export default Main;
