import { createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "./ops-userData.js";
import {totalUsers} from "./ops-userData.js";

const handlePending = (state) => {
    state.error = null;
};

const handleRejected = (state, action) => {
    state.error = action.payload;
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        user: {
            name: '',
            email: '',
            gender: 'woman',
            weight: 0,
            waterRate: 1500,
            sportTime: 0,
            avatar: '',  
        },
        totalUsers: 0,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.gender = action.payload.gender;
                state.user.weight = action.payload.weight;
                state.user.waterRate = action.payload.waterRate;
                state.user.sportTime = action.payload.sportTime;
                state.user.email = action.payload.email;
                state.user.avatar = action.payload.avatar;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.gender = action.payload.gender;
                state.user.weight = action.payload.weight;
                state.user.waterRate = action.payload.waterRate;
                state.user.sportTime = action.payload.sportTime;
                state.user.email = action.payload.email;
                state.user.avatar = action.payload.avatar;
            })
            .addCase(totalUsers.pending, handlePending)
            .addCase(totalUsers.fulfilled, (state, action) => {
                state.totalUsers = action.payload;
            })
            .addCase(totalUsers.rejected, handleRejected);
    }
});

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;
