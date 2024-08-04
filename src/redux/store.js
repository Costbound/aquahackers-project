import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice-auth.js";
import waterReducer from "./water/slice-water.js";
import userDataReducer from "./userData/slice-userData.js";
import waterFormReducer from "./water/slice-water"; //Віталія

const store = configureStore({
  reducer: {
    auth: authReducer,
    water: waterReducer,
    userData: userDataReducer,
    waterForm: waterFormReducer, //Віталія
  },
});

export default store;
