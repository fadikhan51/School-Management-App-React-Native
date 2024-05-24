import React from 'react';
import {ReactNativeZoomableView} from '@dudigital/react-native-zoomable-view';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import DropDown from './dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import {Button} from 'react-native-paper';

export default stuTimeTable = () => {
  const [dialog, setDialog] = React.useState(false);
  const DATA = [
    {
      id: 1,
      title:
        'Students must maintain a minimum of 90% attendance in each subject to be eligible to sit for the final examinations.',
    },
    {
      id: 2,
      title:
        'In the case of extended absences due to illness, a medical certificate must be provided upon the student’s return.',
    },
    {
      id: 3,
      title:
        'Unexcused absences, such as skipping classes or family vacations not approved by the school, will negatively impact the attendance record.',
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.rulesBlock}>
      {/* <MaterialCommunityIcons name="check" size={10} color={colors.dark} /> */}
      <Text style={styles.rowid}>{item.id}. </Text>
      <Text style={styles.row}>{item.title}</Text>
    </View>
  );
  //   const onClose=() => setModalVisible(false),
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
          Time Table
        </Text>
        <View style={styles.download}>
          <MaterialCommunityIcons
            name="folder-download-outline"
            size={30}
            color={colors.dark}
          />
        </View>
      </View>

      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={() => setDialog(true)}>
          <Image
            style={styles.img}
            source={require('../assets/stuTimetable.jpg')}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.rulesContainer}>
        <Text style={styles.rulestxt}>Rules and Regulation</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // _numColumns={4}
        />
      </View>
      <Modal visible={dialog} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDialog(false)}>
                <Text style={styles.modalHeaderCloseText}>X</Text>
              </TouchableOpacity>
            </View>

            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              captureEvent={true}>
              <Image
                style={styles.imgmodal}
                source={require('../assets/stuTimetable.jpg')}></Image>
            </ReactNativeZoomableView>
          </View>
        </View>
      </Modal>
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
  imgContainer: {},
  img: {
    marginHorizontal: 30,
    width: 350,
    height: 430,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'black',
    // borderTopLeftRadius: 30,
    shadowColor: 'black', // Shadow color
    shadowOpacity: 0.3, // Shadow opacity
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4, // Shadow radius
    elevation: 5,
    alignItems: 'center',
    // borderTopRightRadius: 30,
    // marginLeft: 5,
    // marginRight: 8,
    height: 845,
  },
  modaltxt: {
    fontSize: 18,
    marginTop: 20,
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 25,
  },
  imgmodal: {
    width: 450,
    height: 500,
    resizeMode: 'contain',
  },
  modalHeader: {
    flexDirection: 'row',
  },
  modalHeaderCloseText: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: 'white',
    marginLeft: 360,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'white',
    fontSize: 20,
  },
  rulesContainer: {
    maxWidth: '85%',
    alignSelf: 'center',
  },

  row: {
    color: colors.dark,
  },

  rowid: {
    fontWeight: 'bold',

    color: colors.dark,
  },

  rulestxt: {
    color: colors.dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  rulesBlock: {
    flexDirection: 'row',
  },
});
