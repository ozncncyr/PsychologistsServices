import { db } from "./firebaseClient";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

// Realtime Database (REST) for psychologists; keep Firestore for user-specific data if needed.
const RTDB_BASE = import.meta.env.VITE_RTDB_URL || '';

export async function getPsychologists() {
  if (!RTDB_BASE) return [];
  const res = await fetch(`${RTDB_BASE.replace(/\/$/, '')}/psychologists.json`);
  if (!res.ok) throw new Error('Failed to fetch psychologists');
  const data = await res.json();
  // RTDB returns an object map; convert to array
  if (!data) return [];
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
}

export async function getPsychologistById(id) {
  if (!RTDB_BASE) return null;
  const res = await fetch(`${RTDB_BASE.replace(/\/$/, '')}/psychologists/${id}.json`);
  if (!res.ok) throw new Error('Failed to fetch psychologist');
  const data = await res.json();
  return data ? { id, ...data } : null;
}

// Placeholder user favorites using Firestore or other persistence can be added separately.

export async function setUserProfile(userId, profile) {
  if (!RTDB_BASE) throw new Error('RTDB base URL not configured');
  const url = `${RTDB_BASE.replace(/\/$/, '')}/users/${userId}.json`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to set user profile: ${res.status} ${text}`);
  }
  return await res.json();
}

export async function setUserFavorite(uid, favId) {
  const ref = doc(db, "users", uid, "favorites", favId);
  await setDoc(ref, { id: favId, createdAt: new Date() });
}

export async function removeUserFavorite(uid, favId) {
  const ref = doc(db, "users", uid, "favorites", favId);
  await setDoc(ref, {});
}
