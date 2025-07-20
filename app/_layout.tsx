import React from 'react';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

import {
  NavigationContainer,
  NavigationIndependentTree,
  useIsFocused,
} from '@react-navigation/native';

const theme = {
  colors: {
    primary: '#00C896',
    secondary: '#00A67E',
    accent: '#FF6B6B',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    onSurface: '#757575',
  },
};

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'fade',
        animationDuration: 300,
        animationTypeForReplace: 'push',

        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return (
    <Stack>
      <Slot />
    </Stack>
  );
}
