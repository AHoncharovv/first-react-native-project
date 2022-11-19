import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from '../../firebase/config';

import LogOut from '../../assets/icons/logOut.svg';
import MapPin from '../../assets/icons/mapPin.svg';
import MessageCircle from '../../assets/icons/messageCircle.svg';

import { authSignOutUser } from '../../redux/auth/authOperations';
import Avatar from '../../components/Avatar';

export default function ProfileScreen({ navigation }) { 
  const [posts, setPosts] = useState([])
  const { userId, nickname } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const db = getFirestore(firebaseApp)
    const q = query(collection(db, "posts"), where("userId", "==", userId))
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    })
  }, [])

  const signOut = () => {
    dispatch(authSignOutUser())
    console.log("retro");
  }
  
  const renderItem = ({ item }) =>
    <View style={styles.postContainer}>
      <View style={styles.postPhotoContainer}>
        <Image
            source={{uri: item.photo}}  
            style={styles.postPhoto}
        />
      </View>
      <Text style={styles.postPhotoTitle}>{item.photoTitle}</Text>
      <View style={styles.postCommentsContainer}>
        <TouchableOpacity
          style={styles.postCommentTextContainer}
          onPress={() => navigation.navigate("Comments", { postId: item.id })}
        >
          <MessageCircle width={24} height={24} />
        </TouchableOpacity>      
        <TouchableOpacity
          style={styles.postCommentTextContainer}
          onPress={() => {
            navigation.navigate("Map", {
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            })
          }}
        >
          <MapPin width={24} height={24} />
          <Text style={styles.postCommentText}>{item.photoArea}</Text>
        </TouchableOpacity>
      </View>
    </View>
 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/photoBG.jpg")}
        style={styles.image}
      >
        <View style={styles.areaContainer}>
          <View style={styles.photoField}>
            <Avatar />
          </View>
          <TouchableOpacity
            style={styles.logOutContainer}
            activeOpacity={0.8}
            onPress={signOut}
          >
            <LogOut width={24} height={24} />
          </TouchableOpacity>
          
            <View style={styles.userNameContainer}>
              <Text style={styles.userNameText}>{ nickname ? nickname : "Anonymous" }</Text>
            </View>
            {posts.length !== 0 ?  
              <SafeAreaView style={styles.safeAreaContainer}>
                <FlatList
                  data={posts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
              </SafeAreaView>
            :
              <ScrollView>
                <View style={styles.postContainer}>
                  <View style={styles.postPhotoContainer}>
                    <Image
                        source={require("../../assets/images/photoBG.jpg")}
                        style={styles.postPhoto}
                    />
                  </View>
                    <Text style={styles.postPhotoTitle}>Название фото</Text>
                  <View style={styles.postCommentsContainer}>
                    <TouchableOpacity
                      style={styles.postCommentTextContainer}
                      onPress={() => alert("Переход на комментарии к фотографие, опубликуйте свое фото!")}
                    >
                      <MessageCircle width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.postCommentTextContainer}
                      onPress={() => alert("Переход на локацию фотографии, опубликуйте свое фото!")}
                    >
                      <MapPin width={24} height={24} />
                      <Text style={styles.postCommentText}>Название местности</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            }
        </View>
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
    position: "relative",
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
  postCommentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 6,
    textDecorationLine: "underline",
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})
