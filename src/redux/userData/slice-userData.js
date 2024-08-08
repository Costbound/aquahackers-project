import {createSlice} from "@reduxjs/toolkit";
import {getUserData} from "./ops-userData.js";

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
        }

    },
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
    }
})

const userDataReducer = userDataSlice.reducer
export default userDataReducer