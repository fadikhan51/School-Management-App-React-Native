import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import colors from '../components/colors';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useRef, useState, useEffect} from 'react';
const countries = [
  {country: 'Afghanistan', code: '93', iso: 'AF'},
  {country: 'Albania', code: '355', iso: 'AL'},
  {country: 'Algeria', code: '213', iso: 'DZ'},
  {country: 'American Samoa', code: '1-684', iso: 'AS'},
  {country: 'Andorra', code: '376', iso: 'AD'},
];
const classes = [
  {class: '01', value: 0},
  {class: '02', value: 1},
  {class: '03', value: 2},
  {class: '13', value: 3},
];
const DropDown = ({className, selectedstudentname, studocid}) => {
  const [search, setSearch] = useState('');
  const [SelectedStudentname, setSelectedStudentname] = useState('');
  const [clicked, setClicked] = useState(false);
  const [classId, setClassId] = useState(''); // State to store the class ID
  const [data, setData] = useState(students);
  const [students, setStudents] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.class.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(classes);
    }
  };
  useEffect(() => {
    if (className) {
      fetchClassId(className); // Fetch the class ID when className changes
    }
  }, [className]);

  useEffect(() => {
    if (classId) {
      fetchStudentsFromClass(classId); // Fetch students when classId is available
    }
  }, [classId]);

  const fetchStudentsFromClass = async classId => {
    try {
      const classDoc = await firestore().collection('Class').doc(classId).get();
      if (classDoc.exists) {
        const classData = classDoc.data();
        const studentRefs = classData.students || [];
        const studentPromises = studentRefs.map(ref => ref.get());
        const studentSnapshots = await Promise.all(studentPromises);
        const studentData = studentSnapshots.map(snapshot => ({
          doc_id: snapshot.id,
          reg_no: snapshot.data().reg_no,
          name: snapshot.data().name,
        }));
        setStudents(studentData);
      } else {
        console.error('Class document does not exist');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const fetchClassId = async className => {
    // console.log('infetchclassid');
    try {
      const classRef = await firestore()
        .collection('Class')
        .where('name', '==', className)
        .get();
      if (!classRef.empty) {
        const doc = classRef.docs[0];
        setClassId(doc.id);
        console.log(doc.id);
      } else {
        console.error('Class not found');
      }
    } catch (error) {
      console.error('Error fetching class ID:', error);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 60,
          borderBlockColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: 'white',
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight: '600', color: colors.dark}}>
          {selectedCountry == '' ? 'Select Reg #' : selectedCountry}
        </Text>
        {clicked ? (
          <MaterialCommunityIcons
            name="menu-up"
            size={30}
            color={colors.dark}
          />
        ) : (
          <MaterialCommunityIcons
            name="menu-down"
            size={30}
            color={colors.dark}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 10,
            height: 300,
            alignSelf: 'center',
            width: '80%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '80%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: colors.dark,
              borderRadius: 7,
              margin: 20,
              paddingLeft: 20,
              color: 'black',
            }}
          />

          <FlatList
            data={students}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '60%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedCountry(item.reg_no);
                    setSelectedStudentname(item.name);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                    selectedstudentname(item.name);
                    studocid(item.doc_id);
                  }}>
                  <Text style={{fontWeight: '600', color: colors.dark}}>
                    {item.reg_no}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropDown;
