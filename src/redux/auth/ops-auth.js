import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken, requestLogin, requestRegister } from "../services/aquatrack.js";

// Операция для регистрации пользователя
export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
  try {
    const res = await requestRegister(formData); // Выполнение запроса на регистрацию
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
  }
});

// Операция для входа пользователя
export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await requestLogin(formData); // Выполнение запроса на вход
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message || err.message); // Обработка ошибок
  }
});

// Операция для обновления токена
export const refresh = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const response = await refreshToken();
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
