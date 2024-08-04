import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://final-team-pr-backend.onrender.com";

export const fetchMonth = createAsyncThunk(
  "fetchMonth",
  async (payload, thunkAPI) => {
    try {
      const responce = await axios.get(
        `/water/month?date=${payload.year}-${payload.month}`
      );
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
