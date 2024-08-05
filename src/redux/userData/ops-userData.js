import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Операция для получения данных пользователя
export const fetchUserData = createAsyncThunk("userData/fetchUserData", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/user/data");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || error.message);
  }
});

// Операция для обновления данных пользователя
export const updateUserData = createAsyncThunk("userData/updateUserData", async (userData, thunkAPI) => {
  try {
    const response = await axios.put("/user/data", userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || error.message);
  }
});
