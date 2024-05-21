import React from 'react';
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
import {TextInput, Button} from 'react-native-paper';

const ModalPoup = ({visible, children}) => {
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

const ModalScreen = () => {
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

  const toggleCheckbox = index => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  return (
    <>
      <HeaderDefault
        title="Manage Students"
        leftIcon="arrow-left"
        rightIcon="plus"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 20
        }}>
        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Search by Reg no'}
          onChangeText={setText}
        />
        <ModalPoup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <Text style={{alignSelf: 'center', fontSize: 20}}>
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
        <TouchableOpacity style={{paddingLeft:10, alignSelf:'center'}} onPress={()=> setVisible(true)}>
          <MaterialCommunityIcons name="filter-outline" size={30} color={colors.dark} />
        </TouchableOpacity>
      </View>
      <View>
      <Button
        mode="contained"
        buttonColor={colors.dark}
        contentStyle={styles.searchTxt}
        style={styles.searchBtn}
        onPress={() => {
            alert("tasks")
        }}
      >
        Search
      </Button>
      </View>
    </>
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
});

export default ModalScreen;
