import { createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "./ops-userData.js";

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
                state.user.avatar = action.payload.avatar || '';  // Добавляем аватар из payload
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.user.gender = action.payload.gender;
                state.user.weight = action.payload.weight;
                state.user.waterRate = action.payload.waterToDrink;
                state.user.sportTime = action.payload.timeOfSportActivities;
                state.user.email = action.payload.email;
                state.user.avatar = action.payload.avatar || '';  // Обновляем аватар при успешном обновлении данных
            });
    }
});

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;