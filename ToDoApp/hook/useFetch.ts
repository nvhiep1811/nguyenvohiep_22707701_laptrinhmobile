import { Todo } from "@/type/type";
import axios from "axios";

const BASE_URL = "https://68e6f82510e3f82fbf3da5b4.mockapi.io/api/v1/todos";

export const todoApi = {
  getAll: () => axios.get(BASE_URL),

  getById: (id: string) => axios.get(`${BASE_URL}/${id}`),

  add: (todo: Todo) => axios.post(BASE_URL, todo),

  update: (id: string, todo: Todo) => axios.put(`${BASE_URL}/${id}`, todo),

  toggle: (id: string, completed: number) => {
    return axios.put(`${BASE_URL}/${id}`, { completed });
  },

  remove: (id: string) => axios.delete(`${BASE_URL}/${id}`),

  deleteAll: async () => {
    const response = await axios.get(BASE_URL);
    const todos = response.data;

    return Promise.all(
      todos.map((todo: Todo) => axios.delete(`${BASE_URL}/${todo.id}`))
    );
  },
};
