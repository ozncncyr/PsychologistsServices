import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    fetchStart(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
    },
    fetchFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = slice.actions;
export default slice.reducer;
