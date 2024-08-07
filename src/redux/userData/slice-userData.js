import {createSlice} from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        user: {
            name: '',
            gender: 'woman',
            weight: 0,
            waterRate: 1.5,
            sportTime: 0,
        }

    },
    extraReducers: (builder) => {}
})

const userDataReducer = userDataSlice.reducer
export default userDataReducer