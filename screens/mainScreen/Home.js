import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PostsScreen from "../nestedScreen/PostsScreen";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreen  = createNativeStackNavigator()

export default function Home() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};


