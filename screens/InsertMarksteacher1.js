import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalComponent from './ModalComponent';

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
  const count=0;
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
            iconColor={colors.dark}
            style={{ margin: 20 ,backgroundColor:'#DCDCDC'}}
            
          />
          <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={() => {}}>
        Search
      </Button>
        </View>
      )}

      {!modalVisible && (
        <ScrollView horizontal>
          <View>
            
            <FlatList
              data={classes}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                 

                  <Text style={styles.name}>{item.Name}</Text>
                  <Text style={styles.marks}>FA21-BCS-022</Text>

                  <View style={styles.marksContainer}>
                    <Text style={styles.marks}>{item.First_Term}/100</Text>
                    <Text style={styles.marks}>{item.Second_Term}/100</Text>
                    <Text style={styles.marks}>{item.Third_Term}/100</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton}>
                    <MaterialCommunityIcons name="pencil" size={30} color={colors.dark} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.editButton, { marginRight: 15 }]}>
                    <MaterialCommunityIcons name="delete" size={30} color={colors.dark} />
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
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    height:50,
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
    marginLeft: 40,
    color: colors.dark
  },
  editButton: {
    marginLeft: 15,
    marginLeft: 40,

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
    fontSize: 25,
    alignSelf: 'center'
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  FirstRow:{
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    marginLeft: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(237, 221, 246)',
    borderColor: 'rgb(237, 221, 246)',

  },
  searchBtn: {
   
    height: 60,
    width:'90%',
    marginLeft:30,
    marginRight:30,
    marginBottom:20
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
  
})
export default InsertMarksTeacher;
