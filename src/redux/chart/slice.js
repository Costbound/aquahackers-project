import { createSlice } from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    showChart: false,
  },
  reducers: {
    setShowChart(state, action) {
      state.showChart = action.payload;
    },
  },
});

export const { toggleChart, setShowChart } = chartSlice.actions;
export const chartReducer = chartSlice.reducer;
