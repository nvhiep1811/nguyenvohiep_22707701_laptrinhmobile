import * as SQLite from 'expo-sqlite';

let _db: SQLite.SQLiteDatabase | null = null;

export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (_db) {
    return _db;
  }
  _db = SQLite.openDatabaseSync('product_new.db');
  return _db;
};

export const closeDBConnection = async (): Promise<void> => {
  if (_db) {
    _db.closeAsync();
    _db = null;
  }
};

export const initDB = async (): Promise<void> => {
  const db = await getDBConnection();
  await db.execAsync(`PRAGMA foreign_keys = ON;`);
  await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        remote_id TEXT,
        updated_at TEXT
      );
    `
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK (price > 0),
      unit TEXT NOT NULL,
      description TEXT,
      image_uri TEXT,
      category_id INTEGER NOT NULL,
      remote_id TEXT,
      updated_at TEXT,
      is_deleted INTEGER DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );`);
};

export async function clearDatabase(): Promise<void> {
  const db = await getDBConnection();
  await db.execAsync(`DROP TABLE IF EXISTS products;`);
  await db.execAsync(`DROP TABLE IF EXISTS categories;`);
}