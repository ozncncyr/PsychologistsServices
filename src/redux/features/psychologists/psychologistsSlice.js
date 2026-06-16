import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: [], // All fetched items
  displayCount: 3, // How many to show
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
      state.allItems = action.payload;
      state.displayCount = 3;
    },
    loadMore(state) {
      state.displayCount += 3;
    },
    fetchFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetStatus(state) {
      state.status = "idle";
    },
  },
});

export const { fetchStart, fetchSuccess, loadMore, fetchFailure, resetStatus } =
  slice.actions;
export default slice.reducer;
