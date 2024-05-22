import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../components/ModalComponentStudent'; // Adjust the path as per your project structure
import colors from '../components/colors';

const InsertMarksTeacher = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

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
        <View>
          <Text style={[styles.headerTxt, {alignSelf: 'center'}]}>Teacher</Text>
        </View>
        <View style={styles.download}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={30}
              color={colors.dark}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ModalComponent
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: colors.light_bg,
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
    marginBottom: 10,
  },
});

export default InsertMarksTeacher;
