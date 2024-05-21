import React from "react";
import {
  SafeAreaView,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "react-native";

import colors from "./colors";

const MyHeader = (props) => {
  console.log(props.navigation);
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar style="light" />
      <Text style={styles.headerText}>{props.title}</Text>
      <TouchableHighlight
        style={styles.logout}
        activeOpacity={0.4}
        underlayColor={colors.medium + "00"}
        onPress={props.navigation}
      >
        <MaterialCommunityIcons name="logout" size={35} color="white" />      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 150,
    backgroundColor: colors.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 75,
    elevation: 5,
  },
  headerText: {
    paddingLeft: 30,
    fontSize: 25,
    color: "white",
  },
  logout: {
    paddingRight: 20,
  },
});

export default MyHeader;
