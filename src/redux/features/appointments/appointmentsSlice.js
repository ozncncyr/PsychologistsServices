import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draft: null, // placeholder for appointment form
};

const slice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setDraft(state, action) {
      state.draft = action.payload;
    },
    clearDraft(state) {
      state.draft = null;
    },
  },
});

export const { setDraft, clearDraft } = slice.actions;
export default slice.reducer;
