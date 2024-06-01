import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
  } from "react-native";
  import { Button, TextInput, IconButton } from "react-native-paper";
  import { useState } from "react";
  import { useFonts } from "expo-font";
  import colors from "../components/colors";
  import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import TeacherScreen from "./teacherScreen";
  
  export default LoginScreen = ({ navigation ,route}) => {
  
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconName, setIconName] = useState("eye");
    const [validIcon, setValidIcon] = useState("cross");
    const [validIconColor, setValidIconColor] = useState("red");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const { role } = route.params;
    console.log("My role is: "+role)


    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
      setIconName(secureTextEntry ? "eye-off" : "eye");
    };
  
    const setEmailTxt = (value) => {
      setEmail(value);
      const emailRegex = /^[a-zA-Z][\w\.-]+@[\w\.-]+\.\w+$/;
      if (emailRegex.test(value)) {
        setValidIcon("check");
        setValidIconColor("#90ee90");
      } else {
        setValidIcon("close");
        setValidIconColor("#FF7F7F");
      }
    };
  
    const setPasswordTxt = (value) => {
      setPassword(value);
    };
    


    const handleLogin = async () => {
      try {
        let userRef;
        if (role === "Teacher") {
          userRef = firebase.firestore().collection("Teacher");
        } else if (role === "Student") {
          userRef = firebase.firestore().collection("Student");
        } else if (role === "Admin") {
          userRef = firebase.firestore().collection("Admin");
        } else {
          return;
        }
    
        const snapshot = await userRef
          .where("email", "==", email)
          .where("password", "==", password)
          .get();
    
        if (snapshot.empty) {
          // User not found or invalid credentials
          alert("Invalid email or password.");
        } else {
          // Authentication successful, navigate to appropriate screen
          snapshot.forEach(doc => {
            const userData = doc.data();
            if (role === "Teacher") {
              navigation.navigate("teacherScreen", { userData });
            } else if (role === "Student") {
              navigation.navigate("studentScreen", { userData });
            } else if (role === "Admin") {
              navigation.navigate("admin", { userData });
            }
          });
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in. Please check your internet connection or try again later.");
      }
    }; 
    return (
      
      <KeyboardAvoidingView behavior="padding" style={styles.default}>
        <View style={styles.logoDiv}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
  
        <View style={styles.welcomeDiv}>
          <Text style={styles.heading}>Welcome!</Text>
          <Text style={styles.text}>Please login to continue using our app</Text>
        </View>
  
        <View>
          <TextInput
            style={styles.txtInput}
            selectionColor={colors.dark}
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={"Email"}
            onChangeText={setEmailTxt}
            right={
              email == "" ? (
                ""
              ) : (
                <TextInput.Icon icon={validIcon} color={validIconColor} />
              )
            }
          />
          <TextInput
            style={styles.txtInput}
            selectionColor="black"
            cursorColor="black"
            activeOutlineColor="black"
            mode="outlined"
            label={"Password"}
            onChangeText={setPasswordTxt}
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                icon={iconName}
                color="black"
                onPress={toggleSecureEntry}
              />
            }
          />
        </View>
        <View style={styles.btnDiv}>
      <Button
        mode="contained"
        buttonColor={colors.dark}
        style={styles.connectButton}
        onPress={() => {
          console.log("powilejfmfn")
          handleLogin();
        }}
      >
        Login
      </Button>
    </View>
        
      </KeyboardAvoidingView>
      
   
    );
  };
  
  const styles = StyleSheet.create({
    defaultFont: {
    },
    default: {
      position: "relative",
      bottom: 30,
      backgroundColor: colors.light_bg,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logoDiv: {
      marginBottom: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      height: 200,
      width: 200,
      opacity: 0.9,
    },
    welcomeDiv: {
      width: 350,
      marginBottom: 20,
    },
    heading: {
      fontWeight: "bold",
      fontSize: 25,
      marginBottom: 5,
      color: colors.dark,
    },
    text: {
      fontSize: 15,
      color: "#5A5A5A",
    },
    btnDiv: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    connectButton: {
      width: 350,
      padding: 5,
      margin: 5,
    },
    txtInput: {
      width: 350,
      margin: 5,
      backgroundColor: "white",
    },
  });
  