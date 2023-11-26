import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text, useColorScheme } from 'react-native';
import { SessionProvider, useSession } from '../ctx';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(modals)/addExam" 
          options={{ 
            title: 'Add Exam',
            presentation: 'modal',
           }} 
        />
        <Stack.Screen 
          name="exam/[id]" 
          options={{ 
            title: 'Exam Details',
           }} 
        />
        <Stack.Screen 
          name="exam/attend" 
          options={{ 
            title: 'Attend Exam',
           }} 
        />
        <Stack.Screen 
          name="sign-up" 
          options={{ 
            title: '',
            headerShown: false,
           }} 
        />
        <Stack.Screen 
          name="sign-in" 
          options={{ 
            title: '',
            headerShown: false,
           }} 
        />
        <Stack.Screen 
          name="select-account" 
          options={{ 
            title: 'Back',
           }} 
        />
        <Stack.Screen 
          name="complete-profile" 
          options={{ 
            title: '',
            headerShown: false,
           }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
