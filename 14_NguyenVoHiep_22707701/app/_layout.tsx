import { seedCategory } from "@/db/category.repo";
import { initDB } from "@/db/db";
import { seedProduct } from "@/db/product.repo";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    async function prepare() {
      try {
        await initDB();
        await seedCategory();
        await seedProduct();
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  if (!ready) {
    return <ActivityIndicator size={30} color={'skyblue'} />;
  }

  return <Stack>
    <Stack.Screen 
        name="index" 
        options={{ headerTitle: "Category Manager" }} 
      />    

      <Stack.Screen 
        name="category/[id]" 
        options={{ headerTitle: "Product Manager" }} 
      />

      <Stack.Screen 
        name="product/[id]" 
        options={{ headerTitle: "Product Details" }} 
      />    

      <Stack.Screen 
        name="product/add" 
        options={{ headerTitle: "Add Product" }} 
      />
      <Stack.Screen 
        name="product/edit/[id]" 
        options={{ headerTitle: "Edit Product" }} 
      />
  </Stack>
}
