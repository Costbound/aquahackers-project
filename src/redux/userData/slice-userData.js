import { createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData, totalUsers } from "./ops-userData.js";

const initialState = {
  user: {
    name: "",
    email: "",
    gender: "woman",
    weight: 0,
    waterRate: 1500,
    sportTime: 0,
  },
  totalUsers: 0,
  error: null,
};

const handlePending = (state) => {
  state.error = null;
};

const handleRejected = (state, action) => {
  state.error = action.payload;
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  extraReducers: (builder) => {
    builder
        .addCase(getUserData.fulfilled, (state, action) => {
          state.user.name = action.payload.name;
          state.user.gender = action.payload.gender;
          state.user.weight = action.payload.weight;
          state.user.waterRate = action.payload.waterToDrink;
          state.user.sportTime = action.payload.timeOfSportActivities;
          state.user.email = action.payload.email;
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
          state.user.name = action.payload.name;
          state.user.gender = action.payload.gender;
          state.user.weight = action.payload.weight;
          state.user.waterRate = action.payload.waterToDrink;
          state.user.sportTime = action.payload.timeOfSportActivities;
          state.user.email = action.payload.email;
        })
        .addCase(totalUsers.pending, handlePending)
        .addCase(totalUsers.fulfilled, (state, action) => {
          state.totalUsers = action.payload;
        })
        .addCase(totalUsers.rejected, handleRejected);
  },
});

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;
