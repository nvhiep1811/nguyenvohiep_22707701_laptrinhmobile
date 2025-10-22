import { Button } from '@/components/Button'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Button title='Go to Product List' onPress={() => {router.push('/product')}} />
      <Button title='Add Product' onPress={() => {router.push('/form')}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
})