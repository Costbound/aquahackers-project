import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { date } from "yup";

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
        `/water/day?date=${date}`
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
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editWater = createAsyncThunk(
  "editWater",
  async (data, thunkApi) => {
    try {
      const response = await axios.patch(`/water/${data.waterId}`, {
          waterAmount: data.waterAmount,
          date: data.date,
      });
      return response.data.data;
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
        `/water/${waterId}`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProgress = createAsyncThunk(
    'water/getTodayProgress',
    async (_, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const dispatch = thunkApi.dispatch
            const today = state.water.todayDate

            // Update todayProgress
            const response = await axios.get(
                `/water/day?date=${today}`
            );

            dispatch(fetchMonth({
                year: state.water.year,
                month: state.water.month,
            }))

            return response.data.data.dailyProgress;
        } catch (err) {
            thunkApi.rejectWithValue(err.response?.data )
        }
    }
)

