import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";

//Віталія
const API_BASE_URL = "https://final-team-pr-backend.onrender.com";

// Асинхронний thunk для збереження даних
export const saveWaterData = createAsyncThunk(
  "waterForm/saveWaterData",
  async (data, { rejectWithValue }) => {
    try {
      // Вибір методу POST або PATCH в залежності від типу дії
      const method = data.id ? "PATCH" : "POST";
      const url = data.id
        ? `${API_BASE_URL}/water/${data.id}`
        : `${API_BASE_URL}/water`;

      const response = await axios({
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Віталія
