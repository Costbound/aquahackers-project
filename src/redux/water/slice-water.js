import { createSlice } from "@reduxjs/toolkit";
import { fetchMonth } from "./ops-water";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    selectedMonthWater: [],
    selectedDayWater: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    isLoading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedMonthWater = action.payload.data.monthlyWater;
      }),
});

const waterReducer = waterSlice.reducer;
export default waterReducer;