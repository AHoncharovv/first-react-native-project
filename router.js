import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';
import Home from './screens/mainScreen/Home';

import Grid from './assets/icons/grid.svg';
import New from './assets/icons/new.svg'; 
import User from './assets/icons/user.svg'; 
import LogOut from './assets/icons/logOut.svg'; 
import ArrowLeft from './assets/icons/arrowLeft.svg';

const AuthStack = createNativeStackNavigator()
const MainTab = createBottomTabNavigator()


// import { useDispatch } from 'react-redux';

// import { authSignOutUser } from "./redux/auth/authOperations";

//   const dispatch = useDispatch()

//   const signOut = () => {
//     console.log("signOut");
//     dispatch(authSignOutUser())
//     console.log("signOut");
//   }

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen} /> 
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen} /> 
      </AuthStack.Navigator>
    )
  }
  return ( 
    <MainTab.Navigator screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#BDBDBD",
    }}>
        <MainTab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Публикации",
            headerStyle: {
              height: 88,
            },
            headerRightContainerStyle: {
              paddingRight: 10,
            },
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontSize: 17,
            },
            headerRight: () => (
              <LogOut
                onPress={() => alert("This is a button!")}
              />
            ),
            tabBarIcon: ({ focused, color, size }) => <Grid size={size} stroke={color} />
          }}
        />
        <MainTab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{
            title: "Создать публикацию",
            headerStyle: {
              height: 88,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              fontSize: 15.9,
            },
            headerLeft: () => (
              <ArrowLeft
                onPress={() => {}}
              />
            ),
            tabBarIcon: ({ focused, color, size }) => <New size={size} fill={color} />
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => <User size={size} stroke={color} />
          }}
      />      
    </MainTab.Navigator>
  )
}
