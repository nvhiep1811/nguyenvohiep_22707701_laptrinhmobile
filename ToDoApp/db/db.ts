import * as SQLite from "expo-sqlite";

let _db: SQLite.SQLiteDatabase | null = null;

export const getDb = () => {
  _db = SQLite.openDatabaseSync("todos.db");

  return _db;
};

export const initDb = () => {
  const db = getDb();

  db.execAsync(`
        CREATE TABLE IF NOT EXISTS todos(
            id NUMBER PRIMARY KEY NOT NULL,
            text STRING NOT NULL,
            completed INT default 0
        );`);
};
