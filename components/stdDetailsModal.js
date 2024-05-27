import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Modal} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import GenderDropDown from './genderDropDown';
import DropDown from './dropdown';
import colors from './colors';

const ModalBottomTest = ({data, visible, onClose, title, buttonTitle}) => {
  const [name, setNameTxt] = useState(data ? data.name : '');
  const [date, setDate] = useState(data ? data.dob.toDate() : new Date());
  const [open, setOpen] = useState(false);

  const [admissionDate, setAdmissionDate] = useState(
    data ? data.admission_date.toDate() : new Date(),
  );
  const [openAdmDate, setOpenAdmDate] = useState(false);

  const [fatherName, setFatherNameTxt] = useState(data ? data.father_name : '');
  const [caste, setCasteTxt] = useState(data ? data.caste : '');
  const [occupation, setOccupationTxt] = useState(data ? data.occupation : '');
  const [remarks, setRemarksTxt] = useState(data ? data.remarks : '');
  const [residence, setResidenceTxt] = useState(data ? data.residence : '');
  const [selectedGender, setSelectedGender] = useState(
    data ? (data.gender ? 'male' : 'female') : '',
  );
  const [selectedClass, setSelectedClass] = useState(
    data ? Object.entries(data.admission_class)[0][1] : '',
  );
  const [email, setEmailTxt] = useState(data ? data.email : '');
  const [password, setPasswordTxt] = useState(data ? data.password : '');

  const classes = [
    {class: 'Nursery', value: 0},
    {class: 'Prep', value: 1},
    {class: 'Class 1', value: 2},
    {class: 'Class 2', value: 3},
    {class: 'Class 3', value: 4},
    {class: 'Class 4', value: 5},
    {class: 'Class 5', value: 6},
    {class: 'Class 6', value: 7},
    {class: 'Class 7', value: 8},
    {class: 'Class 8', value: 9},
  ];

  const setGender = gender => {
    setSelectedGender(gender);
  };

  const setClass = c => {
    setSelectedClass(c);
  };

  const insertStd = () => {
    let Sname = name;
    let Sfather_name = fatherName;
    let Sgender = selectedGender;
    let Sclass = classes
      .map((c, index) => ({
        [`${index + 1}`]:
          c.class.toLowerCase() === selectedClass.toLowerCase()
            ? c.class
            : null,
      }))
      .filter(obj => Object.values(obj)[0] !== null)[0];
    let Semail = email;
    let Spassword = password;
    let Sdob = date;
    let Sadmission_date = admissionDate;
    let Scaste = caste;
    let Soccupation = occupation;
    let Sremarks = remarks;
    let Sresidence = residence;

    const std = {
      admission_class: Sclass,
      admission_date: Sadmission_date,
      caste: Scaste,
      dob: Sdob,
      email: Semail,
      father_name: Sfather_name,
      gender: Sgender.toLowerCase() == 'male' ? true : false,
      name: Sname,
      occupation: Soccupation,
      password: Spassword,
      remarks: Sremarks,
      residence: Sresidence,
    };
    console.log('------------------------------------------------');
    console.log(std);
    console.log('------------------------------------------------');
    onClose(std);
  };

  const updateStd = () => {
    let Sname = name;
    let Sfather_name = fatherName;
    let Sgender = selectedGender;
    let Sclass = classes
      .map((c, index) => ({
        [`${index + 1}`]:
          c.class.toLowerCase() === selectedClass.toLowerCase()
            ? c.class
            : null,
      }))
      .filter(obj => Object.values(obj)[0] !== null)[0];
    let Semail = email;
    let Spassword = password;
    let Sdob = date;
    let Sadmission_date = admissionDate;
    let Scaste = caste;
    let Soccupation = occupation;
    let Sremarks = remarks;
    let Sresidence = residence;

    const std = {
      admission_class: Sclass,
      admission_date: Sadmission_date,
      caste: Scaste,
      dob: Sdob,
      email: Semail,
      father_name: Sfather_name,
      gender: Sgender.toLowerCase() == 'male' ? true : false,
      name: Sname,
      occupation: Soccupation,
      password: Spassword,
      remarks: Sremarks,
      residence: Sresidence,
    };

    onClose(data.id, std);
  };

  return !data ? (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior="padding" style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Name'}
          onChangeText={setNameTxt}
        />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <Button
            mode="contained"
            buttonColor={colors.light}
            onPress={() => setOpen(true)}
            style={styles.dateButton}>
            {`DOB : ${date.toLocaleDateString()}`}
          </Button>
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <Button
            mode="contained"
            buttonColor={colors.light}
            onPress={() => setOpenAdmDate(true)}
            style={styles.dateButton}>
            {`DOA : ${admissionDate.toLocaleDateString()}`}
          </Button>
          <DatePicker
            modal
            open={openAdmDate}
            mode="date"
            date={admissionDate}
            onConfirm={date => {
              setOpenAdmDate(false);
              setAdmissionDate(date);
            }}
            onCancel={() => {
              setOpenAdmDate(false);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <GenderDropDown
            classes={[
              {class: 'female', value: 0},
              {class: 'male', value: 1},
            ]}
            width={'60%'}
            displayTop={true}
            onSelect={setGender}
          />
          <DropDown width={'55%'} displayTop={true} onSelect={setClass} />
        </View>

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Father Name'}
          onChangeText={setFatherNameTxt}
        />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <TextInput
            style={[styles.txtInput, {flex: 1}]}
            selectionColor={colors.dark}
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={'Caste'}
            onChangeText={setCasteTxt}
          />

          <TextInput
            style={[styles.txtInput, {flex: 1}]}
            selectionColor={colors.dark}
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={'Occupation'}
            onChangeText={setOccupationTxt}
          />
        </View>

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Email'}
          onChangeText={setEmailTxt}
        />

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          secureTextEntry
          label={'Password'}
          onChangeText={setPasswordTxt}
        />

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Residence'}
          onChangeText={setResidenceTxt}
        />

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Remarks'}
          onChangeText={setRemarksTxt}
        />

        <Button
          mode="contained"
          buttonColor={colors.dark}
          style={[styles.dateButton, {width: '90%'}]}
          onPress={insertStd}>
          {buttonTitle}
        </Button>
      </KeyboardAvoidingView>
    </Modal>
  ) : (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior="padding" style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          value={name}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Name'}
          onChangeText={setNameTxt}
        />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <Button
            mode="contained"
            buttonColor={colors.light}
            onPress={() => setOpen(true)}
            style={styles.dateButton}>
            {`DOB : ${date.toLocaleDateString()}`}
          </Button>
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <Button
            mode="contained"
            buttonColor={colors.light}
            onPress={() => setOpenAdmDate(true)}
            style={styles.dateButton}>
            {`DOA : ${admissionDate.toLocaleDateString()}`}
          </Button>
          <DatePicker
            modal
            open={openAdmDate}
            mode="date"
            date={admissionDate}
            onConfirm={date => {
              setOpenAdmDate(false);
              setAdmissionDate(date);
            }}
            onCancel={() => {
              setOpenAdmDate(false);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <GenderDropDown
            classes={[
              {class: 'female', value: 0},
              {class: 'male', value: 1},
            ]}
            selected={data.gender}
            width={'60%'}
            displayTop={true}
          />
          <DropDown
            width={'55%'}
            displayTop={true}
            selected={Object.entries(data.admission_class)[0][1]}
          />
        </View>

        <TextInput
          style={styles.txtInput}
          value={fatherName}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Father Name'}
          onChangeText={setFatherNameTxt}
        />

        <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
          <TextInput
            style={[styles.txtInput, {flex: 1}]}
            value={caste}
            selectionColor={colors.dark}
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={'Caste'}
            onChangeText={setCasteTxt}
          />

          <TextInput
            style={[styles.txtInput, {flex: 1}]}
            value={occupation}
            selectionColor={colors.dark}
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={'Occupation'}
            onChangeText={setOccupationTxt}
          />
        </View>

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          value={email}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Email'}
          onChangeText={setEmailTxt}
        />

        <TextInput
          style={styles.txtInput}
          selectionColor={colors.dark}
          value={password}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          secureTextEntry
          label={'Password'}
          onChangeText={setPasswordTxt}
        />

        <TextInput
          style={styles.txtInput}
          value={residence}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Residence'}
          onChangeText={setResidenceTxt}
        />

        <TextInput
          style={styles.txtInput}
          value={remarks}
          selectionColor={colors.dark}
          cursorColor="black"
          activeOutlineColor="black"
          mode="outlined"
          label={'Remarks'}
          onChangeText={setRemarksTxt}
        />

        <Button
          mode="contained"
          buttonColor={colors.dark}
          style={[styles.dateButton, {width: '90%'}]}
          onPress={updateStd}>
          {buttonTitle}
        </Button>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  txtInput: {
    width: 350,
    margin: 5,
    backgroundColor: 'white',
  },
  dateButton: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default ModalBottomTest;

// To use this component in a screen:
// import ModalBottomTest from './path/to/ModalBottomTest';

// const MyScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Button
//         mode="contained-tonal"
//         onPress={() => setModalVisible(true)}
//         buttonColor="grey"
//         textColor="white">
//         Present Modal
//       </Button>
//       <ModalBottomTest
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title="Modal Title"
//       />
//     </View>
//   );
// };
