import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//Віталія
export const saveWaterData = createAsyncThunk(
  "waterForm/saveWaterData",
  async ({ type, waterId, data }) => {
    try {
      const url = type === "edit" ? `/api/water/${waterId}` : "/api/water";
      const method = type === "edit" ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save water data");
        throw new Error(errorData.message || "Failed to save water data");
      }

      return await response.json();
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);
// Віталія
