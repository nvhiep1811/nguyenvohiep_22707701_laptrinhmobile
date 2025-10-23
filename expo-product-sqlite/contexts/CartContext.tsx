import { addItem, clearCart, deleteItem, getCart, getCartCount, updateQty } from "@/db/cart.service";
import { saveInvoice } from "@/db/invoice.service";
import { OrderWithItems, Product } from "@/models/types";
import { router } from "expo-router";
import { createContext, useState } from "react";
import { Alert } from "react-native";

export const CartContext = createContext(null);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [cartItems, setCartItems] = useState<{
      id: number;
      product_id: string;
      name: string;
      price: number;
      qty: number;
  }[]>([]);
  const [countCart, setCountCart] = useState(0);

  const onAddToCart = async (product: Product) => {
      try {
          await addItem(product);
          const updatedCart = await getCart();
          setCartItems(updatedCart);
          setCountCart(await getCartCount());
      } catch (error) {
          Alert.alert('Error', (error as Error).message);
      }
  }

  const onIncrease = async (id: number, qty: number) => {
    try {
      await updateQty(id, qty + 1);
      const updatedCart = await getCart();
      setCartItems(updatedCart);
        setCountCart(await getCartCount());
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  const onDecrease = async (id: number, qty: number) => {
    try {
      await updateQty(id, qty - 1);
      const updatedCart = await getCart();
      setCartItems(updatedCart);
        setCountCart(await getCartCount());
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  const onRemove = async (id: number) => {
    try {
      await deleteItem(id);
      const updatedCart = await getCart();
      setCartItems(updatedCart);
      setCountCart(await getCartCount());
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  const handleCheckout = async () => {
    try {
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * (item.qty || 1),
        0
      );

      const order: OrderWithItems = {
        order_id: 0,
        order_date: new Date().toISOString(),
        total_amount: totalPrice,
        items: cartItems.map(item => ({
          order_id: 0,
          product_id: item.product_id,
          product_name: item.name,
          qty: item.qty || 1,
          price: item.price,
        }))
      };

      await saveInvoice(order);

      clearCart();
      setCartItems([]);
      setCountCart(0);

      Alert.alert(
        "Success",
        "Checkout completed successfully!",
        [
          {
            text: "OK",
            onPress: () => router.navigate("/(tabs)/invoice")
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };


  return (
      <CartContext.Provider value={{ formatter, cartItems, countCart, onAddToCart, onIncrease, onDecrease, onRemove, handleCheckout }}>
          {children}
      </CartContext.Provider>
  )
} 