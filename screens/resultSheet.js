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
import {DataTable} from 'react-native-paper';
import DropDown from './dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import {Button} from 'react-native-paper';

export default resultSheet = () => {
  const [items] = React.useState([
    {
      rollno: 'Fa21-bcs-027',
      name: 'Hina jawaid',
      first: 88,
      mid: 90,
      final: 86,
      average: 88,
    },
    {
      rollno: 'Fa21-bcs-032',
      name: 'Intahal tallat',
      first: 84,
      mid: 97,
      final: 82,
      average: 88,
    },
  ]);
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
          ResultSheet
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
            <DataTable.Title style={styles.tableTitle}>Rollno</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>First</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}> Mid</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Final</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              Percentage
            </DataTable.Title>
          </DataTable.Header>

          {items.map(item => (
            <DataTable.Row key={item.name}>
              <DataTable.Cell style={styles.datacell}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.rollno}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell} numeric>
                {item.first}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell} numeric>
                {item.mid}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell} numeric>
                {item.final}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell} numeric>
                {item.average}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
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
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  datarow: {
    width: '100%',
    height: 50,
  },
  datacell: {
    width: 100,
    justifyContent: 'center',
  },
  tableTitle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
