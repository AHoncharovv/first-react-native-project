import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    SafeAreaView, 
    ScrollView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import MessageCircle from '../../assets/icons/messageCircle.svg';
import MapPin from '../../assets/icons/mapPin.svg';

export default function HomeScreen({ route, navigation }) { 
    
    const [posts, setPosts] = useState([])
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(() => {
        if (!route.params) { return }
        // console.log("lat1", route.params.location.coords.latitude);
        // console.log("long1", route.params.location.coords.longitude);
        setPosts(prevState => [...prevState, route.params])
        setLatitude(route.params.location.coords.latitude);
        setLongitude(route.params.location.coords.longitude);
    }, [route.params])
 
     useEffect(() => {
        if (!route.params) { return }
    }, [route.params])

    const handleMapPress = () => {
        navigation.navigate("Map", { latitude, longitude })
    }

    const renderItem = ({ item }) =>
        <View style={styles.postContainer}>
            <View style={styles.postPhotoContainer}>
                <Image
                    source={{uri: item.photo}}  
                    style={styles.postPhoto}
                />
            </View>
            <Text style={styles.postPhotoTitle}>{item.post.title}</Text>
            <View style={styles.postCommentsContainer}>
                <TouchableOpacity
                    style={styles.postCommentTextContainer}
                    onPress={() => navigation.navigate("Comments")}
                >
                    <MessageCircle width={24} height={24} />
                    <Text style={styles.postCommentCount}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.postCommentTextContainer}
                    // onPress={() => navigation.navigate("Map")}
                    onPress={()=>{handleMapPress()}}
                >
                    <MapPin width={24} height={24} />
                    <Text style={styles.postCommentText}>{item.post.area}</Text>
                </TouchableOpacity>
            </View>
        </View>

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.areaView}>
                <View style={styles.userContainer}>
                    <Image
                        source={require("../../assets/images/photo.jpg")}
                        style={styles.userPhoto}
                    />
                    <View>
                        <Text style={styles.userLoginTitle}>Anton Honcharov</Text>
                        <Text style={styles.userEmailTitle}>antonhoncharovv@gmail.com</Text>
                    </View>
                </View>

                {posts.length !== 0 ?
                        <FlatList
                            data={posts}
                            keyExtractor={(item, indx) => indx.toString()}
                            renderItem={renderItem}
                        /> :
                    <View style={styles.postContainer}>
                        <View style={styles.postPhotoContainer}>
                            <Image
                                source={require("../../assets/images/photoBG.jpg")}
                                // source={{uri:photo}}    
                                style={styles.postPhoto}
                            />
                        </View>
                        <Text style={styles.postPhotoTitle}>Горы</Text>
                        <View style={styles.postCommentsContainer}>
                            <TouchableOpacity
                                style={styles.postCommentTextContainer}
                                onPress={() => navigation.navigate("Comments")}
                            >
                                <MessageCircle width={24} height={24} />
                                <Text style={styles.postCommentCount}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.postCommentTextContainer}
                                // onPress={() => navigation.navigate("Map", {posts})}
                                onPress={()=>{console.log("Retro")}}
                            >
                                <MapPin width={24} height={24} />
                                <Text style={styles.postCommentText}>Кардильеры</Text>
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
        // flex: 1,
        justifyContent: "flex-start",
        marginTop: 16,
        marginBottom: 16,
    },
    // postPhotoContainer: {
    //     flex: 1,
    // },
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
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        marginLeft: 6,
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
    }
})