import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: null,
  logoutModalIsOpen: false,
  isMobileView: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state, action) => {
      state.userStatus = action.payload;
    },
    logout: (state) => {
      state.userStatus = null;
      state.logoutModalIsOpen = false;
    },
    openLogoutModal: (state) => {
      state.logoutModalIsOpen = true;
    },
    closeLogoutModal: (state) => {
      state.logoutModalIsOpen = false;
    },
    adjustToMobileView: (state) => {
      state.isMobileView = true;
    },
    adjustToEnlargedView: (state) => {
      state.isMobileView = false;
    },
  },
});

export const {
  login,
  logout,
  closeLogoutModal,
  openLogoutModal,
  adjustToMobileView,
  adjustToEnlargedView,
} = userSlice.actions;

export default userSlice.reducer;
