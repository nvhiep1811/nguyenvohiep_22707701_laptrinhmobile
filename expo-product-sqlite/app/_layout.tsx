import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { initDb } from '@/db/db';
import { seedData } from '@/db/product.service';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    initDb(true).then(async()=>{
      await seedData();    
      setReady(true);
    });
  },[]);

  if(!ready) return <ActivityIndicator style={{flex:1}}/>

  return (
    <>
      <Stack screenOptions={{headerStyle: {backgroundColor: '#6200ee'},headerTintColor: '#fff'}}>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="cart" options={{ title: 'Cart' }} />
        <Stack.Screen name="invoice" options={{ title: 'Invoice' }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Product Details' }} />
        <Stack.Screen name="form" options={{ title: 'Form' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
