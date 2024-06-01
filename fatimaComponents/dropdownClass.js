import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './colors';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const DropDowncls = ({ onSelectClassname }) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [classname,setclassName]=useState('')


  const classnames1=[
    'Nursery','Prep','Class 1','Class 2','Class 3','Class 4','Class 5',
    'Class 6','Class 7','Class 8'
  ]


  const searchRef = useRef();

  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const classRef = await firestore().collection('Class').get();
        const classNames = classRef.docs.map(doc => doc.data().name);
        setClassNames(classNames);
      } catch (error) {
        console.error('Error fetching class names:', error);
        setClassNames([]);
      }
    };

    fetchClassNames();
  }, []);

  const handleSearchChange = searchText => {
    setSearch(searchText);
    // You can add filtering logic here if needed
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
          setClicked(!clicked);
        }}>
        <Text style={{ fontWeight: '600', color: colors.dark }}>
          {search === '' ? 'Select Class' : search}
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
            data={classnames1}
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
                  onSelectClassname(item); // Pass the class name to the parent component
                  setSearch(item); // Update the search state with the selected class name
                  setClicked(false);
                }}>
                <Text style={{ fontWeight: '600', color: colors.dark }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default DropDowncls;
