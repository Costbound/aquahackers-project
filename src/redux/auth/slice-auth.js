import { createSlice } from "@reduxjs/toolkit";

// Пример редюсера для обновления данных пользователя
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        email: null,
        accessToken: null,
        isLoggedIn: false,
        isRefreshing: false,
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name; // Сохраните имя пользователя
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
        },
        // Другие редюсеры, если есть
        logOut(state) {
            state.name = '';
            state.email = null;
            state.accessToken = null;
            state.isLoggedIn = false;
        },
        // Добавьте другие редюсеры по необходимости
    },
    // extraReducers: (builder) => {
    //     // Обработчики асинхронных действий (например, с помощью createAsyncThunk)
    // }
});

export const { setUser, logOut } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
