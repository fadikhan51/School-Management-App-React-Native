import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderDefault = props => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.backButton}>
        <MaterialCommunityIcons
          name={`${props.leftIcon}`}
          size={30}
          color={colors.dark}
          onPress={
            props.onRightPress ? props.onRightPress : () => {}
          }
        />
      </View>

      <Text style={[styles.headerTxt, {alignSelf: 'center'}]}>{props.title}</Text>
      <View style={styles.download}>
        <MaterialCommunityIcons
          name={`${props.rightIcon}`}
          size={30}
          color={colors.dark}
          onPress={props.onPress ? props.onPress : () => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default HeaderDefault;


const styles = StyleSheet.create({
    header: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTxt: {
        color: colors.dark,
        fontWeight: 'bold',
        fontSize: 25,
    },
    backButton: {
        alignSelf: 'flex-start'
    },
    download: {
        alignSelf:'flex-end'
    },
})