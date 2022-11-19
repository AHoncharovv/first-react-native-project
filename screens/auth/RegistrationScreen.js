import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authSignUpUser } from '../../redux/auth/authOperations';

const initialState = {
  nickname: "",
  email: "",
  password: "",
  avatar: null,
}

export default function RegistrationScreen({ navigation }) {
  
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [loginBorderColor, setLoginBorderColor] = useState(false)
  const [emailBorderColor, setEmailBorderColor] = useState(false)
  const [passwordBorderColor, setPasswordBorderColor] = useState(false)
  const [user, setUser] = useState(initialState)
  const [dimension, setDimension] = useState(Dimensions.get("window").width - 16 * 2)
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const dispatch = useDispatch()

  const keyboardHide = () => {
    setKeyboardVisible(true)
    Keyboard.dismiss()
  }

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width
      setDimension(width - 16 * 2)
    }
    const dimensionChanges = Dimensions.addEventListener("change", onChange)
    return () => {
      dimensionChanges.remove()
    }
  }, [])

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
      setSecureTextEntry(true)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    };
  }, [])

  const onFormSubmit = () => {
    dispatch(authSignUpUser(user))
    keyboardHide()
    setUser(initialState)
  }

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photoBG.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <Text style={styles.formTitle}>Регистрация</Text>
              <View style={{marginTop: keyboardVisible ? 15: 32,}}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: loginBorderColor ? "#FF6C00" : "#E8E8E8",
                    width: dimension,
                  }}
                  textAlign={"left"}
                  placeholder={"Логин"}
                  onFocus={() => setLoginBorderColor(true)}
                  onBlur={() => setLoginBorderColor(false)}
                  value={user.nickname}
                  onChangeText={(value)=> setUser((prevState)=>({...prevState, nickname: value}))}
                />
              </View>
              <View style={{marginTop: 16}}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailBorderColor ? "#FF6C00" : "#E8E8E8",
                    width: dimension,
                  }}
                  textAlign={"left"}
                  placeholder={"Адрес электронной почты"}
                  onFocus={() => setEmailBorderColor(true)}
                  onBlur={() => setEmailBorderColor(false)}
                  value={user.email}
                  onChangeText={(value)=> setUser((prevState)=>({...prevState, email: value}))}
                />
              </View>
              <View style={styles.passwordView}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: passwordBorderColor ? "#FF6C00" : "#E8E8E8",
                    width: dimension,
                  }}
                  textAlign={"left"}
                  placeholder={"Пароль"}
                  secureTextEntry={secureTextEntry}
                  onFocus={() => setPasswordBorderColor(true)}
                  onBlur={() => setPasswordBorderColor(false)}
                  value={user.password}
                  onChangeText={(value)=> setUser((prevState)=>({...prevState, password: value}))}
                />
                <Text style={styles.passwordTitle} onPress={()=>{setSecureTextEntry(false)}}>Показать</Text>
              </View>
              <View style={{ marginTop: keyboardVisible ? 15 : 43}}>
                <TouchableOpacity
                  style={{...styles.signUpBtn, width: dimension }}
                  activeOpacity={0.8}
                  onPress={()=>onFormSubmit()}
                >
                  <Text
                    style={styles.signUpBtnTitle}
                  >
                    Зарегистрироваться</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ marginTop: 16 }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.navBtn}>
                  Уже есть аккаунт? {" "}
                  <Text style={styles.navBtnEntry}>Войти</Text>
                </Text>
              </TouchableOpacity>
              </View> 
          </KeyboardAvoidingView>   
        </ImageBackground>   
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    color: "#212121",
    padding: 16,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative',
    fontFamily: "Roboto-Regular",
  },
  formTitle: {
    color: "#212121",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    fontSize: 30,
    fontFamily: "Roboto-Medium"
  },
  signUpBtn: {
    height: 51,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: "center",
    ...Platform.select({
      ios: {
       backgroundColor: "#FF6C00", 
      },
      android: {
        backgroundColor: "#ff4500",
      }
    }) 
  },
  signUpBtnTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  photoField: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  addPhotoBtn: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: "50%",
    position: "absolute",
    bottom: 14,
    right: -12,
    justifyContent: "center",
    alignItems: "center",
  },
  navBtn: {
    color: "#1B4371",
    fontSize: 16,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto-Regular",
    marginBottom: 20,
  },
   navBtnEntry: {
    fontFamily: "Roboto-Medium",
  },
  passwordView: {
    marginTop: 16,
    position: "relative"
  },
  passwordTitle: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    position: "absolute",
    top: 16,
    right: 16,
    bottom: 15,
  },
});
