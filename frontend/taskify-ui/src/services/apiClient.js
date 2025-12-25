import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network / server down
    if (!error.response) {
      throw {
        message: "Unable to connect to server. Please try again later.",
      };
    }

    // Backend validation / auth error
    throw new Error (
      error.response.data.message || "Something went wrong",
    );
  }
);

export default api;
