export const selectUser = (state) => state.user.user; //примерная логика чтоб я мог получать данные на имя, но это не точно тк это скорее относится к сеттингам

export const selectName = (state) => state.user.name;

export const selectGender = (state) => state.user.gender;

export const selectWeight = (state) => state.user.weight;

export const selectWaterRate = (state) => state.user.waterRate;

export const selectSportTime = (state) => state.user.sportTime;