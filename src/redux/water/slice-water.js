import { createSlice } from "@reduxjs/toolkit";
import {fetchMonth, addWater, editWater, updateProgress} from "./ops-water";
import { deleteWater, fetchWater } from "./ops-water";
import getTodayDate from "../../helpers/getTodayDate.js";

const handlePending = (state) => {
  state.selectedDay.loading = true;
};

const handleRejected = (state, action) => {
  state.selectedDay.loading = false;
  state.selectedDay.error = action.payload;
};

const updateTodayProgress = (state, date, newDailyProgress) => {
  if (date === state.todayDate) {
    state.todayProgress = newDailyProgress;
  }
}

const updateProgressInCalendar = (state, date, newDailyProgress) => {
  const dayIndex = state.selectedMonthWater.findIndex(day => day.date === date);
  if (dayIndex !== -1) {
    state.selectedMonthWater[dayIndex].dailyProgress = newDailyProgress;
  }
}

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
    updateTodayDate(state) {
      state.todayDate = getTodayDate()
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMonth.fulfilled, (state, action) => {
        state.selectedMonthWater = action.payload.data.monthlyWater;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        const {date, updatedDailyProgress, water} = action.payload

        // Update today progress if selected day is today
        updateTodayProgress(state, date, updatedDailyProgress)

        // Update progress in calendar if this day is visible on calendar
        updateProgressInCalendar(state, date, updatedDailyProgress)

        // Return to avoid push when add triggered from page with progressbar for today and selected date is not today
        if (date === state.todayDate && state.selectedDay.date !== state.todayDate) {
          return
        }
        state.selectedDay.items.push(water);
      })
      .addCase(editWater.fulfilled, (state, action) => {
        const {date, updatedDailyProgress, water} = action.payload

        // Update today progress if selected day is today
        updateTodayProgress(state, date, updatedDailyProgress)

        // Update progress in calendar if this day is visible on calendar
        // Update progress in calendar if this day is visible on calendar
        updateProgressInCalendar(state, date, updatedDailyProgress)

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
        updateTodayProgress(state, date, dailyProgress)


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
        updateTodayProgress(state, date, updatedDailyProgress)

        // Update progress in calendar if this day is visible on calendar
        updateProgressInCalendar(state, date, updatedDailyProgress)

        state.selectedDay.items = state.selectedDay.items.filter(
          (water) => water._id !== payloadWater._id
        );
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.todayProgress = action.payload;
      }),
});

export const {
  changeDeleteWaterModalOpen,
  setSelectedWaterId,
  setSelectedDate,
    updateTodayDate
} = waterSlice.actions;

const waterReducer = waterSlice.reducer;
export default waterReducer;
