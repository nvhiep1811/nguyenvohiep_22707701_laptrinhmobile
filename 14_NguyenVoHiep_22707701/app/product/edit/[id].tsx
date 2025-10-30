import { getProductById, updateProduct } from "@/db/product.repo";
import { Product } from "@/model/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";

export default function EditProduct() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [catId, setCatId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const prod = await getProductById(Number(id));
        if (prod) {
          setName(prod.name);
          setPrice(prod.price.toString());
          setUnit(prod.unit);
          setDescription(prod.description || "");
          setImageUri(prod.image_uri || "");
          setCatId(prod.category_id); // giữ category cũ
        }
        setLoading(false);
      })();
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !price || !unit) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
  
    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      Alert.alert("Error", "Price must be a number greater than 0");
      return;
    }
  
    const product: Product = {
      id: Number(id),
      name,
      price: priceNumber,
      unit,
      description,
      image_uri: imageUri,
      category_id: catId,
      remote_id: undefined,  // hoặc lưu giá trị cũ
      updated_at: new Date().toISOString(),
      is_deleted: false,
    };
  
    try {
      setLoading(true);
      const changes = await updateProduct(product);
      if (changes === 0) {
        Alert.alert("Error", "No product was updated");
      } else {
        Alert.alert("Success", "Product updated");
        router.back();
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update product");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Edit Product</Text>

      <Text>Name *</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Product Name" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Price *</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Unit *</Text>
      <TextInput value={unit} onChangeText={setUnit} placeholder="Unit" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }} />

      <Text>Image URI</Text>
      <TextInput value={imageUri} onChangeText={setImageUri} placeholder="https://..." style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }} />

      <Button title="Update Product" onPress={handleUpdate} disabled={loading} />
    </ScrollView>
  );
}