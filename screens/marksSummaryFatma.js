import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import { ActivityIndicator, Button } from 'react-native-paper';
import { round } from 'react-native-redash';
import DynamicDropDown from '../components/dynamicDropDown';

export default MarksSummaryFatima = ({ navigation, route }) => {
  const [subjectMarks, setSubjectMarks] = React.useState([]);
  const [first_total, setFirstTotal] = React.useState(0);
  const [second_total, setSecondTotal] = React.useState(0);
  const [final_total, setFinalTotal] = React.useState(0);

  const [first_term_total_marks, setFirstTermTotalMarks] = React.useState(0);
  const [second_term_total_marks, setSecondTermTotalMarks] = React.useState(0);
  const [final_term_total_marks, setFinalTermTotalMarks] = React.useState(0);

  const [std, setStd] = React.useState(null);
  const [marksList, setMarksList] = React.useState([]);
  const [originalMarksList, setOriginalMarksList] = React.useState([]); // To store unfiltered data
  const [years, setYears] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState('');
  const [processed, setProcessed] = React.useState(false);

  React.useEffect(() => {
    fetchInfo(route.params.userData.reg_no);
  }, []);

  React.useEffect(() => {
    if (selectedYear) {
      filterMarksList(selectedYear);
    }
  }, [selectedYear]);

  React.useEffect(() => {
    calculateTotals();
  }, [marksList]);

  const fetchInfo = async regNo => {
    try {
      const studentQuerySnapshot = await firebase
        .firestore()
        .collection('Student')
        .where('reg_no', '==', regNo)
        .get();

      if (!studentQuerySnapshot.empty) {
        const studentDoc = studentQuerySnapshot.docs[0];
        const studentData = studentDoc.data();

        const marksQuery = firestore()
          .collection('Marks')
          .where('student', '==', studentDoc.ref);
        const marksQuerySnapshot = await marksQuery.get();
        const matchingMarks = marksQuerySnapshot.docs.map(doc => doc.data());

        const marksTestArray = [];

        for (const doc of matchingMarks) {
          const subjectDoc = await firestore()
            .collection('Subject')
            .doc(doc.subject.id)
            .get();
          const subjectData = subjectDoc.data();

          const data = {
            name: subjectData.name,
            first_term_marks: subjectData.first_term_marks,
            mid_term_marks: subjectData.mid_term_marks,
            final_term_marks: subjectData.final_term_marks,
            first_obt_marks: doc.first_obt_marks,
            mid_obt_marks: doc.mid_obt_marks,
            final_obt_marks: doc.final_obt_marks,
            year: doc.year,
          };
          marksTestArray.push(data);
        }

        setOriginalMarksList(marksTestArray);
        setMarksList(marksTestArray);

        const distinctYears = [...new Set(matchingMarks.map(mark => mark.year))];

        setYears(distinctYears);
        setSelectedYear(distinctYears[distinctYears.length - 1]);
        setProcessed(true);
      } else {
        console.log('No student found with reg no:', regNo);
      }
    } catch (error) {
      console.error('Error fetching last admission class value:', error);
    }
  };

  const chooseYear = year => {
    setSelectedYear(year);
  };

  const updateMarksList = data => {
    setMarksList(prevMarksList => [...prevMarksList, data]);
  };

  const filterMarksList = year => {
    const filteredList = originalMarksList.filter(item => item.year === year);
    setMarksList(filteredList);
  };

  const calculateTotals = () => {
    const firstTotal = marksList.reduce((total, item) => total + (item.first_obt_marks || 0), 0);
    const secondTotal = marksList.reduce((total, item) => total + (item.mid_obt_marks || 0), 0);
    const finalTotal = marksList.reduce((total, item) => total + (item.final_obt_marks || 0), 0);

    const firstTermTotalMarks = marksList.reduce((total, item) => total + (item.first_term_marks || 0), 0);
    const secondTermTotalMarks = marksList.reduce((total, item) => total + (item.mid_term_marks || 0), 0);
    const finalTermTotalMarks = marksList.reduce((total, item) => total + (item.final_term_marks || 0), 0);

    setFirstTotal(firstTotal);
    setSecondTotal(secondTotal);
    setFinalTotal(finalTotal);

    setFirstTermTotalMarks(firstTermTotalMarks);
    setSecondTermTotalMarks(secondTermTotalMarks);
    setFinalTermTotalMarks(finalTermTotalMarks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow} key={item.name}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.first_obt_marks}/{item.first_term_marks}</Text>
      <Text style={styles.cell}>{item.mid_obt_marks}/{item.mid_term_marks}</Text>
      <Text style={styles.cell}>{item.final_obt_marks}/{item.final_term_marks}</Text>
    </View>
  );

  const calculateGrade = (percentage) => {
    if (percentage > 80) {
      return 'A';
    } else if (percentage > 70) {
      return 'B';
    } else if (percentage > 60) {
      return 'C';
    } else if (percentage > 50) {
      return 'D';
    } else {
      return 'F';
    }
  };

  const totalObtainedMarks = first_total + second_total + final_total;
  const totalPossibleMarks = first_term_total_marks + second_term_total_marks + final_term_total_marks;
  const percentage = totalPossibleMarks ? round((totalObtainedMarks / totalPossibleMarks) * 100) : 0;

  return processed === true ? (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color={colors.dark}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={[styles.headerTxt, { alignSelf: 'center' }]}>
            Marks Summary
          </Text>
          <View style={styles.download}>
            <MaterialCommunityIcons
              name="folder-download-outline"
              size={30}
              color={colors.dark}
              onPress={() => console.log("Download Marks Summary")} // Implement your download logic here
            />
          </View>
        </View>
        <DynamicDropDown
          data={years}
          selected={selectedYear}
          displayTop={true}
          onSelect={chooseYear}
        />

        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            fetchInfo(route.params.userData.reg_no);
          }}>
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
            <ScrollView style={[{ maxHeight: '70%' }]}>
              <View>
                {marksList.map((item, index) =>
                  renderItem({ item, index, key: index }),
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.tableFooter}>
        <Text style={[styles.tableFooterHeading, styles.subject]}>Total</Text>
        <Text style={styles.tableFooterHeading}>{first_total}</Text>
        <Text style={styles.tableFooterHeading}>{second_total}</Text>
        <Text style={styles.tableFooterHeading}>{final_total}</Text>
      </View>
      <View>
        <View style={styles.report}>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Grand Total:</Text>
            <Text style={styles.reporttxt}>
              {totalObtainedMarks}
            </Text>
          </View>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Percentage:</Text>
            <Text style={styles.reporttxt}>
              {percentage}%
            </Text>
          </View>
          <View style={styles.reportRow}>
            <Text style={styles.reporttxt}>Grade:</Text>
            <Text style={styles.reporttxt}>
              {calculateGrade(percentage)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
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
  tableRow: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    marginLeft: 20,
    paddingVertical: 5,
    marginTop: 5,
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
    borderColor: '#808080',
  },
  cell: {
    paddingLeft: 30,
    color: colors.dark,
    flex: 1,
  },
  report: {
    paddingBottom: 110,
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
