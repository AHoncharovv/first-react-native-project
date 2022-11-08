import { useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MapScreen({ route }) { 
        
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(() => {
        if(!route.params){return}
        setLatitude(route.params.latitude)
        setLongitude(route.params.longitude)
    }, [route.params])

    if (latitude === null || longitude === null) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>Загружаем...</Text>
        </View>
        )
    }
     
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    pinColor="#FF6C00"
                    title="Yo"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
})