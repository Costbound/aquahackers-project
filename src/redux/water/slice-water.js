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
        selectedMonthWater: [],
        month: new Date().getMonth()
    }
})

const waterReducer = waterSlice.reducer
export default waterReducer