import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, updateUserData } from "./ops-userData.js";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    name: "",
    email: "",
    gender: "woman",
    weight: 0,
    waterRate: 1.5,
    sportTime: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.weight = action.payload.weight;
        state.waterRate = action.payload.waterRate;
        state.sportTime = action.payload.sportTime;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.weight = action.payload.weight;
        state.waterRate = action.payload.waterRate;
        state.sportTime = action.payload.sportTime;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userDataReducer = userDataSlice.reducer;
export default userDataReducer;
