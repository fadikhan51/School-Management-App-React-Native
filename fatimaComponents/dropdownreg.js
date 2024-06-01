import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const DropDown = ({onSelectRegNo}) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);


  const [selectedRegNo, setSelectedRegNo] = useState('');
  
  const searchRef = useRef();
  useEffect(() => {
    const fetchStudentRegNumbers = async () => {
      try {

        const studentRef = await firestore().collection('Student').get();
        
        // Extract data from the snapshot
        const students = studentRef.docs.map(doc => ({
          id: doc.id, // Document ID
          ...doc.data() // Other document data
        }));

        setData(students)
        console.log(students)

      }


      catch (error) {
        console.error('Error fetching student registration numbers:', error);
        setData([]); // Return an empty array in case of error
      }
    };

    fetchStudentRegNumbers();
  }, []);


  // const onSearch = search => {
  //   if (search !== '') {
  //     let tempData = data.filter(item => {
  //       item.reg_no && typeof item.reg_no === 'number' && item.reg_no.toString().includes(searchText)
  //     });
  //     setData(filteredData);
  //   } else {
  //     setData(searchText);
  //   }
  // };  
  

  const handleSearchChange = (searchText) => {
    setSearch(searchText);
  
    if (searchText === '') {
      // Clear search, show all data
      setFilteredData(data);
    } else {
      // Filter data based on search term
      const filtered = data.filter(item =>
        item.reg_no &&
        typeof item.reg_no === 'number' &&
        item.reg_no.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 60,
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

         
          
          
          setClicked(!clicked)}}
          >
        <Text style={{ fontWeight: '600', color: colors.dark }}>
          {selectedRegNo === '' ? 'Select Reg #' : selectedRegNo}
        </Text>   
        <MaterialCommunityIcons
          name={clicked ? 'menu-up' : 'menu-down'}
          size={30}
          color={colors.dark}
        />
      </TouchableOpacity>
      {clicked && (
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
            onChangeText={handleSearchChange}
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
            data={data}
            renderItem={({ item }) => (
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
                  setSelectedRegNo(item.reg_no);
                  onSelectRegNo(item.reg_no);
                  setClicked(false);
                }}>
                <Text style={{ fontWeight: '600', color: colors.dark }}>{item.reg_no}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}  
    </View>
  );
};

export default DropDown;
