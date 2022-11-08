import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CommentsScreen() { 
    return (
        <View style={styles.container}>
            <Text>CommentsScreen</Text>
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