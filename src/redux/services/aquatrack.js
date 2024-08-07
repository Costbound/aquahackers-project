// import { publicInstance } from "./instance";

// export const requestRegister = async (formData) => {
//   const { data } = await publicInstance.post("/auth/signup", formData);
//   return data;
// };

// export const requestLogin = async (formData) => {
//   const { data } = await publicInstance.post("/auth/signin", formData);
//   return data;
// };

// export const refreshToken = async () => {
//   const { data } = await publicInstance.post("/auth/refresh", {});
//   return data;
// };

import { publicInstance } from "./instance";

// Функция для регистрации пользователя
export const requestRegister = async (formData) => {
  const { data } = await publicInstance.post("/auth/signup", formData);
  return data;
};

// Функция для входа пользователя
export const requestLogin = async (formData) => {
  const { data } = await publicInstance.post("/auth/signin", formData);
  return data;
};

// Функция для обновления токена
export const refreshToken = async () => {
  const { data } = await publicInstance.post("/auth/refresh", {}, { withCredentials: true });
  return data;
};
