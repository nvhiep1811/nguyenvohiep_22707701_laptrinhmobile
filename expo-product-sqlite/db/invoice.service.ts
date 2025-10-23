import { OrderItem, OrderWithItems } from "@/models/types";
import { db } from "./db";
import { updateProductStock } from "./product.service";

export async function getInvoices() {
  const orders: OrderWithItems[] = [];

  const orderRows = await db?.getAllAsync<OrderWithItems>(
    `SELECT order_id, order_date, total_amount FROM orders ORDER BY order_date DESC`
  );

  if (orderRows) {
    for (const order of orderRows) {
      const items = await db?.getAllAsync<OrderItem>(
        `SELECT product_id, qty, price FROM order_items WHERE order_id = ?`,
        [order.order_id]
      );
      orders.push({ ...order, items: items || [] });
    }
  }

  return orders;
}

export async function getInvoiceById(orderId: number) {
  const order = await db?.getFirstAsync<OrderWithItems>(
    `SELECT order_id, order_date, total_amount FROM orders WHERE order_id = ?`,
    [orderId]
  );

  if (order) {
    const items = await db?.getAllAsync<OrderItem>(
      `SELECT product_id, qty, price FROM order_items WHERE order_id = ?`,
      [orderId]
    );
    return { ...order, items: items || [] };
  }

  return null;
}

export async function saveInvoice(order: OrderWithItems) {
  const { items, ...orderData } = order;

  const orderId = await db
    ?.runAsync(`INSERT INTO orders (order_date, total_amount) VALUES (?, ?)`, [
      orderData.order_date,
      orderData.total_amount,
    ])
    .then((result) => result.lastInsertRowId as number);

  if (orderId) {
    for (const item of items) {
      await db?.runAsync(
        `INSERT INTO order_items (order_id, product_id, product_name, qty, price) VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.product_name, item.qty, item.price]
      );
      await updateProductStock(item.product_id, item.qty);
    }
  }

  return orderId;
}
