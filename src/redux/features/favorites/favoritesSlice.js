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
    // These are now handled by thunks interacting with Firebase
    // addFavoriteLocal(state, action) {
    //   if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
    // },
    // removeFavoriteLocal(state, action) {
    //   state.ids = state.ids.filter((id) => id !== action.payload);
    // },
    setFavorites(state, action) {
      state.ids = action.payload;
      state.status = "succeeded";
    },
    start(state) {
      state.status = "loading";
      state.error = null;
    },
    success(state) {
      state.status = "succeeded";
    },
    failure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { setFavorites, start, success, failure } = slice.actions;
export default slice.reducer;
