import { createSlice } from "@reduxjs/toolkit";
import { fetchMonth, addWater, editWater } from "./ops-water";

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
      })
      .addCase(addWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDayWater.push(action.payload);
      })
      // .addCase(addWater.rejected, (state) => {
      //   state.isLoading = false;
      //   state.error = true;
      // })
      .addCase(editWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editWater.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.selectedDayWater.findIndex(
          (item) => item.id === action.payload.id
        );
        // state.selectedDayWater ?????!!
        state.selectedDayWater[index] = action.payload
      }),
});

const waterReducer = waterSlice.reducer;
export default waterReducer;
