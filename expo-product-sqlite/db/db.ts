import * as SQLite from "expo-sqlite";

export let db: SQLite.SQLiteDatabase | null = null;

export async function initDb() {
  db = await SQLite.openDatabaseAsync("demo.db");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products(
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
  `);
}

export async function dropDb() {
  if (db) {
    await db.execAsync(`DROP TABLE IF EXISTS products;`);
  }
}

export async function closeDb() {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
