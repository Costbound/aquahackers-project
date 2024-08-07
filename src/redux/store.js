import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth/slice-auth.js";
import waterReducer from "./water/slice-water.js";
import userDataReducer from "./userData/slice-userData.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        water: waterReducer,
        userData: userDataReducer,
    }
})

export default store;