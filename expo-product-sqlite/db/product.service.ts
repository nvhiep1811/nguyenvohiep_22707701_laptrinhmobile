import { Product } from "@/type/product";
import { db } from "./db";

export async function addProduct(product: Product) {
  await db!.runAsync("INSERT INTO products (name,price,stock) VALUES (?,?,?)", [
    product.name,
    product.price,
    product.stock,
  ]);
}

export async function seedData() {
  // Check if data already exists
  const existing = await db!.getFirstAsync<Product>(
    "SELECT * FROM products LIMIT 1"
  );
  if (existing) return;
  const sampleProducts: Product[] = [
    { product_id: 1, name: "IPhone 13", price: 999, stock: 50 },
    { product_id: 2, name: "Samsung Galaxy S21", price: 899, stock: 30 },
    { product_id: 3, name: "Google Pixel 6", price: 799, stock: 20 },
    { product_id: 4, name: "OnePlus 9", price: 729, stock: 15 },
    { product_id: 5, name: "Sony Xperia 5 III", price: 949, stock: 10 },
  ];
  for (const product of sampleProducts) {
    await addProduct(product);
  }
}

export async function getProducts() {
  const res = await db!.getAllAsync<Product>("SELECT * FROM products");
  return res;
}

export async function getProductById(id: number) {
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

export async function deleteProduct(id: number) {
  await db!.runAsync("DELETE FROM products WHERE product_id=?", [id]);
}
