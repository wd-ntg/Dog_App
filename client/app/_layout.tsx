import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import 'react-native-reanimated';
import "../global.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, 
});

import { useColorScheme } from '@/common/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function (){
    const [stateLoaded, setStateLoaded] = useState(false);
    const [fontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
      });

      const onLayout = useCallback(() => {
		SplashScreen.hideAsync();
	}, []);

    const onBeforeLimit = useCallback(() => setStateLoaded(true), []);


    return (
		<Provider store={store}>
			<PersistGate persistor={persistor} onBeforeLift={onBeforeLimit}>
				{/* Render the SafeAreaView and AppNavigator when fonts and state are loaded */}
				{fontsLoaded && stateLoaded && (
					<GestureHandlerRootView
						onLayout={onLayout}
						>
						<RootLayout />
					</GestureHandlerRootView>
				)}
			</PersistGate>
		</Provider>
	);

}

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(detail)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}