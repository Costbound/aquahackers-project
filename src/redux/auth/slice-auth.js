import { createSlice } from "@reduxjs/toolkit";
import { signup, login, refresh, apiLogout } from "./ops-auth.js";

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
  reducers: {
    clearState(state) {
      state.name = "";
      state.email = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка состояния pending для операции signup
      .addCase(signup.pending, (state) => {
        state.error = null;
      })
      // Обработка состояния fulfilled для операции signup
      .addCase(signup.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.accessToken = action.payload.token;
      })
      // Обработка состояния rejected для операции signup
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Обработка состояния pending для операции login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      // Обработка состояния fulfilled для операции login
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.accessToken = action.payload.token;
        state.isLoggedIn = true;
      })
      // Обработка состояния rejected для операции login
      .addCase(login.rejected, (state, action) => {
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
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(apiLogout.fulfilled, (state) => {
        state.name = "";
        state.email = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
      });
  },
});

export const { clearState } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
