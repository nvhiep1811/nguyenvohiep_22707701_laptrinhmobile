import { CartContext } from '@/contexts/CartContext';
import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: {
    id: number;
    product_id: string;
    name: string;
    price: number;
    qty: number;
  };
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
}

export default function CartItemCard({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { formatter } = useContext(CartContext);
  
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatter.format(item.price)}</Text>

        <View style={styles.quantityContainer}>
          <Pressable onPress={onDecrease} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.qty}</Text>

          <Pressable onPress={onIncrease} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={onRemove} style={styles.removeBtn}>
        <Text style={styles.removeText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  removeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeText: {
    color: '#ff4444',
    fontWeight: '600',
  },
});