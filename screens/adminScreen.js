import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const icons = [
  {
    id: 1,
    image: require('../assets/tch.png'),
    title: 'Teacher',
    navigate: 'AddTeacher',
  },
  {
    id: 2,
    image: require('../assets/std.png'),
    title: 'Student',
    navigate: 'AddStudent',
  },
  {
    id: 3,
    image: require('../assets/budget.png'),
    title: 'Finance',
    navigate: 'FeeStatusForm',
  },
  {
    id: 4,
    image: require('../assets/analytics.png'),
    title: 'Analytics',
    navigate: 'AnalyticsModal'
  },
  {
    id: 5,
    image: require('../assets/schedule.png'),
    title: 'Timetable',
    navigate: 'TimeTable',
  },
  {
    id: 6,
    image: require('../assets/syllabus.png'),
    title: 'Syllabus',
    navigate: 'syllabusScreen',
  }
];

const AdminScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = item => (
    <View style={styles.iconsContainer} key={item.id}>
      <TouchableHighlight
        style={styles.iconContainer}
        underlayColor="white"
        onPress={() => {
          if (item.navigate === 'AnalyticsModal') {
            setModalVisible(true);
          } else {
            navigation.navigate(item.navigate);
          }
        }}>
        <View style={styles.iconWithText}>
          <Image source={item.image} style={styles.icon} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.main}>
        <SafeAreaView style={styles.header}>
          <View style={styles.greeting}>
            <Text style={[styles.smollTxt]}>Hello</Text>
            <Text style={[styles.greetTxt, styles.darkColor]}>Mr Admin</Text>
          </View>
          <View style={styles.logout}>
            <TouchableHighlight
              style={styles.logoutIcon}
              activeOpacity={0.4}
              underlayColor={colors.medium + '00'}
              onPress={() => {
                navigation.navigate('role');
              }}>
              <MaterialCommunityIcons
                name="logout"
                size={30}
                color={colors.dark}
              />
            </TouchableHighlight>
          </View>
        </SafeAreaView>

        {/* Search Bar */}
        <View style={styles.search}>
          <Searchbar
            style={styles.searchBar}
            mode="bar"
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>

        <View style={styles.options}>
          <Text style={[styles.darkColor, styles.actionsTxt]}>
            Quick Actions
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {icons.map(item => renderItem(item))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('StudentAgeRecord');
                }}>
                <Text style={styles.modalText}>Age Report</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('StudentResultReport');
                }}>
                <Text style={styles.modalText}>Result Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  smollTxt: {
    color: colors.light,
    marginBottom: 5,
    fontSize: 18,
  },
  greetTxt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  darkColor: {
    color: colors.dark,
  },
  logout: {
    marginTop: 18,
  },
  search: {
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: 'white',
  },
  actionsTxt: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  iconsContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '35%',
    margin: 20,
  },
  iconContainer: {
    padding: 10,
    marginHorizontal: 25,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  iconWithText: {
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    color: colors.dark,
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginTop: 10,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
});

export default AdminScreen;
