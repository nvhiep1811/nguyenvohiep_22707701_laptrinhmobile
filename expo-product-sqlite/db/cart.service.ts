import { CartItem } from "@/models/types";
import { db } from "./db";
import { getProductById } from "./product.service";

export async function addItem(cartItem: CartItem) {
  const product = await getProductById(cartItem.product_id);
  if (!product) throw new Error('Sản phẩm không tồn tại.');
  if (cartItem.qty > product.stock) throw new Error('Không đủ tồn kho.');

  const existing = await db?.getFirstAsync<CartItem>(
    'SELECT * FROM cart_items WHERE product_id = ?;',
    [cartItem.product_id]
  );

  if (existing) {
    const newQty = Math.min(existing.qty + cartItem.qty, product.stock);
    await db?.runAsync('UPDATE cart_items SET qty = ? WHERE id = ?;', [
      newQty,
      existing.id,
    ]);
  } else {
    await db?.runAsync(
      'INSERT INTO cart_items (product_id, qty) VALUES (?, ?);',
      [cartItem.product_id, cartItem.qty]
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

export async function updateQty(id: number, qty: number) {
  if (qty <= 0) {
    await deleteItem(id);
    return;
  }

  const item = await db?.getFirstAsync<{ product_id: string }>(
    'SELECT product_id FROM cart_items WHERE id = ?;',
    [id]
  );

  if (!item) return;

  const product = await getProductById(item.product_id);
  if (!product) return;

  if (qty > product.stock) {
    throw new Error('Số lượng vượt quá tồn kho.');
  }

  await db?.runAsync('UPDATE cart_items SET qty = ? WHERE id = ?;', [qty, id]);
}

export async function deleteItem(id: number) {
  await db!.runAsync("DELETE FROM cart_items WHERE id = ?", [id]);
}

export async function clearCart() {
  await db?.runAsync('DELETE FROM cart_items');
}