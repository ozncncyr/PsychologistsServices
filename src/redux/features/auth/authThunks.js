import { start, success, failure, logout } from "./authSlice";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../Firebase";
import { nanoid } from "nanoid";
import { setUserProfile } from "../../../services/firebase/api";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(start());
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    const safeUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || null,
      photoURL: cred.user.photoURL || null,
    };
    dispatch(success({ user: safeUser, token }));
    return safeUser;
  } catch (e) {
    console.error("login error", e);
    dispatch(failure(e.code || e.message));
    throw e;
  }
};

// Registers user in Firebase Authentication only
export const registerAuth = (email, password) => async (dispatch) => {
  try {
    dispatch(start());
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    const safeUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || null,
      photoURL: cred.user.photoURL || null,
    };
    dispatch(success({ user: safeUser, token }));
    return safeUser;
  } catch (e) {
    console.error("register error", e);
    dispatch(failure(e.code || e.message));
    throw e;
  }
};

// Creates RTDB user profile (separate from auth)
export const createUserProfile = (name, firebaseUid, email) => async () => {
  const userId = `user_${nanoid(8)}`;
  const profile = {
    userId,
    firebaseUid,
    email: email || null,
    name: name || "",
    favorites: [],
    createdAt: new Date().toISOString(),
  };
  await setUserProfile(userId, profile);
  return userId;
};

export const performLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (e) {
    dispatch(failure(e.message));
  }
};
