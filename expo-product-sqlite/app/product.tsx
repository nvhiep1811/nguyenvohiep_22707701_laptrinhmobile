import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/db/product.service';
import { Product } from '@/type/product';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      <FlatList
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})