import { todoApi } from "@/hook/useFetch";
import { ToDo } from "@/type/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ToDo[] = [];

// const db = getDb();

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    loadFromDB: (state, action) => action.payload,
    addToDo: (state, action) => {
      state.push(action.payload);

      try {
        todoApi.add(action.payload);
      } finally {
      }
      // db.runAsync("insert into todos(id, text) values(?, ?)", [
      //   action.payload.id,
      //   action.payload.text,
      // ]);
    },
    editToDo: (state, action) => {
      const { id, todo } = action.payload;
      const idx = state.findIndex((t) => t.id === id);

      if (idx !== -1) {
        try {
          todoApi.update(id, todo);
        } finally {
          state[idx] = todo;
        }
      }

      // db.runAsync("update todos set text=?, completed=? where id = ?", [
      //   action.payload.text,
      //   action.payload.completed,
      //   action.payload.id,
      // ]);
    },
    removeToDo: (state, action) => {
      const idx = state.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        try {
          todoApi.remove(action.payload);
        } finally {
          state.splice(idx, 1);
        }
      }

      // db.runAsync("delete from todos where id = ?", [action.payload]);
    },
    toggleTodo: (state, action) => {
      const idx = state.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        try {
          todoApi.toggle(action.payload, state[idx].completed ? 0 : 1);
        } finally {
          state[idx].completed = state[idx].completed ? 0 : 1;
        }
      }
      // db.runAsync("update todos set completed=? where id = ?", [
      //   state[idx].completed ? 0 : 1,
      //   action.payload,
      // ]);
    },
  },
});

const { actions, reducer } = todoSlice;
export const { addToDo, editToDo, removeToDo, toggleTodo, loadFromDB } =
  actions;
export default reducer;
