import { Product } from "@/models/types";
import { db } from "./db";

export async function addProduct(product: Product) {
  await db!.runAsync(
    "INSERT INTO products (product_id, name,price,stock) VALUES (?,?,?,?)",
    [product.product_id, product.name, product.price, product.stock]
  );
}

export async function seedData() {
  const result = await db?.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM products;"
  );

  if (result?.count === 0) {
    const sampleProducts: Product[] = [
      { product_id: "p1", name: "IPhone 13", price: 24975000, stock: 50 },
      {
        product_id: "p2",
        name: "Samsung Galaxy S21",
        price: 22475000,
        stock: 30,
      },
      { product_id: "p3", name: "Google Pixel 6", price: 19975000, stock: 20 },
      { product_id: "p4", name: "OnePlus 9", price: 18225000, stock: 15 },
      {
        product_id: "p5",
        name: "Sony Xperia 5 III",
        price: 23725000,
        stock: 10,
      },
      { product_id: "p6", name: "Xiaomi Mi 11", price: 17475000, stock: 25 },
      { product_id: "p7", name: "Oppo Find X3", price: 19975000, stock: 18 },
      {
        product_id: "p8",
        name: "Motorola Edge 20",
        price: 14975000,
        stock: 22,
      },
      { product_id: "p9", name: "Nokia 8.3", price: 12475000, stock: 12 },
      {
        product_id: "p10",
        name: "Asus ROG Phone 5",
        price: 24975000,
        stock: 8,
      },
    ];
    for (const product of sampleProducts) {
      await addProduct(product);
    }
  }
}

export async function getProducts() {
  const res = await db!.getAllAsync<Product>("SELECT * FROM products");
  return res;
}

export async function getProductById(id: string) {
  const res = await db!.getFirstAsync<Product>(
    "SELECT * FROM products WHERE product_id=?",
    [id]
  );
  return res;
}

export async function updateProduct(product: Product) {
  await db!.runAsync(
    "UPDATE products SET name=?, price=?, stock=? WHERE product_id=?",
    [product.name, product.price, product.stock, product.product_id]
  );
}

export async function updateProductStock(id: string, stock: number) {
  await db!.runAsync("UPDATE products SET stock=stock-? WHERE product_id=?", [
    stock,
    id,
  ]);
}

export async function deleteProduct(id: string) {
  await db!.runAsync("DELETE FROM products WHERE product_id=?", [id]);
}
