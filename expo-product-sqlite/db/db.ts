import * as SQLite from "expo-sqlite";

export let db: SQLite.SQLiteDatabase | null = null;

export async function initDb(reset = false) {
  db = await SQLite.openDatabaseAsync("product.db");

  await db.execAsync("PRAGMA foreign_keys = ON;");

  if (reset) {
    await dropDb();
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products(
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price>=0),  
      stock INTEGER NOT NULL CHECK(stock>=0)  
    );
    CREATE TABLE IF NOT EXISTS cart_items(
      id INTEGER PRIMARY KEY AUTOINCREMENT,    
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty>0),    
      UNIQUE(product_id),    
      FOREIGN KEY(product_id) REFERENCES products(product_id)    
    );
    CREATE TABLE IF NOT EXISTS orders (
      order_id     INTEGER PRIMARY KEY AUTOINCREMENT,
      order_date   TEXT NOT NULL,
      total_amount REAL NOT NULL CHECK(total_amount >= 0)
    );    
    CREATE TABLE IF NOT EXISTS order_items (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id     INTEGER NOT NULL,
      product_id   TEXT NOT NULL,
      product_name TEXT NOT NULL,
      qty          INTEGER NOT NULL CHECK(qty > 0),
      price        REAL NOT NULL CHECK(price >= 0),
      FOREIGN KEY(order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );    
  `);
}

export async function dropDb() {
  if (!db) return;

  await db.execAsync(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS products;
  `);
}
