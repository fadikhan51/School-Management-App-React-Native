import React from "react";
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    SafeAreaView,
} from "react-native";
import DropDown from '../components/dropdown';
import colors from "../components/colors";
import { Button } from "react-native-paper";
import HeaderDefault from "../components/defaultHeader";


export default TimeTableScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <HeaderDefault title="Time Table" leftIcon="arrow-left" rightIcon="folder-download-outline"/>
            <DropDown/>

            <Button
            mode="contained"
            buttonColor={colors.dark}
            contentStyle={styles.searchTxt}
            style={styles.searchBtn}
            onPress={() => {
              
            }}
          >
            Search
          </Button>
        </View>
    );
}
const styles = StyleSheet.create({
    
    searchBtn: {
        margin: 20,
        height:60
    },
    searchTxt: {
        paddingTop: 10,
        fontWeight:'bold',
    }
})