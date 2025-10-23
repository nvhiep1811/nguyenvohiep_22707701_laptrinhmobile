import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/db/product.service';
import { Product } from '@/models/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProductList() {
  const [list, setList] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getProducts().then(data => setList(data));
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getProducts().then(data => {
      setList(data);
      setRefreshing(false);
    });
  }

  const onCartPress = () => {
    console.log('Cart pressed');
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCartPress} style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={list}
        renderItem={({item}) => <ProductCard product={item}/>} 
        keyExtractor={(item) => item.product_id.toString()}
        ListEmptyComponent={<View style={{height: 10}}></View>}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: 60,
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartIcon: {
    padding: 5,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
});