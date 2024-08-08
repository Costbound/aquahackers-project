import { createSlice } from "@reduxjs/toolkit";
import {fetchMonth, addWater, editWater, getTodayProgress} from "./ops-water";
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
    // todayDate: getTodayDate(),
    todayDate: '2024-04-13',
    todayProgress: 70,
    isLoading: false,
    selectedDay: {
      items: [],
      progress: 70,
      loading: false,
      error: null,
    },
    modalFlags: {
      isDeleteWaterModalOpen: false,
      isLogoutModalOpen: false,
    },
    selectedWaterId: null,
  },
  reducers: {
    changeDeleteWaterModalOpen(state, action) {
      state.modalFlags.isDeleteWaterModalOpen = action.payload;
    },
    setSelectedWaterId(state, action) {
      state.selectedWaterId = action.payload;
    },
    changeLogoutModalOpen(state, action) {
      state.modalFlags.isLogoutModalOpen = action.payload;
    },
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
          (item) => item.id === action.payload.id
        );
        // state.selectedDay.items ?????!!
        state.selectedDay.items[index] = action.payload;
      })
      .addCase(fetchWater.pending, handlePending)
      .addCase(fetchWater.fulfilled, (state, action) => {
        state.selectedDay.loading = false;
        state.selectedDay.error = null;
        state.selectedDay.items = action.payload.waters;
        if (state.todayDate !== getTodayDate()) {
          state.todayDate = getTodayDate()
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
      })
});

export const {
  changeDeleteWaterModalOpen,
  setSelectedWaterId,
  changeLogoutModalOpen,
} = waterSlice.actions;

const waterReducer = waterSlice.reducer;
export default waterReducer;
