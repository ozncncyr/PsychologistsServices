import { start, success, failure, logout, setRefreshing } from "./authSlice";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../Firebase";
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

export const registerAuth = (name, email, password) => async (dispatch) => {
  try {
    dispatch(start());

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    const token = await cred.user.getIdToken();

    const safeUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: null,
      photoURL: null,
    };

    // Realtime Database'e kullanıcı profili oluştur
    await setUserProfile(cred.user.uid, {
      firebaseUid: cred.user.uid,
      email: cred.user.email,
      name: name || "",
      // favorites: {},
      createdAt: new Date().toISOString(),
    });

    dispatch(success({ user: safeUser, token }));

    return safeUser;
  } catch (e) {
    console.error("register error", e);
    dispatch(failure(e.code || e.message));
    throw e;
  }
};

export const performLogout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (e) {
    dispatch(failure(e.message));
  }
};

export const restoreUser = (firebaseUser) => async (dispatch) => {
  try {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken(true);

      const safeUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || null,
        photoURL: firebaseUser.photoURL || null,
      };

      dispatch(success({ user: safeUser, token }));
    } else {
      dispatch(logout());
    }
  } catch (e) {
    console.error("restoreUser error", e);
    dispatch(logout());
  } finally {
    dispatch(setRefreshing(false));
  }
};
