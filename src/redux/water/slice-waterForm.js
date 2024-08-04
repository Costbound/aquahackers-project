import { createSlice } from "@reduxjs/toolkit";
import { saveWaterData } from "./ops-water";

const waterFormSlice = createSlice({
  name: "waterForm",
  initialState: {
    waterAmount: 50,
    date: new Date().toISOString().slice(0, 16),
    status: "idle",
    error: null,
  },
  reducers: {
    setWaterAmount: (state, action) => {
      state.waterAmount = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    resetWater: (state) => {
      state.waterAmount = 50;
      state.date = new Date().toISOString().slice(0, 16);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWaterData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveWaterData.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveWaterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setWaterAmount, setDate, resetWater } = waterFormSlice.actions;
export default waterFormSlice.reducer;
