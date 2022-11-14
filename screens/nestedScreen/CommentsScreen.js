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
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.safeAreaContainer}
        >
            <TouchableWithoutFeedback onPress={() => keyboardHide()}>
                <View style={styles.container}>
                    <TextInput
                        style={{...styles.input, paddingLeft: 28}}
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
                        <Text style={styles.buttonText}>Опубликовать</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>    
        </KeyboardAvoidingView>    
            
        )
    
        // <TouchableWithoutFeedback onPress={() => keyboardHide()}>   
        {/*         */}
   
            {/* <SafeAreaView  style={styles.safeAreaContainer}>
                <FlatList
                    data={allComments}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.text}>{item.comment}</Text>
                            <Text style={styles.nickname}>{item.nickname}</Text>
                        </View>
                    )}
                    keyExtractor={(item)=> item.id}
                />
            </SafeAreaView> */}
             

         
        {/* </KeyboardAvoidingView>        */}
    // </TouchableWithoutFeedback>           
    
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: "100%",
        // backgroundColor: '#fff',
        // justifyContent: "flex-end",
        // alignItems: "center",
        // paddingTop: 30,
        // paddingBottom: 50,
        backgroundColor: "tomato",
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    safeAreaContainer: {
        flex: 1,
    },
    input: {
        
    },
    addButton: {
   

    },
    buttonText: {
    
    },
    text: {
        
    },
    nickname: {
        
    },
})