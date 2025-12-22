import api from "./apiClient";

export const loginUser = async (loginData) => {
  const response = await api.post("/user/login", loginData);
  return response.data;
};
