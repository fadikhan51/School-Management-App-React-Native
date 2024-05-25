import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,

  FlatList,
} from "react-native";
import { Searchbar, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalComponent from './insertMarksModal';

import colors from "../components/colors";

const InsertMarksTeacher = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const classes = [
    { Name: "Fatima Nadeem", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Intahal Tallat", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Hina Jawaid", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Abdullah Imran", First_Term: 10, Second_Term: 10, Third_Term: 10 },

    { Name: "Abdullah Imran", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Junaid Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Kahn Chishti Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Abdullah Imran", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Junaid Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Kahn Chishti Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Kahn Chishti Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Abdullah Imran", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Junaid Ali Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },
    { Name: "Kahn Chishti Khan", First_Term: 10, Second_Term: 10, Third_Term: 10 },

  ];
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={30} color={colors.dark} />
        </View>
        <View>
          <Text style={[styles.headerTxt, { alignSelf: 'center' }]}>Teacher</Text>
        </View>
        <View style={styles.download}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="plus-circle-outline" size={30} color={colors.dark} />
          </TouchableOpacity>
        </View>
      </View>
      <ModalComponent isVisible={modalVisible} onClose={() => setModalVisible(false)} />

      {!modalVisible && (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Searchbar
            placeholder="Search"
            iconColor="purple"
            style={{ margin: 20 }}
          />
          <Button style={{ width: 170, marginBottom: 20 }} mode="contained" onPress={() => console.log('Pressed')}>
            Search
          </Button>
        </View>
      )}

      {!modalVisible && (
        <ScrollView>
          <View>
            <FlatList
              data={classes}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.name}>{item.Name}</Text>
                  <View style={styles.marksContainer}>
                    <Text style={styles.marks}>{item.First_Term}</Text>
                    <Text style={styles.marks}>{item.Second_Term}</Text>
                    <Text style={styles.marks}>{item.Third_Term}</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton}>
                    <MaterialCommunityIcons name="pencil" size={30} color='rgb(120, 69, 172)' />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton}>
                    <MaterialCommunityIcons name="delete" size={30} color='rgb(120, 69, 172)' />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    marginLeft: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: '90%',
    borderRadius: 5,
    backgroundColor: 'rgb(237, 221, 246)',
    borderColor: 'rgb(237, 221, 246)',
  },
  name: {
    flex: 1,
    marginLeft: 5,
    color: colors.dark,
  },
  marksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marks: {
    marginLeft: 10,
    color: colors.dark
  },
  editButton: {
    marginLeft: 15,
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTxt: {
    color: colors.dark, 
    fontWeight: 'bold',
    fontSize: 25
  },
  backButton: {
    alignSelf: 'flex-start',
  },
})
export default InsertMarksTeacher;
