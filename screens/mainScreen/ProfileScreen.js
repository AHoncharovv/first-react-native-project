import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import { useDispatch } from 'react-redux';

import Union from '../../assets/icons/union.svg';
import LogOut from '../../assets/icons/logOut.svg';
import MessageCircleOrange from '../../assets/icons/messageCircleOrange.svg';
import MapPin from '../../assets/icons/mapPin.svg';
import ThumbsUp from '../../assets/icons/thumbsUp.svg';

import firebaseApp from '../../firebase/config';
import { getAuth, signOut } from "firebase/auth";
import { authSignOutUser } from '../../redux/auth/authOperations';

export default function ProfileScreen() { 
  const auth = getAuth(firebaseApp)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(authSignOutUser())
  }

  return (

      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photoBG.jpg")}
          style={styles.image}
      >
        <ScrollView>      
          <View style={styles.areaContainer}>
              <View style={styles.photoField}>
                <Image
                  source={require("../../assets/images/photo.jpg")}
                  style={styles.userPhoto}
                />
                <TouchableOpacity
                  style={styles.userPhotoBtn}
                  activeOpacity={0.8}
                >
                  <Union />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.logOutContainer}
                activeOpacity={0.8}
              >
                <LogOut width={24} height={24} />
            </TouchableOpacity>
            

            <View style={styles.userNameContainer}>
              <Text style={styles.userNameText}>Антон Гончаров</Text>
            </View>

            <Button title="LogOut" onPress={signOut}/>

            <View style={styles.postContainer}>
              <Image
                source={require("../../assets/images/photoBG.jpg")}
                style={styles.postPhoto}
              />
              <Text style={styles.postPhotoTitle}>Горы</Text>
              <View style={styles.postCommentsContainer}>
                <View style={styles.postCommentTextContainer}>
                  <MessageCircleOrange width={24} height={24} />
                  <Text style={styles.postCommentCount}>3</Text>
                  <ThumbsUp width={24} height={24} />
                  <Text style={styles.postCommentCount}>200</Text>
                </View>
                <View style={styles.postCommentTextContainer}>
                  <MapPin width={24} height={24} />
                  <Text style={styles.postCommentText}>Кардильеры</Text>
                </View>
              </View>
            </View>

                        <View style={styles.postContainer}>
              <Image
                source={require("../../assets/images/photoBG.jpg")}
                style={styles.postPhoto}
              />
              <Text style={styles.postPhotoTitle}>Горы</Text>
              <View style={styles.postCommentsContainer}>
                <View style={styles.postCommentTextContainer}>
                  <MessageCircleOrange width={24} height={24} />
                  <Text style={styles.postCommentCount}>3</Text>
                  <ThumbsUp width={24} height={24} />
                  <Text style={styles.postCommentCount}>200</Text>
                </View>
                <View style={styles.postCommentTextContainer}>
                  <MapPin width={24} height={24} />
                  <Text style={styles.postCommentText}>Кардильеры</Text>
                </View>
              </View>
            </View>

                        <View style={styles.postContainer}>
              <Image
                source={require("../../assets/images/photoBG.jpg")}
                style={styles.postPhoto}
              />
              <Text style={styles.postPhotoTitle}>Горы</Text>
              <View style={styles.postCommentsContainer}>
                <View style={styles.postCommentTextContainer}>
                  <MessageCircleOrange width={24} height={24} />
                  <Text style={styles.postCommentCount}>3</Text>
                  <ThumbsUp width={24} height={24} />
                  <Text style={styles.postCommentCount}>200</Text>
                </View>
                <View style={styles.postCommentTextContainer}>
                  <MapPin width={24} height={24} />
                  <Text style={styles.postCommentText}>Кардильеры</Text>
                </View>
              </View>
            </View>

                        <View style={styles.postContainer}>
              <Image
                source={require("../../assets/images/photoBG.jpg")}
                style={styles.postPhoto}
              />
              <Text style={styles.postPhotoTitle}>Горы</Text>
              <View style={styles.postCommentsContainer}>
                <View style={styles.postCommentTextContainer}>
                  <MessageCircleOrange width={24} height={24} />
                  <Text style={styles.postCommentCount}>3</Text>
                  <ThumbsUp width={24} height={24} />
                  <Text style={styles.postCommentCount}>200</Text>
                </View>
                <View style={styles.postCommentTextContainer}>
                  <MapPin width={24} height={24} />
                  <Text style={styles.postCommentText}>Кардильеры</Text>
                </View>
              </View>
            </View>

        </View>
</ScrollView>          

        </ImageBackground>        
      </View>

    )
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
    justifyContent: "flex-start",
  },
  areaContainer: {
    flex: 1,
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    position: "relative", // вопрос
  },
  photoField: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  userPhotoBtn: {
    width: 25,
    height: 25,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 9,
    right: -12.5,
    backgroundColor: "#FFFFFF"
  },
  logOutContainer: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userNameContainer: {
    marginTop: 92,
    marginLeft: "auto",
    marginRight: "auto",
  },
  userNameText: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    marginBottom: 16,
  },
  postContainer: {
    flex: 1,
    margin: 16,
    justifyContent: "flex-start",
  },
  postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    resizeMode: "stretch",
  },
  postPhotoTitle: {
        marginTop: 8,
        fontFamily: "Roboto-Regular",
        fontSize: 16,
    },
    postCommentsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 8,
    },
    postCommentTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    postCommentCount: {
        color: "#212121",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
      marginLeft: 6,
        marginRight: 24,
    },
    postCommentText: {
        color: "#212121",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        marginLeft: 6,
        textDecorationLine: "underline",
    }
})
