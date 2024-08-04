import { createSlice } from "@reduxjs/toolkit";
import { signup, login, refresh } from "./ops-auth.js";

// Начальное состояние auth
const initialState = {
  name: "",
  email: null,
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

// Создание authSlice с использованием createSlice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: null,
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Обработка состояния pending для операции signup
      .addCase(signup.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      // Обработка состояния fulfilled для операции signup
      .addCase(signup.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.email = action.payload.email;
        state.accessToken = action.payload.token;
        state.isLoggedIn = true;
      })
      // Обработка состояния rejected для операции signup
      .addCase(signup.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      // Обработка состояния pending для операции login
      .addCase(login.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      // Обработка состояния fulfilled для операции login
      .addCase(login.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.email = action.payload.email;
        state.accessToken = action.payload.token;
        state.isLoggedIn = true;
      })
      // Обработка состояния rejected для операции login
      .addCase(login.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      // Обработка состояния pending для операции refresh
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      // Обработка состояния fulfilled для операции refresh
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      // Обработка состояния rejected для операции refresh
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
