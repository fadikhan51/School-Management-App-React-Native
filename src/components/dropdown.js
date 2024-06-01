import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import colors from '../../components/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DropDown = ({ items, placeholder, onSelect, width, displayTop }) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(items);
  const [selectedItem, setSelectedItem] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    setData(items); // Update data when items prop changes
  }, [items]);

  const onSearch = (search) => {
    if (search !== '') {
      let tempData = items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      setData(tempData);
    } else {
      setData(items);
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
          width ? { width } : { width: '90%' },
        ]}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{ fontWeight: '600', color: colors.dark }}>
          {selectedItem === '' ? placeholder : selectedItem}
        </Text>
        {clicked ? (
          <MaterialCommunityIcons name="menu-up" size={30} color={colors.dark} />
        ) : (
          <MaterialCommunityIcons name="menu-down" size={30} color={colors.dark} />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={[
            displayTop
              ? {
                position: 'absolute',
                top: 70,
                zIndex: 1,
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
              },
            width ? { width } : { width: '90%' },
          ]}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={(txt) => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              marginTop: 10,
              width: '90%',
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
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
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
                  setSelectedItem(item.label);
                  setClicked(!clicked);
                  onSearch('');
                  setSearch('');
                  onSelect(item.value);
                }}>
                <Text style={{ fontWeight: '600', color: colors.dark }}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropDown;