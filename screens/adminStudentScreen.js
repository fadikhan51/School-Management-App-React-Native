import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import CustomCheckbox from '../components/checkBox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../components/colors';
import HeaderDefault from '../components/defaultHeader';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import ListItem from '../components/listItem';
import firestore from '@react-native-firebase/firestore';
import ModalBottomTest from '../components/stdDetailsModal';

const stdRef = firestore().collection('Student');

export const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const AdminStudentScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [stdList, setStdList] = useState([]);
  const [filteredStd, setFilteredStd] = useState([]);
  const [stdModalVisible, setStdModalVisible] = useState([]);
  const [checkedStates, setCheckedStates] = React.useState([
    false, // Nursery
    false, // Prep
    false, // Class 1
    false, // Class 2
    false, // Class 3
    false, // Class 4
    false, // Class 5
    false, // Class 6
    false, // Class 7
    false, // Class 8
  ]);

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

  async function addStudent(std) {
    const largestRegNo = Math.max(...filteredStd.map(stud => stud.reg_no));
    std.reg_no = largestRegNo + 1;
    await stdRef.add(std).then(() => {
      console.log('Added');
      setModalVisible(false);
    });
  }
  
  async function updateStudent(id, std) {
    await stdRef
      .doc(id)
      .update(std)
      .then(() => {
        setUpdateModalVisible(false);
      });
  }
  
  async function deleteStudent(id){
    await stdRef.doc(id).delete().then(() => {
      console.log('Deleted');
    });
  }

  useEffect(() => {
    return stdRef.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {
          admission_class,
          admission_date,
          caste,
          dob,
          email,
          father_name,
          gender,
          name,
          occupation,
          reg_no,
          password,
          remarks,
          residence,
        } = doc.data();
        list.push({
          id: doc.id,
          admission_class: admission_class,
          caste: caste,
          dob: dob,
          email: email,
          father_name: father_name,
          gender: gender,
          name: name,
          occupation: occupation,
          password: password,
          reg_no: reg_no,
          remarks: remarks,
          residence: residence,
          admission_date: admission_date,
        });

        setStdModalVisible([...stdModalVisible, false]);
      });

      setStdList(list);
      console.log(list);
      setFilteredStd(list);
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const toggleCheckbox = index => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);

    if (updatedCheckedStates[index]) {
      const filter = stdList.filter(std => {
        return Object.entries(std.admission_class)[0][1]
          .toLowerCase()
          .includes(labels[index].toLowerCase());
      });
      setStdList(filter);
    } else {
      setStdList(filteredStd);
    }
  };

  const toggleStdModal = index => {
    console.log(index)
    const updatedCheckedStates = [...stdModalVisible];
    updatedCheckedStates[index] = !stdModalVisible[index];
    setStdModalVisible(updatedCheckedStates);
  };

  const stdDetails = std => {
    return Object.entries(std).map(([key, value]) => (
      <View
        key={`${key}-${value}`}
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: 'bold'}}>{key.replace(/_/g, ' ')}: </Text>
        <Text>
          {value instanceof firestore.Timestamp
            ? value.toDate().toLocaleString()
            : key == 'admission_class'
            ? Object.entries(std.admission_class)[0][1]
            : value.toString()}
        </Text>
      </View>
    ));
  };

  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [text, setText] = React.useState('');
  const scrollRef = useRef(null);

  const onDismiss = useCallback(task => {
    setStdList(tasks => tasks.filter(item => item.id !== task.id));
    deleteStudent(task.id);
  }, []);

  const searchStd = () => {
    if (text.length > 0) {
      const filter = stdList.filter(std => {
        return std.reg_no.toString().toLowerCase().includes(text.toLowerCase());
      });
      setStdList(filter);
    } else {
      setStdList(filteredStd);
    }
  };

  return !loading ? (
    <>
      <HeaderDefault
        title="Manage Students"
        leftIcon="arrow-left"
        rightIcon="plus"
        onRightPress = {() => {navigation.goBack()}}
        onPress={() => setModalVisible(true)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <ModalBottomTest
          title={'Insert Details'}
          buttonTitle={'Insert'}
          visible={modalVisible}
          onClose={addStudent}
        />
        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          value={text}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Search by Reg no'}
          right={
            <TextInput.Icon
              onPress={() => {
                setStdList(filteredStd);
                setCheckedStates([
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ]);
                setText('');
              }}
              icon="close"
            />
          }
          onChangeText={setText}
        />
        <ModalPoup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <Text
                style={{alignSelf: 'center', fontSize: 20, color: colors.dark}}>
                Apply Filter
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={25}
                  color={colors.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.container}>
            {labels.map((label, index) => (
              <CustomCheckbox
                key={index}
                label={label}
                checked={checkedStates[index]}
                setChecked={() => toggleCheckbox(index)}
              />
            ))}
          </ScrollView>
        </ModalPoup>
        <TouchableOpacity
          style={{paddingLeft: 10, alignSelf: 'center'}}
          onPress={() => setVisible(true)}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={30}
            color={colors.dark}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Button
          mode="contained"
          buttonColor={colors.dark}
          contentStyle={styles.searchTxt}
          style={styles.searchBtn}
          onPress={() => {
            searchStd();
          }}>
          Search
        </Button>
        <ScrollView ref={scrollRef}>
          {stdList.map((std, index) => (
            <TouchableOpacity
              onPress={() => {
                toggleStdModal(index);
              }}>
              <ModalPoup visible={stdModalVisible[index]}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.header}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        color: colors.dark,
                      }}>
                      Details
                    </Text>
                    <TouchableOpacity onPress={() => toggleStdModal(index)}>
                      <MaterialCommunityIcons
                        name="window-close"
                        size={25}
                        color={colors.dark}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView contentContainerStyle={styles.container}>
                  {stdDetails(std)}
                </ScrollView>
                <Button
                  mode="elevated"
                  textColor={colors.dark}
                  onPress={() => {
                    setUpdateModalVisible(true);
                  }}>
                  Update
                </Button>
                <ModalBottomTest
                  data={std}
                  title={'Update Details'}
                  buttonTitle={'Update'}
                  visible={updateModalVisible}
                  onClose={updateStudent}
                />
              </ModalPoup>
              <ListItem
                simultaneousHandlers={scrollRef}
                key={std.id}
                task={std}
                onDismiss={onDismiss}>
                <Text style={styles.taskTitle}>{std.name}</Text>
                {/* Object.entries(std.admission_class)[0] gives us ["1", "nursery"] */}
                <Text style={styles.taskTitle}>
                  {Object.entries(std.admission_class)[0][1]}
                </Text>
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  ) : (
    <ActivityIndicator />
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: 16,
  },
  txtInput: {
    width: '85%',
    marginLeft: 5,
    backgroundColor: 'white',
  },
  searchTxt: {
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  searchBtn: {
    margin: 20,
    height: 60,
  },
  taskTitle: {
    fontSize: 16,
  },
});

export default AdminStudentScreen;
