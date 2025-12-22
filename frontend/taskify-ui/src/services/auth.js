export const isLoggedIn = () => {
  return localStorage.getItem("userId") !== null;
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const logout = () => {
  localStorage.removeItem("userId");
};
