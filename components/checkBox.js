import * as React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {Checkbox} from'react-native-paper';
import colors from './colors';

const CustomCheckbox = ({ label, checked, setChecked }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!checked)}
        color={colors.dark}
        />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    colors:colors.dark,
  },
});

export default CustomCheckbox;