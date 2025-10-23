import { CartContext } from '@/contexts/CartContext';
import { Product } from '@/models/types';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({product, onAddToCart}: ProductCardProps) {
  
  const { formatter } = useContext(CartContext);
  
  return (
    <Pressable style={styles.container} onPress={() => router.push(`/detail/${product.product_id}`)}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{product.name}</Text>
        <Text>{formatter.format(product.price)}</Text>
        <Text>Quantity: {product.stock}</Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Button title="View Details" onPress={() => router.push(`/detail/${product.product_id}`)} />

            <Button title="Add to Cart" onPress={() => onAddToCart(product)} />
          </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
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
