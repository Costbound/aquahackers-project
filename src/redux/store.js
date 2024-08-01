import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/slice-auth.js";

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;