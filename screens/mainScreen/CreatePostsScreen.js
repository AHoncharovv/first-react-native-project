import { async } from '@firebase/util';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from "expo-media-library";
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
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";



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

    // const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Нам нужно ваше разрешение, чтобы показать камеру</Text>
            <Button onPress={requestPermission} title="Показать камеру" />
        </View>
        );
    }

    if (errorMsg) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Разрешение на доступ к местоположению было отклонено</Text>
        </View>
        )
    }

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        const location = await Location.getCurrentPositionAsync()
        setPhoto(photo.uri)
        setLocation(location)
        // setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const sendPhoto = () => { 
        if (post.title.length === 0) { return alert("Укажите название снимка") }
        if (post.area.length === 0) { return alert("Укажите название местности") }
        
        uploadPostToServer()
        navigation.navigate("Posts")
        // uploadPhotoToServer()
        onTrashPress()
        setKeyboardVisible(false)
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
        // const storage = getStorage(firebaseApp);
        // const db = getFirestore(firebaseApp);
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
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => keyboardHide()}>
            <KeyboardAvoidingView   KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{...styles.cameraContainer, display: keyboardVisible && "none"}}>
                            <Camera style={styles.camera} ref={setCamera}>
                                {photo && <View style={styles.picture}>
                                    <Image source={{uri:photo}}  style={{height: 240, width: dimension}}/>
                                </View>}
                                <TouchableOpacity
                                    style={styles.cameraButton}
                                    activeOpacity={0.8}
                                    onPress={() => takePhoto()}
                                >
                                    <CameraBlack width={24} height={24} />
                                </TouchableOpacity>
                            </Camera>
                        </View>
                        <Text style={styles.photoTitle}>Загрузите фото</Text>
                        <TextInput
                            style={{...styles.inputPhotoName}}
                            textAlign={"left"}
                            placeholder={"Название..."}
                            value={post.title}
                            onChangeText={(value)=> setPost((prevState)=>({...prevState, title: value}))}
                        />
                        <View style={{position: "relative", width: "100%"}}>
                            <TextInput
                                style={{...styles.inputPhotoName, paddingLeft: 28}}
                                textAlign={"left"}
                                placeholder={"Местность"}
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
                            <Text style={styles.buttonText}>Опубликовать</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            activeOpacity={0.8}
                            onPress={() => {onTrashPress()}}
                            >
                            <Trash width={24} height={24}  />
                        </TouchableOpacity>   
                    </View> 
                </ScrollView>  
            </KeyboardAvoidingView>  
        </TouchableWithoutFeedback>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
    },
    cameraContainer: {
        flex: 1,
        width: "100%",
        borderRadius: 25,
        // height: 240,
        //  
        // borderRadius: 8,
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