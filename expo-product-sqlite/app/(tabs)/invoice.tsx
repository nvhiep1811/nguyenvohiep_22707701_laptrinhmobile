import { CartContext } from '@/contexts/CartContext';
import { getInvoices } from '@/db/invoice.service';
import { OrderWithItems } from '@/models/types';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';

export default function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { formatter } = useContext(CartContext);

  useEffect(() => { 
    const fetchInvoices = async () => {
      try {
        const invoices = await getInvoices();
        setOrders(invoices);
      } catch (error) {
        Alert.alert('Error', 'Failed to load invoices.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const renderOrder = ({ item }: { item: OrderWithItems }) => (
    <View style={styles.card}>
      <Text style={styles.header}>
        Invoice #{item.order_id} — {new Date(item.order_date).toLocaleString()}
      </Text>

      {item.items.map(p => (
        <View key={p.product_id} style={styles.row}>
          <Text style={styles.name}>{p.product_name} x{p.qty}</Text>
          <Text style={styles.price}>{formatter.format(p.price * p.qty)}</Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.total}>{formatter.format(item.total_amount)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Invoice List</Text>

      {loading ? (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : orders.length === 0 ? (
        <Text style={{textAlign:'center'}}>No invoices found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={o => o.order_id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ padding:16, paddingBottom:100 }} // chừa chỗ cho icon
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page:{ flex:1, backgroundColor:'#fff' },
  title:{ fontSize:24,fontWeight:'bold', textAlign:'center', marginVertical:20 },
  card:{ backgroundColor:'#f7f7f7',padding:16,borderRadius:12,marginBottom:16 },
  header:{ fontSize:16,fontWeight:'600',marginBottom:8 },
  row:{ flexDirection:'row',justifyContent:'space-between',marginBottom:6 },
  name:{ fontSize:15,flex:1 },
  price:{ fontSize:15,fontWeight:'600' },
  totalRow:{ flexDirection:'row',justifyContent:'space-between',marginTop:10,paddingTop:10,borderTopWidth:1,borderColor:'#ddd' },
  totalLabel:{ fontWeight:'700',fontSize:16 },
  total:{ fontWeight:'700',fontSize:16,color:'#007bff' },
  fab:{
    position:'absolute', bottom:20, right:20,
    width:56,height:56,borderRadius:28,
    alignItems:'center',justifyContent:'center',
    backgroundColor:'#eee', elevation:6
  }
});