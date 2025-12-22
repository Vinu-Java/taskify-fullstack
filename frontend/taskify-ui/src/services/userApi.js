import api from "./apiClient";

export const registerUser = async (registerData) => {
  const response = await api.post("/user/register", registerData);
  return response.data;
};
