import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null,
        accessToken: null,
        isLoggedIn: false,
        isRefreshing: false,
        error: null
    },
    extraReducers: (builder) => {}
})

const authReducer = authSlice.reducer
export default authReducer