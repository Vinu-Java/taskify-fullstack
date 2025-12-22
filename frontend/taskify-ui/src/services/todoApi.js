import api from "./apiClient";

const userId = localStorage.getItem("userId");

export const getTodos = async ({ search, page, size }) => {
  const response = await api.get(`/todos/user/${userId}`, {
    params: { search, page, size },
  });
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await api.post(`/todos/user/${userId}`, todo);
  return response.data;
};

export const updateTodo = async (todoId, todo) => {
  const response = await api.put(`/todos/${todoId}`, todo);
  return response.data;
};

export const deleteTodo = async (todoId) => {
  await api.delete(`/todos/${todoId}`);
};

