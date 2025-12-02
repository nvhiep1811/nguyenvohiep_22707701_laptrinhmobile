import { Todo } from "@/type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UpdateTodoPayload = { id: string; text: string };

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    todosLoaded: (state, action: PayloadAction<Todo[]>) => action.payload,

    todoAdded: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },

    todoToggled: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) {
        const newValue = todo.completed === 1 ? 0 : 1;
        todo.completed = newValue;
      }
    },

    todoUpdated: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { id, text } = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.text = text.trim();
      }
    },

    todoDeleted: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { todosLoaded, todoAdded, todoToggled, todoUpdated, todoDeleted } =
  todosSlice.actions;
export default todosSlice.reducer;
