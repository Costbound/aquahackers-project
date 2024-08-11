import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-hot-toast";


export const requestTotalUsers = async () => {
  const { data } = await axios.get("/users");
  return data.data.totalUsers;
};
export const getUserData = createAsyncThunk(
    "userData/getUserData",
    async (_, thunkAPI) => {
  try {
    const res = await axios.get("/users/current");
    return res.data.data.userData;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: error.response.status,
      message: error.response.message,
    });
  }
});

// Операция для обновления данных текущего пользователя
export const updateUserData = createAsyncThunk(
  "userData/updateUserData",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch("/users/current", payload);
      if (!payload.has('avatar')) {
        toast.success('Your data updated successfully.');
      }
      return res.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

// Операция для получения общего числа пользователей
export const totalUsers = createAsyncThunk(
    "users/users",
    async (_, thunkAPI) => {
  try {
    const totalUsersCount = await requestTotalUsers();
    return totalUsersCount;
  } catch (error) {
    return thunkAPI.rejectWithValue({
      status: error.response.status,
      message: error.response.message,
    });
  }
});
