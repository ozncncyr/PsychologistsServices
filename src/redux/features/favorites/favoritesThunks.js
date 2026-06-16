import { start, success, failure, setFavorites } from "./favoritesSlice";
import {
  setUserFavorite,
  removeUserFavorite,
  getUserFavorites,
} from "../../../services/firebase/api";

export const addFavorite = (userId, psychologistId) => async (dispatch) => {
  try {
    dispatch(start());
    await setUserFavorite(userId, psychologistId);
    // After successfully adding to Firebase, update local state
    const updatedFavorites = await getUserFavorites(userId);
    dispatch(setFavorites(Object.keys(updatedFavorites)));
    dispatch(success());
  } catch (e) {
    console.error("addFavorite error", e);
    dispatch(failure(e.message));
  }
};

export const removeFavorite = (userId, psychologistId) => async (dispatch) => {
  try {
    dispatch(start());
    await removeUserFavorite(userId, psychologistId);
    // After successfully removing from Firebase, update local state
    const updatedFavorites = await getUserFavorites(userId);
    dispatch(setFavorites(Object.keys(updatedFavorites)));
    dispatch(success());
  } catch (e) {
    console.error("removeFavorite error", e);
    dispatch(failure(e.message));
  }
};

export const loadFavorites = (userId) => async (dispatch) => {
  try {
    dispatch(start());
    const favorites = await getUserFavorites(userId);
    dispatch(setFavorites(Object.keys(favorites)));
    dispatch(success());
  } catch (e) {
    console.error("loadFavorites error", e);
    dispatch(failure(e.message));
  }
};
