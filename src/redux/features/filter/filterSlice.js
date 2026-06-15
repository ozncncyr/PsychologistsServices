import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specialty: null,
  rating: null,
  location: null,
  search: "",
  page: 1,
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSpecialty(state, action) {
      state.specialty = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSpecialty,
  setRating,
  setLocation,
  setSearch,
  setPage,
  resetFilters,
} = slice.actions;
export default slice.reducer;
