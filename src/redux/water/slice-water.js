import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterData } from "./ops-water.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    userParams: {
      dailyWater: 0,
      gender: "female",
      weight: 0,
      sportTime: 0,
    },
    selectedMonthWater: [],
    month: new Date().getMonth(),
    selectedDate: new Date().toISOString().split("T")[0], // default to today
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMonthWater = action.payload.selectedMonthWater;
        state.userParams = action.payload.userParams;
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedDate } = waterSlice.actions;
const waterReducer = waterSlice.reducer;
export default waterReducer;
