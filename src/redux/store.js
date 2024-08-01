import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/slice-auth.js";
import waterReducer from "./water/slice-water.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        water: waterReducer
    }
})

export default store;