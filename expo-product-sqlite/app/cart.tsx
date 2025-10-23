import CartItemCard from '@/components/CartItemCard';
import { deleteItem, updateQty } from '@/db/cart.service';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Cart() {
  const [cartItems, setCartItems] = useState<{
    id: number;
    product_id: string;
    name: string;
    price: number;
    qty: number;
  }[]>([]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  const handleCheckout = () => {
    Alert.alert('Thanh toán', `Tổng tiền: ${totalPrice.toLocaleString()} VND`, [
      { text: 'OK' }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.product_id}
            renderItem={({ item }) => <CartItemCard item={item} 
                                      onIncrease={() => updateQty(item.id, item.qty + 1)}
                                      onDecrease={() => updateQty(item.id, item.qty - 1)}
                                      onRemove={() => deleteItem(item.id)} />}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} VND</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    color: '#999',
  },
  list: {
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  checkoutBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});