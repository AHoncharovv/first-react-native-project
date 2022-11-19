import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

import firebaseApp from '../../firebase/config';
import Send from '../../assets/icons/send.svg';

export default function CommentsScreen({ route }) { 

    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const { postId } = route.params
    const { nickname } = useSelector(state => state.auth)
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState(null)

    const keyboardHide = () => {
        setKeyboardVisible(true)
        Keyboard.dismiss()
    }    

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
        const db = getFirestore(firebaseApp)
        const postsRef = collection(db, "posts");
        onSnapshot(collection(postsRef, postId, "comments"), (snapshot) => {
            setAllComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }, [])

    const createComment = async () => {
        const db = await getFirestore(firebaseApp)
        const postsRef = collection(db, "posts");
        await addDoc(collection(postsRef, postId, "comments"), {
                comment,
                nickname,
            }
        ) 
        setComment("")
        keyboardHide()
    }
 
    return (
        
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.KeyboardAvoidingView}
        >
            <View style={styles.container}>
                <SafeAreaView style={styles.safeAreaContainer} >    
                    <View style={{ marginBottom: 16 }}>
                        <FlatList
                            data={allComments}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{item.comment}</Text>
                                    </View>
                                    <View style={styles.nicknameContainer}>
                                        <Text style={styles.nickname}>{item.nickname}</Text>
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item)=> item.id}
                        />
                    </View>
                </SafeAreaView>  
                <TouchableWithoutFeedback onPress={() => keyboardHide()}>
                    <View style={{...styles.inputContainer, marginBottom: keyboardVisible? 56 :0}}>   
                        <TextInput
                            style={styles.input}
                            textAlign={"left"}
                            placeholder={"Оставьте комментарий"}
                            value={comment}
                            onChangeText={(value)=> setComment(value)}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            activeOpacity={0.8}
                            onPress={() => createComment()}
                        >
                            <Send />
                        </TouchableOpacity>      
                    </View> 
                </TouchableWithoutFeedback>       
            </View>       
        </KeyboardAvoidingView>       
    )   
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,    
    },
    KeyboardAvoidingView: {
       flex: 1, 
    },
    safeAreaContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: "#E8E8E8",
        height: 50,
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
        height: 50,
        color: "#212121",
        padding: 16,   
    },
    addButton: {
        ...Platform.select({
        ios: {
        backgroundColor: "#FF6C00", 
        },
        android: {
            backgroundColor: "#ff4500",
        }
        }),
        position: "absolute",
        top: 8,
        right: 8,
        borderRadius: 100,
        height: 34,
        width: 34,
    },
    textContainer: {
        flex: 1,
        height: 50,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        padding: 8,
    },
    postPhoto: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        resizeMode: "stretch",
    },
    commentContainer: {
        paddingTop: 16,
    },
    nickname: {
        marginTop: 4,
        marginLeft: "auto",
        marginBottom: 4,
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,       
    }
})