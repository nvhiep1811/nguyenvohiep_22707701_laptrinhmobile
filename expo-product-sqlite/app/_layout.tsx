import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { dropDb, initDb } from '@/db/db';
import { seedData } from '@/db/product.service';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    dropDb();
    initDb().then(async()=>{
      await seedData();    
      setReady(true);
    });
  },[]);

  if(!ready) return <ActivityIndicator style={{flex:1}}/>

  return (
    <>
      <Stack screenOptions={{headerStyle: {backgroundColor: '#6200ee'},headerTintColor: '#fff'}}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="product" options={{ title: 'Product List' }} />
        <Stack.Screen name="detail/[id]" options={{ title: 'Product Details' }} />
        <Stack.Screen name="form" options={{ title: 'Form' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
