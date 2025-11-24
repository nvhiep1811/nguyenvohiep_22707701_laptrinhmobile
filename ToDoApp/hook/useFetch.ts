import { ToDo } from "@/type/type";
import axios from "axios";

const BASE_URL = "https://68e6f82510e3f82fbf3da5b4.mockapi.io/api/v1/todos";

export const todoApi = {
  getAll: () => axios.get(BASE_URL),
  getById: (id: number) => axios.get(`${BASE_URL}/${id}`),
  add: (todo: ToDo) => axios.post(BASE_URL, todo),
  update: (id: number, todo: ToDo) => axios.put(`${BASE_URL}/${id}`, todo),
  toggle: (id: number, completed: number) =>
    axios.patch(`${BASE_URL}/${id}`, { completed }),
  remove: (id: number) => axios.delete(`${BASE_URL}/${id}`),
};
