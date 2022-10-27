import { NavigationContainer } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
  })
}

const AuthStack = createNativeStackNavigator()

export default function App() {

  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}