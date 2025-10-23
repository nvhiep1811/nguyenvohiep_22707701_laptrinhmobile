import CartItemCard from '@/components/CartItemCard';
import { CartContext } from '@/contexts/CartContext';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Cart() {
  const { cartItems, onIncrease, onDecrease, onRemove, formatter, handleCheckout } = useContext(CartContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  return (
    <View style={styles.container}>      
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.product_id}
            renderItem={({ item }) => <CartItemCard item={item} 
                                      onIncrease={() => onIncrease(item.id, item.qty)}
                                      onDecrease={() => onDecrease(item.id, item.qty)}
                                      onRemove={() => onRemove(item.id)} />}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: {formatter.format(totalPrice)}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
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