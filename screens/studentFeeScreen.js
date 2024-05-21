import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import colors from '../components/colors';
import HeaderDefault from '../components/defaultHeader';
import data from '../src/data/data';
import AccordionScreen from './accordianTest';

const StudentFeeScreen = () => {
  return (
    <>
    <HeaderDefault title="Fee Details" leftIcon='arrow-left' rightIcon='logout'/>
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderCell}>Amount</Text>
          <Text style={styles.tableHeaderCell}>Paid</Text>
          <Text style={styles.tableHeaderCell}>Unpaid</Text>
          <Text style={styles.tableHeaderCell}>Due Date</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableDataCell}>24,000</Text>
          <Text style={styles.tableDataCell}>15,000</Text>
          <Text style={styles.tableDataCell}>9,000</Text>
          <Text style={styles.tableDataCell}>15/08/24</Text>
        </View>

        {/* Cards */}
      </View>
      <AccordionScreen/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow:'hidden'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    width: '95%',
    alignSelf: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  tableHeaderCell: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableDataCell: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.dark,
  },
});

export default StudentFeeScreen;
