import React from 'react';
import {View, Modal, Text, StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import color from './colors';

const labelandText = props => {
  const [text, setText] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const handleBlur = () => {
    // Handle blurring (e.g., hide keyboard, submit data)
    setIsFocused(true);
  };
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <PaperTextInput
          style={styles.textInput}
          onBlur={handleBlur} // Add this handler
          label={<Text style={{color: color.light}}>{props.label}</Text>}
          // label={props.label}
          mode="outlined"
          outlineColor="#3D3B4000"
          theme={{
            roundness: 10,
          }}
          labelStyle={{color: color.light}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 286,
    alignItems: 'flex-start',
    marginBottom: 20,
    marginRight: 0, // Adjust padding as needed
  },
});

export default labelandText;
