import React from 'react';
import {View, Modal, Text, StyleSheet} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import color from './colors';
import colors from './colors';

const labelandText = ({label, marks, onChangeText}) => {
  const [text, setText] = React.useState(marks);
  const [isFocused, setIsFocused] = React.useState(false);
  const handleBlur = () => {
    // Handle blurring (e.g., hide keyboard, submit data)
    setIsFocused(true);
  };
  const handleChangeText = newText => {
    setText(newText);
    onChangeText(newText); // Call the onChangeText prop with the updated value

    console.log(text);

    // Update the state with the new text value
  };
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <PaperTextInput
          style={styles.textInput}
          label={
            <Text style={{color: isFocused ? colors.dark : colors.dark}}>
              {label}
            </Text>
          }
          value={text}
          mode="outlined"
          outlineColor="#3D3B4000"
          theme={{
            roundness: 10,
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          // onBlur={handleBlur}
          onChangeText={handleChangeText}
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
    color: colors.dark,
  },
});

export default labelandText;
