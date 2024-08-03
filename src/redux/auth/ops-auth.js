import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { refreshTokens } from "./auht/slice-auth.js";

export const axiosInstance = axios.create({
  baseURL: "",
});

const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// const clearAuthHeader = () => {
//   axiosInstance.defaults.headers.common.Authorization = "";
// };

export const currentEdit = createAsyncThunk(
  "user/currentEdit",
  async (editedUser, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedAccessToken = state.user.accessToken;

    if (persistedAccessToken === null) {
      return thunkAPI.rejectWithValue("Unable to get current user");
    }

    try {
      setAuthHeader(persistedAccessToken);
      const response = await axiosInstance.patch(
        `/users/current/edit`,
        editedUser
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
