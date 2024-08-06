import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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