import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        name: '',
        gender: 'woman',
        weight: 0,
        waterRate: 1.5,
        sportTime: 0,
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload;
        }
    },
    extraReducers: (builder) => {}
});

export const { setName } = userDataSlice.actions;
const userDataReducer = userDataSlice.reducer;
export default userDataReducer;
