import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import colors from './colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useRef, useState } from 'react';
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
const DropDown = (props) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(classes);
  const [selectedCountry, setSelectedCountry] = useState(props.selected ? props.selected : '');
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
        style={[
          {
            height: 60,
            borderBlockColor: 'white',
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'white',
          },
          props.width ? {width: props.width} : {width: '90%'},
        ]}
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
          style={[props.displayTop ? 
            {
              position: 'absolute',
              top: 70,
              zIndex: 50000,
              elevation: 5,
              height: 300,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: 10,
            }
          : {
            elevation: 5,
            marginTop: 20,
            height: 300,
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderRadius: 10,
          }, props.width ? {width: props.width+5} : {width: '90%'}]}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            

            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
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
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    props.onSelect ? props.onSelect(item.class) : null;
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