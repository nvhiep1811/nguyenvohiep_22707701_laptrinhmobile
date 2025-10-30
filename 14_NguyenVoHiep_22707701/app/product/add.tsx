import { addProduct } from "@/db/product.repo";
import { Product } from "@/model/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";

export default function AddProduct() {
  const { category_id } = useLocalSearchParams<{ category_id?: string }>();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [loading, setLoading] = useState(false);

  const catId = category_id ? Number(category_id) : 0;

  const handleAdd = async () => {
    if (!name || !price || !unit || !catId) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const product: Product = {
      id: 0,
      name,
      price: Number(price),
      unit,
      description,
      image_uri: imageUri,
      category_id: catId,
      updated_at: new Date().toISOString(),
      is_deleted: false,
    };

    try {
      setLoading(true);
      await addProduct(product);
      Alert.alert("Success", "Product added");
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Add Product</Text>

      <Text>Name *</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Product Name" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Price *</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Unit *</Text>
      <TextInput value={unit} onChangeText={setUnit} placeholder="Unit" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Image URI</Text>
      <TextInput value={imageUri} onChangeText={setImageUri} placeholder="https://..." style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      {/* Nếu không có category_id từ param, mới hiển thị ô nhập */}
      {!category_id && (
        <>
          <Text>Category ID *</Text>
          <TextInput
            value={catId.toString()}
            onChangeText={(v) => Number(v)}
            placeholder="Category ID"
            keyboardType="numeric"
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }}
          />
        </>
      )}

      <Button title="Add Product" onPress={handleAdd} disabled={loading} />
    </ScrollView>
  );
}