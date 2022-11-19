import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          title: "Публикации",
          headerStyle: {
            height: 60,
          },
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },          
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerStyle: {
            height: 60,
          },
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerBackTitleVisible: false,
        }} 
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
          options={{
            title: "Карты",
            headerStyle: {
              height: 60,
            },
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontSize: 17,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerBackTitleVisible: false,
          }} 
      />
    </NestedScreen.Navigator>
  );
};


