import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("CURRENT_USER")) ? true : false,
  userLogin: JSON.parse(localStorage.getItem("CURRENT_USER")) || {},
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, { type, payload }) => {
      // lưu vào local Storage
      localStorage.setItem(
        "CURRENT_USER",
        JSON.stringify({
          isLogin: true,
          id: payload.result._id,
          email: payload.result.email,
          userName: payload.result.userName,
          phoneNumber: payload.result.phoneNumber,
        })
      );

      // set lại reducer Auth
      state.isLogin = true;
      state.userLogin = {
        id: payload.result._id,
        email: payload.result.email,
        userName: payload.result.userName,
        phoneNumber: payload.result.phoneNumber,
      };
    },
    onLogout: (state) => {
      localStorage.removeItem("CURRENT_USER");
      state.isLogin = false;
      state.userLogin = null;
    },
  },
});

export const { onLogin, onLogout } = authReducer.actions;

export default authReducer.reducer;
