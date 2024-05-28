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

const AgeReportScreen = () => {
  const [stdList, setStdList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [bStdList, setBStdList] = useState([]);
  const stdRef = firestore().collection('Student');

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
    const querySnapshot = await stdRef.get();
    const tempStdList = [];
    querySnapshot.forEach(doc => {
      const {admission_class, dob, father_name, gender, name, reg_no} =
        doc.data();
      tempStdList.push({
        id: doc.id,
        admission_class: admission_class,
        dob: dob,
        father_name: father_name,
        gender: gender,
        name: name,
        reg_no: reg_no,
      });
    });
    setStdList(tempStdList);
    setBStdList(tempStdList);
  }

  const handleSearchButtonPress = () => {
    setStdList(bStdList);

    const filteredStudents = bStdList.filter(obj => {
      if (selectedClass) {
        const classValues = Object.values(obj.admission_class);
        if (!classValues.includes(selectedClass)) {
          return false;
        }
      }
      return true;
    });

    setStdList(filteredStudents);
  };

  const createPDF = async () => {
    try {
      const htmlContent = generatePDFContent();
      const directoryPath = await getDirectoryPath();
      if (directoryPath) {
        let PDFOptions = {
          html: htmlContent,
          fileName: 'ageReport',
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
                <h1 class="headerTxt">Age Report</h1>
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
                    <th>Age</th>
                    <th>Father Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  ${stdList
                    .filter(
                      obj =>
                        Object.entries(
                          obj.admission_class,
                        )[0][1].toLowerCase() === label.toLowerCase(),
                    )
                    .map(
                      obj => `
                      <tr>
                        <td>${obj.name}</td>
                        <td>${obj.reg_no}</td>
                        <td>${
                          new Date().getFullYear() -
                          new Date(obj.dob.toDate()).getFullYear()
                        }</td>
                        <td>${obj.father_name}</td>
                        <td>${new Date(
                          obj.dob.toDate(),
                        ).toLocaleDateString()}</td>
                        <td>${obj.gender ? 'Male' : 'Female'}</td>
                      </tr>
                    `,
                    )
                    .join('')}
                </tbody>

              </table>
              <p><b>Total Students :</b> ${
                stdList.filter(
                  obj =>
                    Object.entries(obj.admission_class)[0][1].toLowerCase() ===
                    label.toLowerCase(),
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
        onPress={handleSearchButtonPress} // Call the search button press handler
      >
        Search
      </Button>

      <ScrollView horizontal>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableTitle}>Name</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              Registration Number
            </DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>Age</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              Father Name
            </DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>DOB</DataTable.Title>
            <DataTable.Title style={styles.tableTitle}>
              Total Boys/Girls
            </DataTable.Title>

            <DataTable.Title style={styles.tableTitle}>Gender</DataTable.Title>
          </DataTable.Header>
          {stdList.map((obj, index) => (
            <DataTable.Row key={index} style={styles.datarow}>
              <DataTable.Cell style={styles.datacell}>
                {obj.name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {obj.reg_no}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {new Date().getFullYear() -
                  new Date(obj.dob.toDate()).getFullYear()}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {obj.father_name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {new Date(obj.dob.toDate()).toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell style={styles.datacell}>
                {obj.gender ? 'Male' : 'Female'}
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
  container: {
    padding: 15,
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

export default AgeReportScreen;
