import { ToDo } from "@/type/type";
import { getDb } from "./db";

export const addToDo = (todo: ToDo) => {
  const db = getDb();

  db.runAsync("insert into todos(id, text) values(?, ?)", [todo.id, todo.text]);
};

export const updateToDo = (todo: ToDo) => {
  const db = getDb();

  db.runAsync("update todos set text=?, completed=? where id = ?", [
    todo.text,
    todo.completed,
    todo.id,
  ]);
};

export const removeToDo = (id: string) => {
  const db = getDb();

  db.runAsync("delete from todos where id = ?", [id]);
};

export const getAll = () => {
  const db = getDb();

  return db.getAllAsync<ToDo>("select * from todos");
};

export const getById = (id: string) => {
  const db = getDb();

  return db.getFirstAsync<ToDo>("select * from todos where id = ?", [id]);
};

export const getByText = (text: string) => {
  const db = getDb();

  return db.getFirstAsync<ToDo>("select * from todos where text like '%?%'", [
    text,
  ]);
};
