// Import the functions you need from the SDKs you want to use
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration is read from environment variables.
// Vite exposes env variables prefixed with VITE_ via `import.meta.env`.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environments when measurementId is provided
let analytics = null;
if (
  typeof window !== "undefined" &&
  import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
) {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    // Analytics init can fail in some environments; ignore silently
  }
}

export { app, analytics };
