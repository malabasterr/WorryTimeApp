// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter(); // Use the router for navigation
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      // Redirect to /home on app load
      router.push('/home');
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    // headerShown: false globally hides the navigation bar
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)/start-worry-time" />
      <Stack.Screen name="zNotFound" />
    </Stack>
  ); 
}

