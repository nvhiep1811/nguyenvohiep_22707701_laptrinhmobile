import ProductCard from '@/components/ProductCard';
import { CartContext } from '@/contexts/CartContext';
import { getProducts } from '@/db/product.service';
import { Product } from '@/models/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductList() {
  const [list, setList] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setList(data);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts().then(() => setRefreshing(false));
  }

  const { onAddToCart, countCart } = useContext(CartContext);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Products</Text>
      </View>
      <TouchableOpacity onPress={() => router.navigate('/cart')} style={styles.cartIcon}>
        <Ionicons name="cart-outline" size={35} color="#333" />
        {countCart !== 0 ? <Text style={styles.cartCount}>{countCart}</Text>: <></>}
      </TouchableOpacity>

      {loading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    ) : (<FlatList
        contentContainerStyle={styles.container}
        data={list}
        renderItem={({item}) => <ProductCard product={item} onAddToCart={onAddToCart} />} 
        keyExtractor={(item) => item.product_id.toString()}
        ListEmptyComponent={<View style={{height: 10}}></View>}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />)}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomColor: '#ddd',
  },
  cartIcon: {
    backgroundColor: '#b1d5e9ff',
    borderRadius: 30,
    padding: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 10,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  cartCount: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 30,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    position: 'absolute',
    top: 10,
    right: 5,
  }
});