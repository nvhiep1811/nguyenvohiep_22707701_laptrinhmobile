import { deleteProduct } from '@/db/product.service';
import { Product } from '@/type/product';
import { router } from 'expo-router';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProductCard({product}: {product: Product}) {
  
  return (
    <Pressable style={styles.container} onPress={() => router.push(`/detail/${product.product_id}`)}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{product.name}</Text>
        <Text>$ {product.price}</Text>
        <Text>Quantity: {product.stock}</Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'space-between'}}>
          <Button title="View" onPress={() => router.push(`/detail/${product.product_id}`)} />
          <View style={{flexDirection: 'row', gap: 10}}>
            <Button title="Edit" onPress={() => {
              router.push({
                pathname: "/form",
                params: { product: JSON.stringify(product) }
              });
            }} />
            <Button title="Delete" onPress={() => deleteProduct(product.product_id)} />
          </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
  },
})
