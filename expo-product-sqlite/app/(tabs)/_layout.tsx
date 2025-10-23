import { Tabs } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    tabBarActiveTintColor: '#4c4941ff',
    headerShadowVisible: false,
    headerTintColor: '#333',
    tabBarStyle: {
      backgroundColor: '#e6ebf1ff',
    },
  }}>
      <Tabs.Screen name="index" options={{ title: 'Home',
        tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
        )
       }} />
      <Tabs.Screen name="invoice" options={{ title: 'Invoice',
        tabBarIcon: ({ color, focused}) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={24} color={color} />
        )
       }} />
    </Tabs>
  );
}