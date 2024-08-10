import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { date } from "yup";

axios.defaults.baseURL = "https://final-team-pr-backend.onrender.com";

export const fetchMonth = createAsyncThunk(
  "fetchMonth",
  async (payload, thunkAPI) => {
    try {
      const responce = await axios.get(
        `/water/month?date=${payload.year}-${String(payload.month).padStart(
          2,
          "0"
        )}`
      );
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWater = createAsyncThunk(
  "water/fetchWater",
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://final-team-pr-backend.onrender.com/water/day?date=${date}`
      );
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(true);
    }
  }
);

export const addWater = createAsyncThunk(
  "addWater",
  async (newWater, thunkApi) => {
    try {
      const response = await axios.post("/water", newWater);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editWater = createAsyncThunk(
  "editWater",
  async (waterId, thunkApi) => {
    try {
      const response = await axios.patch(`/water/${waterId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://final-team-pr-backend.onrender.com/water/${waterId}`
      );
      if (response.status === 204) {
        console.log("success");
        return waterId; // Возвращаем waterId для удаления из состояния
      }
      return rejectWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTodayProgress = createAsyncThunk(
    'water/getTodayProgress',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `https://final-team-pr-backend.onrender.com/water/day?date=2024-04-13`
            );
            return response.data.data.dailyProgress;
        } catch (err) {
            thunkApi.rejectWithValue(err.response?.data )
        }
    }
)

