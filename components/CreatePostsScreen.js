import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CreatePostsScreen() { 
    return (
        <View style={styles.container}>
            <Text>CreatePostsScreen</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: "center",
    },
})