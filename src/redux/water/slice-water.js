import { createSlice } from "@reduxjs/toolkit";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    selectedMonthWater: [],
    selectedDayWater: [],
    month: new Date().getMonth(),
  },
  extraReducers: (build) => {},
});

const waterReducer = waterSlice.reducer;
export default waterReducer;
