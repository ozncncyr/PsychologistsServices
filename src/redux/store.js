import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./features/auth/authSlice";
import psychologistsReducer from "./features/psychologists/psychologistsSlice";
import filterReducer from "./features/filter/filterSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";
import uiReducer from "./features/ui/uiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  psychologists: psychologistsReducer,
  filter: filterReducer,
  favorites: favoritesReducer,
  appointments: appointmentsReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
