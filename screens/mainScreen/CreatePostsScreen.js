import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import CameraBlack from '../../assets/icons/cameraBlack.svg';
import MapPin from '../../assets/icons/mapPin.svg';
import Trash from '../../assets/icons/trash.svg';

import firebaseApp from '../../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const initialState = {
  title: "",
  area: "",
}

export default function CreatePostsScreen({ navigation }) { 

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [camera, setCamera] = useState(null) 
    const [photo, setPhoto] = useState(null)
    const [dimension, setDimension] = useState(Dimensions.get("window").width - 16 * 2)
    const [post, setPost] = useState(initialState)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [cameraBtnVisible, setCameraBtnVisible] = useState(true)

    const keyboardHide = () => {
        setKeyboardVisible(true)
        Keyboard.dismiss()
    }

    const {userId, nickname} = useSelector((state) => state.auth)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(true)
        })
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(false)
        })

        return () => {
        showSubscription.remove()
        hideSubscription.remove()
        };
    }, [])
      
    useEffect(() => {
        (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        })();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>?????? ?????????? ???????? ????????????????????, ?????????? ???????????????? ????????????</Text>
            <Button onPress={requestPermission} title="???????????????? ????????????" />
        </View>
        );
    }

    if (errorMsg) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>???????????????????? ???? ???????????? ?? ???????????????????????????? ???????? ??????????????????</Text>
        </View>
        )
    }

    const takePhoto = async () => {
        setCameraBtnVisible(false)
        const photo = await camera.takePictureAsync()
        const location = await Location.getCurrentPositionAsync()
        setPhoto(photo.uri)
        setLocation(location)
    }

    const sendPhoto = async () => { 
        if (post.title.length === 0) { return alert("?????????????? ???????????????? ????????????") }
        if (post.area.length === 0) { return alert("?????????????? ???????????????? ??????????????????") }
        
        await uploadPostToServer()
        navigation.navigate("Posts")
        onTrashPress()
    }

    const uploadPostToServer = async () => {
        const photo = await uploadPhotoToServer()
        const db = await getFirestore(firebaseApp)
        const createPost = await addDoc(collection(db, "posts"), {
                photo,
                photoTitle: post.title,
                photoArea: post.area,
                location: location.coords,
                userId,
                nickname,
            }
        )    
    }

    const uploadPhotoToServer = async () => {
        const response = await fetch(photo)
        const file = await response.blob()

        const storage = await getStorage(firebaseApp)
        const uniquePostId = Date.now().toString()
        const mountainsRef = await ref(storage, `postImage/${uniquePostId}`)
        await uploadBytes(mountainsRef, file)
        
        const processedPhoto = await getDownloadURL(ref(storage, `postImage/${uniquePostId}`))
        return processedPhoto;
    }

    const onTrashPress = () => {
        setPhoto(null)
        setPost(initialState)
        setLocation(null)
        setCameraBtnVisible(true)
        setKeyboardVisible(false)
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => keyboardHide()}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView>
                        <View style={{...styles.cameraContainer, display: keyboardVisible && "none"}}>
                            <Camera style={styles.camera} ref={setCamera}>
                                {photo && <View style={styles.picture}>
                                    <Image source={{uri:photo}}  style={{height: 240, width: dimension}}/>
                                </View>}
                                {cameraBtnVisible && <TouchableOpacity
                                    style={styles.cameraButton}
                                    activeOpacity={0.8}
                                    onPress={() => takePhoto()}
                                >
                                    <CameraBlack width={24} height={24} />
                                </TouchableOpacity>}
                            </Camera>
                        </View>
                        <Text style={styles.photoTitle}>?????????????????? ????????</Text>
                        <TextInput
                            style={{...styles.inputPhotoName}}
                            textAlign={"left"}
                            placeholder={"????????????????..."}
                            value={post.title}
                            onChangeText={(value)=> setPost((prevState)=>({...prevState, title: value}))}
                        />
                        <View style={{position: "relative", width: "100%"}}>
                            <TextInput
                                style={{...styles.inputPhotoName, paddingLeft: 28}}
                                textAlign={"left"}
                                placeholder={"??????????????????"}
                                value={post.area}
                                onChangeText={(value)=> setPost((prevState)=>({...prevState, area: value}))}
                            />
                            <View style={styles.mapIconContainer}>
                                <MapPin width={24} height={24} />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            activeOpacity={0.8}
                            onPress={()=>sendPhoto()}
                        >
                            <Text style={styles.buttonText}>????????????????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            activeOpacity={0.8}
                            onPress={() => {onTrashPress()}}
                        >
                            <Trash width={24} height={24}  />
                        </TouchableOpacity>   
                    </ScrollView>  
                </KeyboardAvoidingView>  
            </View>    
        </TouchableWithoutFeedback>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
    },
    cameraContainer: {
        flex: 1,
        width: "100%",
        borderRadius: 25,
    },
    camera: {
        height: 240,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraButton: {
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    photoTitle: {
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        marginBottom: 32,
    },
    inputPhotoName: {
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
    },
    mapIconContainer: {
        position: "absolute",
        left: 0,
        top: 13,
    },
    addButton: {
        height: 51,
        width: "100%",
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        marginTop: 32,
        marginBottom: 120,
    },
    buttonText: {
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
    },
    deleteButton: {
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F6F6F6",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 34,
        justifyContent: "center",
        alignItems: "center",
    },
    picture: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
    },
})