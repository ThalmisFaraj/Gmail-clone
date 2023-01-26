import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: null,
  logoutModalIsOpen: false,
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
  },
});

export const { login, logout, closeLogoutModal, openLogoutModal } =
  userSlice.actions;

export default userSlice.reducer;
