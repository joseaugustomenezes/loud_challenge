export const TOKEN_KEY = "@loud-Token";
export const USER_ID = "@loud-UserId";
export const isAuthenticated = () =>
  localStorage.getItem(TOKEN_KEY) !== null &&
  localStorage.getItem(USER_ID) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID);
export const login = (token, userId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID, userId);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};
