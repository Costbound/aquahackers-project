import { createSlice } from "@reduxjs/toolkit";
import { fetchMonth } from "./ops-water";

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
    year: new Date().getFullYear(),
  },
  extraReducers: (builder) =>
    builder.addCase(fetchMonth.fulfilled, (state, action) => {
      state.selectedMonthWater = action.payload;
    }),
});

const waterReducer = waterSlice.reducer;
export default waterReducer;
