import { createSlice } from "@reduxjs/toolkit";
import { fetchMonth, addWater, editWater } from "./ops-water";
import { deleteWater, fetchWater } from "./ops-water";

const handlePending = (state) => {
  state.water.loading = true;
};

const handleRejected = (state, action) => {
  state.water.loading = false;
  state.water.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    selectedMonthWater: [],
    selectedDayWater: [],
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    isLoading: false,
    water: {
      items: [
        { id: 1, amount: 250, time: "2022-04-13T07:00:00Z" },//сделано для проверки как приходят данные
        { id: 2, amount: 300, time: "2022-04-13T11:00:00Z" },
        { id: 3, amount: 350, time: "2022-04-13T13:00:00Z" },
        { id: 4, amount: 400, time: "2022-04-13T15:00:00Z" },
        { id: 5, amount: 450, time: "2022-04-13T17:00:00Z" },
        { id: 6, amount: 1000, time: "2022-04-13T19:00:00Z" },
      ],
      loading: false,
      error: null,
    },
    modalFlags: {
      isDeleteWaterModalOpen: false,
      isLogoutModalOpen: false,
      isSettingsModalOpen: false,
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
    changeSettingsModalOpen(state, action) {
      state.modalFlags.isSettingsModalOpen = action.payload;
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
        state.selectedDayWater[index] = action.payload;
      })
      .addCase(fetchWater.pending, handlePending)
      .addCase(fetchWater.fulfilled, (state, action) => {
        state.water.loading = false;
        state.water.error = null;
        state.water.items = action.payload;
      })
      .addCase(fetchWater.rejected, (state, action) => {
        console.log("Failed to fetch water data:", action.payload);
        state.water.loading = false;
        state.water.error = action.payload;
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.water.loading = false;
        state.water.error = null;
        state.water.items = state.water.items.filter(
          (water) => water._id !== action.payload
        );
      })
      .addCase(deleteWater.rejected, handleRejected),
});

export const {
  changeDeleteWaterModalOpen,
  changeSettingsModalOpen,
  changeLogoutModalOpen,
  setSelectedWaterId,
} = waterSlice.actions;

const waterReducer = waterSlice.reducer;
export default waterReducer;
