import { createSlice } from "@reduxjs/toolkit";

// interface UserInfo {
//   uid: string;
//   name: string;
//   email: string;
//   photoURL: string;
// }

const initialState = {
  isLoggedIn: false,
  userInfo: null as any | null,
};

const handleAuthFailure = (state: typeof initialState) => {
  state.isLoggedIn = false;
  state.userInfo = null;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = {
        uid: action.payload.uid,
        name: action.payload.name,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    },
    userLoginFailed: handleAuthFailure,
    userRegisterFailed: handleAuthFailure,
    userLogout: handleAuthFailure,
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    fetchUserSignedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  userLoginSuccess,
  userLoginFailed,
  userRegisterFailed,
  userLogout,
  updateUserInfo,
  fetchUserSignedIn,
} = userSlice.actions;

export default userSlice.reducer;
