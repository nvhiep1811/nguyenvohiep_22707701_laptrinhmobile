import { OrderWithItems } from '@/models/types';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const demoData: OrderWithItems[] = [
      {
        order_id: 1,
        order_date: '2025-10-21',
        total_amount: 450000,
        items: [
          { order_id: 1, product_id: '101', qty: 2, price: 100000, product_name: 'Sản phẩm A' },
          { order_id: 1, product_id: '102', qty: 1, price: 250000, product_name: 'Sản phẩm B' },
        ]
      },
      {
        order_id: 2,
        order_date: '2025-10-22',
        total_amount: 300000,
        items: [
          { order_id: 2, product_id: '103', qty: 3, price: 100000, product_name: 'Sản phẩm C' },
        ]
      }
    ];

    setOrders(demoData);
  };

  const renderOrder = ({ item }: { item: OrderWithItems }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderHeader}>Đơn hàng #{item.order_id} - {item.order_date}</Text>

      {item.items.map(product => (
        <View key={product.product_id} style={styles.productRow}>
          <Text style={styles.productName}>{product.product_name} x{product.qty}</Text>
          <Text style={styles.productPrice}>{(product.price * product.qty).toLocaleString()} VND</Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Tổng tiền:</Text>
        <Text style={styles.totalAmount}>{item.total_amount.toLocaleString()} VND</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Danh sách đơn hàng</Text>

      {orders.length === 0 ? (
        <Text>Chưa có đơn hàng nào.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.order_id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  orderHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 12,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007bff',
  },
});