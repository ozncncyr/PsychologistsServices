import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
  modal: null,
  toast: null,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
    openModal(state, action) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = null;
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const {
  setGlobalLoading,
  openModal,
  closeModal,
  showToast,
  clearToast,
} = slice.actions;
export default slice.reducer;
