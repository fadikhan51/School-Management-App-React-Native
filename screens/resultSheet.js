import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import DropDown from '../components/dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import {Button, DataTable} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import colors from '../components/colors';

export default resultSheet = () => {
  const [mrkList, setMrkList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [bMrkList, setBMrkList] = useState([]);
  const mrkRef = firestore().collection('Marks');

  const labels = [
    'Nursery',
    'Prep',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
  ];

  useEffect(() => {
    handleButtonPress();
  }, []);

  async function handleButtonPress() {
    try {
      const querySnapshot = await mrkRef.get();
      const tempList = [];

      for (const doc of querySnapshot.docs) {
        const {
          final_obt_marks,
          first_obt_marks,
          mid_obt_marks,
          student,
          subject,
        } = doc.data();

        const studentDoc = await student.get();
        const {reg_no, name, admission_class} = studentDoc.data();
        const value = Object.entries(admission_class)[0][1].toLowerCase();
        const subjectDoc = await subject.get();
        const {id} = subjectDoc.data();

        tempList.push({
          id: doc.id,
          final_obt_marks,
          mid_obt_marks,
          first_obt_marks,
          student: {
            reg_no,
            name,
            value,
          },
          subject: {id},
        });
      }

      setMrkList(tempList);
      setBMrkList(tempList);
    } catch (error) {
      console.error('Error fetching marks documents: ', error);
    }
  }

  const handleSearchButtonPress = () => {
    setMrkList(bMrkList);
    const filteredStudents = bMrkList.filter(obj => {
        if (selectedClass) {
            const classValues = obj.student.value;
            if (classValues.toLowerCase() === selectedClass.toLowerCase()) {
                return true;
            }
        }
        return false;
    });

    if (filteredStudents.length === 0) {
        setMrkList([{
            final_obt_marks: "",
            first_obt_marks: "",
            id: "",
            mid_obt_marks: "",
            student: { name: "", reg_no: "", value: "" },
            subject: { id: "" }
        }]);
    } else {
        setMrkList(filteredStudents);
    }
};


  const createPDF = async () => {
    try {
      const htmlContent = generatePDFContent();
      const directoryPath = await getDirectoryPath();
      if (directoryPath) {
        let PDFOptions = {
          html: htmlContent,
          fileName: 'ResultSheet',
          directory: 'Documents',
        };
        const {filePath} = await RNHTMLtoPDF.convert(PDFOptions);
        Alert.alert(
          'Successfully Exported',
          'Path: ' + filePath,
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed');
              },
              style: 'cancel',
            },
            {
              text: 'Open',
              onPress: () => {
                openFile(filePath);
              },
            },
          ],
          {cancelable: true},
        );
      } else {
        console.log('Failed to get directory path');
      }
    } catch (error) {
      console.log('Failed to generate PDF:', error.message);
      console.log('Error stack trace:', error.stack);
      Alert.alert('Failed to generate PDF', error.message);
    }
  };

  const generatePDFContent = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Age Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #333;
                    color: #fff;
                    padding: 16px;
                }
                .headerTxt {
                    font-size: 18px;
                    font-weight: bold;
                }
                .table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 16px;
                }
                .table th,
                .table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                .table th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="headerTxt">Result Sheet</h1>
            </div>
            ${labels
              .map(
                label => `
              <h2>${label}</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>RollNo</th>
                    <th>Subject</th>
                    <th>FirstTerm</th>
                    <th>MidTerm</th>
                    <th>FinalTerm</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  ${mrkList
                    .filter(
                      obj => obj.student.value.toLowerCase() === label.toLowerCase()
                    )
                    .map(
                      obj => `
                      <tr>
                        <td>${obj.name}</td>
                        <td>${obj.student.reg_no}</td>
                        <td>${obj.subject.id}</td>
                        <td>${obj.first_obt_marks}</td>
                        <td>${obj.mid_obt_marks}</td>
                        <td>${obj.final_obt_marks}</td>
                        <td>${(
                          (parseInt(obj.first_obt_marks) +
                            parseInt(obj.mid_obt_marks) +
                            parseInt(obj.final_obt_marks)) /
                          3
                        ).toFixed(2)}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>

              </table>
              <p><b>Total Students :</b> ${
                mrkList.filter(
                  obj => obj.student.value.toLowerCase() === label.toLowerCase()
                ).length
              }</p>
            `,
              )
              .join('')}
        </body>
        </html>
      `;
  };

  const getDirectoryPath = async () => {
    try {
      let directoryPath;
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app needs access to your storage to save the PDF file.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Documents`;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          directoryPath = `${RNFS.DocumentDirectoryPath}/Documents`;
        } else {
          console.log('Storage permission denied');
          return null;
        }
      } else {
        directoryPath = `${RNFS.DocumentDirectoryPath}/Documents`;
      }
      await RNFS.mkdir(directoryPath);
      return directoryPath;
    } catch (error) {
      console.log('Error getting directory path:', error.message);
      return null;
    }
  };

  const openFile = async filePath => {
    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await FileViewer.open(filePath);
      } else {
        console.log('File not found:', filePath);
      }
    } catch (error) {
      console.log('Error opening file:', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Back Button */}
        <View style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.dark}
          />
        </View>
        {/* Header Text */}
        <Text style={[styles.headerTxt, {alignSelf: 'center'}]}>
          ResultSheet
        </Text>
        {/* Download Button */}
        <View style={styles.download}>
          <MaterialCommunityIcons
            name="folder-download-outline"
            size={30}
            color={colors.dark}
            onPress={createPDF}
          />
        </View>
      </View>

      <DropDown
        onSelect={selected => {
          setSelectedClass(selected === 'Select Class' ? null : selected);
        }}
      />

      <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={handleSearchButtonPress}>
        Search
      </Button>

      <ScrollView horizontal>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}>Name</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Roll No</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Subject</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>First</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Mid</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Final</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              Percentage
            </DataTable.Title>
          </DataTable.Header>

          {mrkList.map(item => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={styles.datacell}>
                {item.student.name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.student.reg_no}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.subject.id}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.first_obt_marks}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.mid_obt_marks}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {item.final_obt_marks}
              </DataTable.Cell>
              {/* Calculate Percentage */}
              <DataTable.Cell style={styles.datacell}>
                {(
                  (parseInt(item.first_obt_marks) +
                    parseInt(item.mid_obt_marks) +
                    parseInt(item.final_obt_marks)) /
                  3
                ).toFixed(2)}
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
