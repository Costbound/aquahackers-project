import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Операция для получения данных о потреблении воды
export const fetchWaterData = createAsyncThunk("water/fetchWaterData", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/water/data");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || error.message);
  }
});
