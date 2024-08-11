import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const fetchWater = createAsyncThunk(
  "water/fetchWater",
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/water/day?date=${date}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const addWater = createAsyncThunk(
  "addWater",
  async (newWater, thunkAPI) => {
    try {
      const response = await axios.post("/water", newWater);
      toast.success("Water added successfully");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const editWater = createAsyncThunk(
  "editWater",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${data.waterId}`, {
        waterAmount: data.waterAmount,
        date: data.date,
      });
      toast.success("Water updated successfully");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (waterId, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${waterId}`);
      toast.success("Water deleted successfully");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);

export const updateProgress = createAsyncThunk(
  "water/getTodayProgress",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;
      const today = state.water.todayDate;

      // Update todayProgress
      const response = await axios.get(`/water/day?date=${today}`);

      dispatch(
        fetchMonth({
          year: state.water.year,
          month: state.water.month,
        })
      );

      return response.data.data.dailyProgress;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.message,
      });
    }
  }
);
