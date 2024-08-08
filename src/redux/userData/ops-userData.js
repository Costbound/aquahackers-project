import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
    'userData/getUserData',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('/users/current')
            return res.data.data.userData
        } catch (err) {
            thunkAPI.rejectWithValue(err.response.data.message)
        }
    })

export const updateUserData = createAsyncThunk(
    'userData/updateUserData',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.patch('/users/current', payload)
            return res.data.data.data
        } catch (err) {
            thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
)