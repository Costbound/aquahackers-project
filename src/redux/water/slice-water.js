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
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    todayDate: getTodayDate(),
    todayProgress: 0,
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
      .addCase(addWater.fulfilled, (state, action) => {
        const {date, updatedDailyProgress, water} = action.payload

        // Update today progress if selected day is today
        if (date === state.todayDate) {
          state.todayProgress = updatedDailyProgress;
        }

        // Return to avoid push when add triggered from page with progressbar for today and selected date is not today
        if (date === state.todayDate && state.selectedDay.date !== state.todayDate) {
          return
        }
        state.selectedDay.items.push(water);
      })
      .addCase(editWater.fulfilled, (state, action) => {
        const {date, updatedDailyProgress, water} = action.payload

        // Update today progress if selected day is today
        if (date === state.todayDate) {
          state.todayProgress = updatedDailyProgress
        }

        const index = state.selectedDay.items.findIndex(
          (item) => item._id === water._id
        );
        state.selectedDay.items[index].waterAmount = water.waterAmount
        state.selectedDay.items[index].date = water.date
        state.selectedDay.items[index].updatedAt = water.updatedAt
      })
      .addCase(fetchWater.pending, handlePending)
      .addCase(fetchWater.fulfilled, (state, action) => {
        const {date, dailyProgress, waters} = action.payload
        state.selectedDay.loading = false;
        state.selectedDay.error = null;

        // Update today progress if selected day is today
        if (date === state.todayDate) {
          state.todayProgress = dailyProgress
        }

        state.selectedDay.items = waters
      })
      .addCase(fetchWater.rejected, (state, action) => {
        console.log("Failed to fetch water data:", action.payload);
        state.selectedDay.loading = false;
        state.selectedDay.error = action.payload;
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        const {date, updatedDailyProgress, water: payloadWater} = action.payload
        state.selectedDay.loading = false;
        state.selectedDay.error = null;

        // Update today progress if selected day is today
        if (date === state.todayDate) {
          state.todayProgress = updatedDailyProgress
        }

        state.selectedDay.items = state.selectedDay.items.filter(
          (water) => water._id !== payloadWater._id
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
