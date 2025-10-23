import { Button } from '@/components/Button';
import { deleteProduct, getProductById } from '@/db/product.service';
import { Product } from '@/models/types';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProductDetail() {
  const {id} = useLocalSearchParams();

  const [product, setProduct] = useState<Product | null>(null);

  //getProductById
  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then((prod) => {
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
      <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
        <Button title="Edit" onPress={() => {
          router.push({
            pathname: "/form",
            params: { product: JSON.stringify(product) }
          });
        }} />
        <Button title="Delete" onPress={() => {
          deleteProduct(Number(id));
          router.back();
        }} />
      </View>
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
