import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import colors from "../components/colors";

export default ChooseRole = ({navigation}) => {

  return (
    <View style={styles.default}>
      <View style={styles.logoDiv}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>

      <Text style={styles.headingTxt}>Login as</Text>
      <View style={styles.button}>
      <Button
        mode="elevated"
        buttonColor={colors.dark}
        textColor="white"
        style={styles.login}
        onPress={() => { navigation.navigate('login', { role: 'Admin' }) }}
        >
        <Text style={styles.loginText}>Admin</Text>
      </Button>
      <Button
        mode="outlined"
        textColor={colors.dark}
        style={styles.login}
        onPress={() => { navigation.navigate('login', { role: 'Teacher' }) }}

      >
        <Text style={styles.loginText}>Teacher</Text>
      </Button>
      <Button
        mode="outlined"
        textColor={colors.dark}
        style={styles.login}
        onPress={() => { navigation.navigate('login', { role: 'Student' }) }}

      >
        <Text style={styles.loginText}>Student</Text>
      </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoDiv: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height:200,
    width: 200,
    opacity: 0.9
  },
  headingTxt: {
    marginBottom:50,
    fontSize:40,
    color: '#3D3B40',
    fontWeight: 'bold'
  },
  default: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    width : '100%',
    alignItems: 'center'
  },
  login: {
    width: "80%",
    padding: 2,
    margin: 5,
  },
  loginText: {
    fontSize: 16,
  },
});
