import { getProductById, softDeleteProduct } from "@/db/product.repo";
import { Product } from "@/model/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getProductById(Number(id));
      setProduct(data || null);
    } catch (err) {
      Alert.alert("Error", "Unable to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const deletedCount = await softDeleteProduct(Number(id));
            Alert.alert("Deleted", `Deleted: ${deletedCount}`);
            router.back(); // quay lại màn hình trước
          } catch (error) {
            Alert.alert("Error", "Failed to delete product");
          }
        },
      },
    ]);
  };  

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>Product not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ fontSize: 20, marginVertical: 10 }}>
        Price: ${product.price.toFixed(2)}
      </Text>

      <Button title="Delete Product" color="red" onPress={handleDelete} />
    </View>
  );
}