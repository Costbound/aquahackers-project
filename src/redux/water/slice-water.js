import {createSlice} from "@reduxjs/toolkit";

const waterSlice = createSlice({
    name: "water",
    initialState: {
        userParams: {
            dailyWater: 0,
            gender: 'female',
            weight: 0,
            sportTime: 0
        },
        currentMonthWater: [],
        prevMonthWater: [],
    },
    extraReducers: (build) => {}
})

const waterReducer = waterSlice.reducer
export default waterReducer