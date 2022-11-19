import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView, 
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { useSelector } from 'react-redux';

import firebaseApp from '../../firebase/config';
import MessageCircle from '../../assets/icons/messageCircle.svg';
import MapPin from '../../assets/icons/mapPin.svg';

export default function HomeScreen({ navigation }) { 
    
    const [posts, setPosts] = useState([])
 
    const { nickname, email, photoURL } = useSelector((state) => state.auth)

    useEffect(() => {
        const db = getFirestore(firebaseApp)
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        })
        
    }, [])

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
                    onPress={() => navigation.navigate("Comments", { postId: item.id, uri: item.photo })}
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
            <SafeAreaView style={styles.areaView}>
                <View style={styles.userContainer}>
                    <Image
                        source={photoURL ?
                            {uri: photoURL} :
                            require('../../assets/images/anonymous.jpg') }
                        style={styles.userPhoto}
                    />
                    <View>
                        <Text style={styles.userLoginTitle}>{ nickname ? nickname : "Anonymous" }</Text>
                        <Text style={styles.userEmailTitle}>{ email ? email : "Anonymous"  }</Text>
                    </View>
                </View>

                {posts.length !== 0 ?
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        /> :
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
                    </View>}    
            </SafeAreaView>
        </View>
    )
}
        
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
    },
    userContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 16,
    },
    userPhoto: {
        width: 60,
        height: 60,
        resizeMode: "cover",
        borderRadius: 16,
        marginRight: 8,
    },
    userLoginTitle: {
        fontFamily: "Roboto-Bold",
        fontSize: 13,
    },
    userEmailTitle: {
        fontFamily: "Roboto-Regular",
        fontSize: 11,
    },
    postContainer: {
        justifyContent: "flex-start",
        marginTop: 16,
        marginBottom: 16,
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
    areaView: {
        marginBottom: 70,
    },
})