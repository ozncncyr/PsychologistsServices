import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    start(state) {
      state.status = "loading";
      state.error = null;
    },
    success(state, action) {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    failure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { start, success, failure, logout } = authSlice.actions;
export default authSlice.reducer;
