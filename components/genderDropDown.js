import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import colors from './colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useState} from 'react';

const GenderDropDown = props => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(props.classes);
  const [selectedClass, setSelectedClass] = useState(props.selected ? 'male' : '');

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
        <Text style={{fontWeight: '600', color: colors.dark}}>
        {selectedClass == '' ? 'Select Gender' : selectedClass}
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
          style={[
            props.displayTop
              ? {
                  position: 'absolute',
                  top: 70,
                  zIndex: 50000,
                  elevation: 5,
                  height: 100,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }
              : {
                  elevation: 5,
                  marginTop: 20,
                  height: 100,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                },
            props.width ? {width: props.width} : {width: '90%'},
          ]}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
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
                    setSelectedClass(item.class);
                    setClicked(!clicked);
                  }}>
                  <Text style={{fontWeight: '600', color: colors.dark}}>
                    {item.class}
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

export default GenderDropDown;
