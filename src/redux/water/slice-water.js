import { createSlice } from "@reduxjs/toolkit";
import { fetchMonth, addWater, editWater, getTodayProgress } from "./ops-water";
import { deleteWater, fetchWater } from "./ops-water";
import getTodayDate from "../../helpers/getTodayDate.js";

const handlePending = (state) => {
  state.selectedDay.loading = true;
};

const handleRejected = (state, action) => {
  state.selectedDay.loading = false;
  state.selectedDay.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    selectedMonthWater: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    todayDate: getTodayDate(),
    todayProgress: 0,
    isLoading: false,
    selectedDay: {
      items: [],
      progress: 0,
      date: getTodayDate(),
      loading: false,
      error: null,
    },
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDay.date = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMonth.fulfilled, (state, action) => {
        state.selectedMonthWater = action.payload.data.monthlyWater;
      })
      .addCase(addWater.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedDay.items.push(action.payload);
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
        const index = state.selectedDay.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.selectedDay.items[index].waterAmount = action.payload.waterAmount;
        state.selectedDay.items[index].date = action.payload.date;
        state.selectedDay.items[index].updatedAt = action.payload.updatedAt;
      })
      .addCase(fetchWater.pending, handlePending)
      .addCase(fetchWater.fulfilled, (state, action) => {
        state.selectedDay.loading = false;
        state.selectedDay.error = null;
        state.selectedDay.items = action.payload.waters;
        if (state.todayDate !== getTodayDate()) {
          state.todayDate = getTodayDate();
          state.todayProgress = action.payload.dailyProgress;
        }
      })
      .addCase(fetchWater.rejected, (state, action) => {
        console.log("Failed to fetch water data:", action.payload);
        state.selectedDay.loading = false;
        state.selectedDay.error = action.payload;
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.selectedDay.loading = false;
        state.selectedDay.error = null;
        state.selectedDay.items = state.selectedDay.items.filter(
          (water) => water._id !== action.payload
        );
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(getTodayProgress.fulfilled, (state, action) => {
        state.todayProgress = action.payload;
      }),
});

export const {
  changeDeleteWaterModalOpen,
  changeSettingsModalOpen,
  changeLogoutModalOpen,
  setSelectedWaterId,
  setSelectedDate,
} = waterSlice.actions;

const waterReducer = waterSlice.reducer;
export default waterReducer;
