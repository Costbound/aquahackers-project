import { createSlice } from "@reduxjs/toolkit";
import { openModal } from "./ops-modal";

const waterSlice = createSlice({
  name: "modal",
    initialState: {
        isOpen: false,
        modalContent: null,
  },
    extraReducers: (builder) =>
        builder
            .addCase(openModal, (state, action) => {
                state.isOpen = true;
                state.modalContent = action.payload;
            })
            // .addCase(closeModal, (state) => {
            //     state.isOpen = false;
            //     state.modalContent = null;
            // }),
});

const waterReducer = waterSlice.reducer;
export default waterReducer;
