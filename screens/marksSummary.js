import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import DropDown from './dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import {Button} from 'react-native-paper';
import {grey100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default marksSummary = () => {
  const DATA = [
    {subject: 'Maths', first: 85, mid: 88, final: 92},
    {subject: 'English', first: 78, mid: 82, final: 80},
    {subject: 'Science', first: 90, mid: 87, final: 91},
    {subject: 'History', first: 72, mid: 75, final: 70},
    {subject: 'Geo', first: 88, mid: 84, final: 89},
    {subject: 'Art', first: 95, mid: 93, final: 97},
    {subject: 'PE', first: 85, mid: 90, final: 88},
    {subject: 'CS', first: 92, mid: 89, final: 94},
  ];

  const renderItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.subject}</Text>
      <Text style={styles.cell}>{item.first}</Text>
      <Text style={styles.cell}>{item.mid}</Text>
      <Text style={styles.cell}>{item.final}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
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
            Marks Summary
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

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeading, styles.subject]}>Subject</Text>
            <Text style={styles.tableHeading}>First</Text>
            <Text style={styles.tableHeading}>Mid</Text>
            <Text style={styles.tableHeading}>Final</Text>
          </View>
          <View style={styles.body}>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // _numColumns={4}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
      <View style={styles.tableFooter}>
        <Text style={[styles.tableFooterHeading, styles.subject]}>Total</Text>
        <Text style={styles.tableFooterHeading}>666</Text>
        <Text style={styles.tableFooterHeading}>767</Text>
        <Text style={styles.tableFooterHeading}>324</Text>
      </View>
      <View>
        <View style={styles.report}>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Grand Total:</Text>
            <Text style={styles.reporttxt}>1024</Text>
          </View>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Percentage:</Text>
            <Text style={styles.reporttxt}>84%</Text>
          </View>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Grade:</Text>
            <Text style={styles.reporttxt}>A</Text>
          </View>
        </View>
      </View>
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
  table: {
    marginTop: 6,
    alignItems: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    width: '85%',
    borderRadius: 7,
    backgroundColor: colors.moderate,
  },
  tableHeading: {
    color: colors.dark,
    fontWeight: 'bold',
  },

  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    alignItems: 'center',
    width: '85%',
    borderRadius: 7,
    backgroundColor: colors.medium,
    marginLeft: 29,
    marginBottom: 30,
  },
  tableFooterHeading: {
    color: colors.dark,
    fontWeight: 'bold',
  },
  // student: {
  //   paddingHorizontal: 20,
  // },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    // // alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 5,
    marginTop: 5,
    width: '90%',
    // // alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    borderColor: '#808080',
  },
  cell: {
    paddingLeft: 30,
    color: colors.dark,
    flex: 1,
    // paddingRight: 8,
    // // textAlign: 'left',
  },
  // totalRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   height: 50,
  //   alignItems: 'center',
  //   width: '85%',
  //   borderRadius: 7,
  //   backgroundColor: colors.medium,
  // },
  // totaltxt: {
  //   color: colors.dark,
  //   fontWeight: 'bold',
  // },
  report: {
    paddingBottom: 110,
    // paddingVertical: 5,
    alignItems: 'center',
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reporttxt: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
