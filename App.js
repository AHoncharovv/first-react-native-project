// import AppLoading from 'expo-app-loading';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import Main from './components/Main';

// import React, { useCallback, useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

// // const loadApplication = async () => {
// //   await Font.loadAsync({
// //     "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
// //     "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
// //     "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
// //   })
// // }

// SplashScreen.preventAutoHideAsync();

// export default function App() {

//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Pre-load fonts, make any API calls you need to do here
//         await Font.loadAsync({
//           "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
//           "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
//           "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
//         })
//         // await new Promise(resolve => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       // This tells the splash screen to hide immediately! If we call this after
//       // `setAppIsReady`, then we may see a blank screen while the app is
//       // loading its initial state and rendering its first pixels. So instead,
//       // we hide the splash screen once we know the root view has already
//       // performed layout.
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <Main />
//     </Provider>
//   );
// }

import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './components/Main';

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Medium": require('./assets/fonts/Roboto-Medium.ttf'),
    "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}