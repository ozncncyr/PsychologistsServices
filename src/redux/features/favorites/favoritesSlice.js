import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoriteLocal(state, action) {
      if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
    },
    removeFavoriteLocal(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    setFavorites(state, action) {
      state.ids = action.payload;
    },
    start(state) {
      state.status = "loading";
      state.error = null;
    },
    failure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  addFavoriteLocal,
  removeFavoriteLocal,
  setFavorites,
  start,
  failure,
} = slice.actions;
export default slice.reducer;
