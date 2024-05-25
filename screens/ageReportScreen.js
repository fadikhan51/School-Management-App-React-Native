import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DropDown from '../components/dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import {Button} from 'react-native-paper';
import {DataTable} from 'react-native-paper';

export default AgeReportScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.dark}
          />
        </View>
        <Text style={[styles.headerTxt, {alignSelf: 'center'}]}>
          Age Report
        </Text>
        <View style={styles.download}>
          <MaterialCommunityIcons
            name="folder-download-outline"
            size={30}
            color={colors.dark}
          />
        </View>
      </View>

      <DropDown />

      <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={() => {}}>
        Search
      </Button>

      <ScrollView horizontal>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}>Name</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Registration Number</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Age</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Father Name</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>DOB</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Total Boys/Girls</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.datarow}>
            <DataTable.Cell style={styles.datacell}>Intahal Tallat</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>FA21-BCS-032</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>23</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>Tallat</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>20 April</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>girl</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row style={styles.datarow}>
            <DataTable.Cell style={styles.datacell}>Intahal Tallat</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>032</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>23</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>Tallat</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>20 April</DataTable.Cell>
            <DataTable.Cell style={styles.datacell}>girl</DataTable.Cell>
          </DataTable.Row>
          
        </DataTable>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  download: {
    alignSelf: 'flex-end',
  },
  searchBtn: {
    margin: 20,
    height: 60,
  },
  searchTxt: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  datarow:{
    width: '100%', 
    height: 50
  },
  datacell:{
    width: 100 ,
    justifyContent: 'center',
  },
  tableTitle:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    fontWeight: 'bold',

  }
});
