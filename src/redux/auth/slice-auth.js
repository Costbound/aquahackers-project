import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        email: null,
        accessToken: null,
        isLoggedIn: false,
        isRefreshing: false,
        error: null
    }
})

const authReducer = authSlice.reducer
export default authReducer