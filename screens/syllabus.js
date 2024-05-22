import React from "react";
import {Image, Text, View, StyleSheet, TouchableHighlight, ScrollView, SafeAreaView,} from "react-native";
import DropDown from '../components/dropdown';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../components/colors";
import { Button } from "react-native-paper";


export default SyllabusScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={30} color={colors.dark} />
                </View>
                <Text style={[styles.headerTxt, { alignSelf: 'center' }]}>Syllabus</Text>
                <View style={styles.download}>
                    <MaterialCommunityIcons name="folder-download-outline" size={30} color={colors.dark} />
                </View>
            </View>
            <DropDown />

            <Button
                mode="contained"
                buttonColor={colors.dark}
                contentStyle={styles.searchTxt}
                style={styles.searchBtn}
                onPress={() => { 
                }}>Search
            </Button>
        </View>
    );
}
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
        fontSize: 25
    },
    backButton: {
        alignSelf: 'flex-start'
    },
    download: {
        alignSelf:'flex-end'
    },
    searchBtn: {
        margin: 20,
        height:60
    },
    searchTxt: {
        paddingTop: 10,
        fontWeight:'bold',
    }
})