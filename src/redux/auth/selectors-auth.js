export const selectUsername = state => state.auth.name;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectError = state => state.auth.error;

export const selectUser = (state) =>state.user.user;