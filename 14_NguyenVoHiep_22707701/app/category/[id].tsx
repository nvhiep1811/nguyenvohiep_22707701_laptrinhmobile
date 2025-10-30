import { getProductsByCategory } from "@/db/product.repo";
import { Product } from "@/model/type";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ProductList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");

  const loadProduct = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getProductsByCategory(Number(id));
      setProducts(res);
      setFiltered(res);
    } catch (error) {
      alert("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProduct();
    }, [id])
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim() === "") {
        setFiltered(products);
      } else {
        const lower = searchText.toLowerCase();
        setFiltered(
          products.filter((p) => p.name.toLowerCase().includes(lower))
        );
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [searchText, products]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={40} color={"skyblue"} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => (
    <View
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      }}
    >
      <Pressable
        onPress={() => router.push(`/product/${item.id}`)}
        style={{ marginBottom: 8 }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ color: "#555" }}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={{ color: "#555" }}>Unit: {item.unit}</Text>
        {item.image_uri ? (
          <Image
            source={{ uri: item.image_uri }}
            style={{ width: 100, height: 100, marginTop: 5 }}
            resizeMode="contain"
          />
        ) : null}
      </Pressable>

      {/* Nút Edit */}
      <Button
        title="Edit"
        onPress={() => router.push(`/product/edit/${item.id}`)}
        color="#ffa500"
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Products in Category {id}
        </Text>
        <Button
          title="+ Add Product"
          onPress={() => router.push({
            pathname: '/product/add',
            params: { category_id: id },
          })}
          color="#4CAF50"
        />
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search product by name..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 8,
          marginBottom: 15,
        }}
      />

      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No products found.
          </Text>
        )}
      />
    </View>
  );
}