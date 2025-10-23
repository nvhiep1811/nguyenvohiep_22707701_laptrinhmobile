import { CartItem, Product } from "@/models/types";
import { db } from "./db";
import { getProductById } from "./product.service";

export async function addItem(product: Product, qty: number = 1) {
  if (!product) throw new Error("Product does not exist.");

  const existing = await db?.getFirstAsync<CartItem>(
    "SELECT * FROM cart_items WHERE product_id = ?;",
    [product.product_id]
  );

  if (existing && existing.qty >= product.stock) {
    throw new Error("Insufficient stock.");
  }

  if (existing) {
    const newQty = Math.min(existing.qty + qty, product.stock);
    await db?.runAsync("UPDATE cart_items SET qty = ? WHERE id = ?;", [
      newQty,
      existing.id,
    ]);
  } else {
    await db?.runAsync(
      "INSERT INTO cart_items (product_id, qty) VALUES (?, ?);",
      [product.product_id, qty]
    );
  }
}

export async function getCart() {
  const rows = await db?.getAllAsync<{
    id: number;
    product_id: string;
    name: string;
    price: number;
    qty: number;
  }>(`
    SELECT 
      c.id,
      c.product_id,
      p.name,
      p.price,
      c.qty
    FROM cart_items c
    JOIN products p ON p.product_id = c.product_id;
  `);
  return rows;
}

export async function getCartCount() {
  const result = await db?.getFirstAsync<{ total: number }>(
    "SELECT SUM(qty) as total FROM cart_items;"
  );
  return result?.total || 0;
}

export async function updateQty(id: number, qty: number) {
  if (qty <= 0) {
    await deleteItem(id);
    return;
  }

  const item = await db?.getFirstAsync<{ product_id: string }>(
    "SELECT product_id FROM cart_items WHERE id = ?;",
    [id]
  );

  if (!item) return;

  const product = await getProductById(item.product_id);
  if (!product) return;

  if (qty > product.stock) {
    throw new Error("Insufficient stock.");
  }

  await db?.runAsync("UPDATE cart_items SET qty = ? WHERE id = ?;", [qty, id]);
}

export async function deleteItem(id: number) {
  await db!.runAsync("DELETE FROM cart_items WHERE id = ?", [id]);
}

export async function clearCart() {
  await db?.runAsync("DELETE FROM cart_items");
}
