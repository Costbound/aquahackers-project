import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice-auth.js";
import waterReducer from "./water/slice-water.js";
import userDataReducer from "./userData/slice-userData.js";
import autoRefreshMiddleware from "./middlewares/autoRefreshMiddleware.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        water: waterReducer,
        userData: userDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(autoRefreshMiddleware),
})

export default store;
