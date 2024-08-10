export const selectedMonthDays = (state) => state.water.selectedMonthWater;

export const selectedMonth = (state) => state.water.month;

export const selectedYear = (state) => state.water.year;

export const selectorIsLoading = (state) => state.water.isLoading;

export const selectedWater = (state) => state.water.selectedDay;

export const selectWaters = (state) => state.water.selectedDay.items;

export const selectProgress = (state) => state.water.selectedDay.progress;

export const selectTodayProgress = (state) => state.water.todayProgress;

export const selectTodayDate = (state) => state.water.todayDate;

export const selectSelectedDate = (state) => state.water.selectedDay.date;

export const selectIsWatersLoading = (state) => state.water.selectedDay.loading;
