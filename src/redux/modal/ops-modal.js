import { createAsyncThunk } from "@reduxjs/toolkit";

export const openModal = createAsyncThunk(
  "modal/openModal",
  async (payload, thunkAPI) => {
    return thunkAPI.fulfillWithValue(payload);
  }
);
