import { createAsyncThunk } from "@reduxjs/toolkit";
import { refreshToken, requestLogin, requestRegister } from "../services/aquatrack.js";
import axios from "axios";
import { instance } from "../services/instance.js";
import { clearState } from "./slice-auth.js";
import getTodayDate from "../../helpers/getTodayDate.js";
import {setSelectedDate, updateTodayDate} from "../water/slice-water.js";

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
    // Если регистрация успешна, сразу выполняем вход
    await thunkAPI.dispatch(login({ email: formData.email, password: formData.password })).unwrap();
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.data.message || err.message); // Обработка ошибок
  }
});

// Операция для входа пользователя
export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const res = await requestLogin(formData); // Выполнение запроса на вход
    setAuthHeader(res.data.accessToken);
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.data.message || err.message); // Обработка ошибок
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

export const apiLogout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.post("/auth/logout");
    clearAuthHeader();
    thunkApi.dispatch(clearState());
    thunkApi.dispatch(setSelectedDate(getTodayDate()))
    thunkApi.dispatch(updateTodayDate())
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});
