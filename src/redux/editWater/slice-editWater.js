import { createSlice } from "@reduxjs/toolkit";
import { addWater, editWater } from "./ops-editWater";


const editWaterSlice = createSlice({
  name: "editWater",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
        .addCase(addWater.pending, (state) => {
            state.loading = true;
    })
        .addCase(addWater.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
    })
        .addCase(addWater.rejected, (state) => {
            state.loading = false;
            state.error = true;
    })
        .addCase(editWater.pending, (state) => {
            state.loading = true;
    })
        .addCase(editWater.fulfilled, (state) => {
            state.loading = false;
            
    })
});

const editWaterReducer = editWaterSlice.reducer;
export default editWaterReducer;