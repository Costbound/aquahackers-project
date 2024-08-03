import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null,
        accessToken: null,
        isLoggedIn: true,
        isRefreshing: false,
        error: null
    }
})

const authReducer = authSlice.reducer
export default authReducer