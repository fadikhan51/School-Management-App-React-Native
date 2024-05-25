import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
  } from 'react-native';
  import colors from '../components/colors';
  import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import React, { useRef, useState } from 'react';
  const countries = [
    { country: 'Afghanistan', code: '93', iso: 'AF' },
    { country: 'Albania', code: '355', iso: 'AL' },
    { country: 'Algeria', code: '213', iso: 'DZ' },
    { country: 'American Samoa', code: '1-684', iso: 'AS' },
    { country: 'Andorra', code: '376', iso: 'AD' },
  ];
  const classes = [
    { class:"Nursery" ,value:0 },
    { class:"Prep" , value:1 },
    { class:"Class 1" ,value:2 },
    { class:"Class 2" ,value:3 },
    { class:"Class 3" ,value:4 },
    { class:"Class 4" ,value:5 },
    { class:"Class 5" ,value:6 },
    { class:"Class 6" ,value:7 },
    { class:"Class 7" ,value:8 },
    { class:"Class 8" ,value:9 }
  
  ];
  const DropDown = () => {
    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(classes);
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
    return (
      <View>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 60,
            borderBlockColor: 'white',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop:20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'white'
          }}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text style={{ fontWeight: '600', color: colors.dark }}>
            {selectedCountry == '' ? 'Select Class' : selectedCountry}
          </Text>
          {clicked ? (
            <MaterialCommunityIcons name="menu-up" size={30} color={colors.dark} />
  
          ) : (
            <MaterialCommunityIcons name="menu-down" size={30} color={colors.dark} />
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
                color: 'black'
              }}
            />
  
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
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
                      setSelectedCountry(item.class);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{ fontWeight: '600', color: colors.dark }}>{item.class}</Text>
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