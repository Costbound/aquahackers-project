import { createSlice } from "@reduxjs/toolkit";

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
        month: new Date().getMonth(),
        selectedDate: new Date().toISOString().split('T')[0], // default to today
    },
    reducers: {
        setSelectedDate(state, action) {
            state.selectedDate = action.payload;
        },
    },
    extraReducers: (builder) => {}
});

export const { setSelectedDate } = waterSlice.actions;
const waterReducer = waterSlice.reducer;
export default waterReducer;
