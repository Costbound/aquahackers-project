import {createSlice} from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        name: '',
        gender: 'woman',
        weight: 0,
        waterRate: 1.5,
        sportTime: 0,
    },
    extraReducers: (builder) => { //примерная логика чтоб я мог получать данные на имя, но это не точно тк это скорее относится к сеттингам
        builder
            .addCase('setUserData', (state, action) => {
                state.name = action.payload.name
                state.gender = action.payload.gender
                state.weight = action.payload.weight
                state.waterRate = action.payload.waterRate
                state.sportTime = action.payload.sportTime
            })
            .addCase('setName', (state, action) => {
                state.name = action.payload
            })
            .addCase('setGender', (state, action) => {
                state.gender = action.payload
            })
            .addCase('setWeight', (state, action) => {
                state.weight = action.payload
            })
            .addCase('setWaterRate', (state, action) => {
                state.waterRate = action.payload
            })
            .addCase('setSportTime', (state, action) => {
                state.sportTime = action.payload
            })
    }
})

const userDataReducer = userDataSlice.reducer
export default userDataReducer