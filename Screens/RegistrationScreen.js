import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,

} from 'react-native';

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/photoBG.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View></View>
          <Text style={styles.formTitle}>Регистрация</Text>
          <View style={{marginTop: 32}}>
            <TextInput style={styles.input} textAlign={"left"} placeholder={"Логин"} />
          </View>
          <View style={{marginTop: 16}}>
            <TextInput style={styles.input} textAlign={"left"} placeholder={"Адрес электронной почты"} />
          </View>
          <View style={{marginTop: 16}}>
            <TextInput style={styles.input} textAlign={"left"} placeholder={"Пароль"} secureTextEntry={"true"} />
          </View>
          <View style={{marginTop: 43}}>
            <TouchableOpacity
              style={styles.signUpBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.signUpBtnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>   
      </ImageBackground>  
    </View>
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
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formTitle: {
    color: "#212121",
    marginHorizontal: "auto",
    marginTop: 92,
    fontSize: 30,
  },
  signUpBtn: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: "center",
  },
  signUpBtnTitle: {
    fontSize: 16,
    color: "#FFFFFF",
  }
});
