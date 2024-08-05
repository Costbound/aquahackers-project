// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { refreshToken, requestLogin, requestRegister } from "../services/aquatrack.js";
// import axios from "axios";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

// // Операция для регистрации пользователя
// export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
//   try {
//     const res = await requestRegister(formData); // Выполнение запроса на регистрацию
//     return res;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
//   }
// });

// // Операция для входа пользователя
// export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
//   try {
//     const res = await requestLogin(formData); // Выполнение запроса на вход
//     return res;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
//   }
// });

// // Операция для обновления токена
// export const refresh = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
//   try {
//     const response = await refreshToken();
//     setAuthHeader(response.data.accessToken)
//     return response;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken, requestLogin, requestRegister } from "../services/aquatrack.js";
import axios from "axios";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Операция для регистрации пользователя
export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
  try {
    const res = await requestRegister(formData); // Выполнение запроса на регистрацию
    thunkAPI.dispatch(login(formData)); // Выполнение запроса на логин после успешной регистрации
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
  }
});

// Операция для входа пользователя
export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await requestLogin(formData); // Выполнение запроса на вход
    setAuthHeader(res.accessToken); // Установка заголовка авторизации
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
  }
});

// Операция для обновления токена
export const refresh = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const response = await refreshToken();
    setAuthHeader(response.data.accessToken);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
