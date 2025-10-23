import { Button } from '@/components/Button';
import { CartContext } from '@/contexts/CartContext';
import { getProductById } from '@/db/product.service';
import { Product } from '@/models/types';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductDetail() {
  const {id} = useLocalSearchParams();

  const [product, setProduct] = useState<Product | null>(null);

  const { onAddToCart } = useContext(CartContext);

  useEffect(() => {
    if (id) {
      getProductById(id).then((prod) => {
        setProduct(prod);
      });
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Detail - ID: {product?.product_id}</Text>
      <Text style={styles.text}>Name: {product?.name}</Text>
      <Text style={styles.price}>Price: {product?.price}</Text>
      <Text style={styles.stock}>Stock: {product?.stock} units</Text>
      <Button title="Add to Cart" onPress={() => onAddToCart(product)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
  stock: {
    fontSize: 16,
    color: 'red',
  },
});
