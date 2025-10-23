import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { CartProvider } from '@/contexts/CartContext';
import { initDb } from '@/db/db';
import { seedData } from '@/db/product.service';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    initDb().then(async()=>{
      await seedData();    
      setReady(true);
    });
  },[]);

  if(!ready) return <ActivityIndicator size={'large'} style={{flex:1}}/>

  return (
    <CartProvider>
      <Stack screenOptions={{headerStyle: {backgroundColor: '#7a787cff'},headerTintColor: '#fff'}}>
        <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Product Details' }} />
        <Stack.Screen name="form" options={{ title: 'Form' }} />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}
