import { Button } from '@/components/Button';
import { addProduct, updateProduct } from '@/db/product.service';
import { Product } from '@/models/types';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProductForm() {
  const params = useLocalSearchParams();
  const { product } = params;


  const [formData, setFormData] = useState<Product>(product ? JSON.parse(product as string) : {
    product_id: 0,
    name: '',
    price: 0,
    stock: 0
  });

  // ref
  const nameRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const stockRef = useRef<TextInput>(null);

  const handleChange = (name: keyof Product) => (value: string) => {
    setFormData({
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value)
    });
  }

  const handleSave = () => {
    if (formData.name.trim() === '' || formData.name.length > 50) {
      nameRef.current?.focus();
      return;
    };

    if (isNaN(formData.price)) {
      priceRef.current?.focus();
      priceRef.current?.select();
      return;
    };

    if (isNaN(formData.stock)) {
      stockRef.current?.focus();
      stockRef.current?.select();
      return;
    };

    if (product) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 24}}>{product ? 'Edit Product' : 'Add Product'}</Text>
      <TextInput ref={nameRef} value={formData.name} onChangeText={handleChange('name')} style={styles.input} placeholder='Enter product name' placeholderTextColor={'gray'} />
      <TextInput ref={priceRef} value={formData.price.toString()} onChangeText={handleChange('price')} keyboardType='numeric' style={styles.input} placeholder='Enter price' placeholderTextColor={'gray'} />
      <TextInput ref={stockRef} value={formData.stock.toString()} onChangeText={handleChange('stock')} keyboardType='numeric' style={styles.input} placeholder='Enter stock' placeholderTextColor={'gray'} />
      <Button title={product ? 'Edit' : 'Add'} onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  input :{
    width: '70%',
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    borderStartStartRadius: 5,
    borderBottomWidth: 1
  }
})
