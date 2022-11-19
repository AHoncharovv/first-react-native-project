import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

import firebaseApp from '../firebase/config';
import { authStateChangeUser } from '../redux/auth/authOperations';

export default function Avatar() {

    const [camera, setCamera] = useState(null) 
    const [photo, setPhoto] = useState(null) 
    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions()

    const { userId, photoURL } = useSelector(state => state.auth) 
    const dispatch = useDispatch()

    useEffect(() => {
        if (photo !== null) { return }
        setPhoto(photoURL)
    }, [photoURL])

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Нам нужно ваше разрешение, чтобы показать камеру</Text>
            <Button onPress={requestPermission} title="Показать камеру" />
        </View>
        );
    }

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        setPhoto(photo.uri)
    }

    const resetPhoto = async () => {
        await updateUserPhoto(null)
        setPhoto(null)
    }
    
    const savePhoto = async () => {
        const response = await fetch(photo)
        const file = await response.blob()

        const storage = await getStorage(firebaseApp)
        const mountainsRef = await ref(storage, `userImage/${userId}`)
        await uploadBytes(mountainsRef, file)
        
        const processedPhoto = await getDownloadURL(ref(storage, `userImage/${userId}`))
        await updateUserPhoto(processedPhoto)
        dispatch(authStateChangeUser())
        resetPhoto()
    }
    
    const updateUserPhoto = async (url) => {
        const auth = await getAuth();
        await updateProfile(auth.currentUser, {
        photoURL: url,
        })
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={setCamera}>
                {photo &&
                    <View style={styles.picture}>
                        <Image source={{uri:photo}}  style={styles.pictureImage}/>
                    </View>}
                    {photo ?
                        <TouchableOpacity
                            style={ styles.cameraReverse }
                            activeOpacity={0.8}
                            onPress={savePhoto}
                        >
                            <AntDesign name="cloudupload" size={24} color="#FF6C00" />
                        </TouchableOpacity> 
                        :
                        <TouchableOpacity
                            style={styles.cameraReverse}
                            activeOpacity={0.8}
                            onPress={toggleCameraType}
                        >
                            <Ionicons name="md-camera-reverse" size={24} color="#FF6C00" />
                        </TouchableOpacity>}
                    {photo ?
                        <TouchableOpacity
                            style={styles.cameraClose}
                            activeOpacity={0.8}
                            onPress={() => resetPhoto()}
                        >
                            <AntDesign name="closecircle" size={20} color="#FF6C00" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.cameraClick}
                            activeOpacity={0.8}
                            onPress={() => takePhoto()}
                        >
                            <Ionicons name="camera" size={24} color="#FF6C00" />
                        </TouchableOpacity>}  
            </Camera>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 120,
        height: 120,
    },
    camera: {
        width: 120,
        height: 120,
    },
    picture: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    pictureImage: {
        width: 120,
        height: 120,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    cameraReverse: {
        position: "absolute",
        left: -12,
        top: 48,
    },
    cameraClick: {
        position: "absolute",
        right: -12,
        top: 48,    
    },
    cameraClose: {
        position: "absolute",
        right: -10,
        top: 50, 
    },
})